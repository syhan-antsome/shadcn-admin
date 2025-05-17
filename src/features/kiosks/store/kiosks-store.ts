import { debounce } from 'lodash-es'
import { create } from 'zustand'
import { Kiosk } from '../data/schema'
import { KioskService } from '../services/kiosk-service'

// KioskParams 타입 정의
export interface KioskParams {
  page: number
  pageRowNum: number
  sortBy: string
  sortOrder: 'asc' | 'desc'
  keyword: string
  kioskTp: string
  search?: string // Search 컴포넌트에서 사용
}

interface KiosksState {
  // 상태
  kioskList: Kiosk[]
  total: number
  pageCount: number
  isLoading: boolean
  error: Error | null
  params: KioskParams

  // 액션
  setParams: (params: Partial<KioskParams>) => void
  fetchKiosks: () => Promise<void>
  handlePageChange: (page: number) => void
  handleSortChange: (sortBy: string, sortOrder: 'asc' | 'desc') => void
  handleFilterChange: (filter: Partial<KioskParams>) => void

  // 수정 액션
  addKiosk: (kiosk: Partial<Kiosk>) => Promise<void>
  updateKiosk: (kiosk: Kiosk) => Promise<void>
}

export const useKiosksStore = create<KiosksState>((set, get) => {
  // 공통 파라미터 업데이트 함수
  const updateParams = (newParams: Partial<KioskParams>, resetPage = false) => {
    set((state) => ({
      params: {
        ...state.params,
        ...newParams,
        ...(resetPage ? { page: 1 } : {}),
      },
    }))
    get().fetchKiosks()
  }
  return {
    // 초기 상태
    kioskList: [],
    total: 0,
    pageCount: 0,
    isLoading: false,
    error: null,
    params: {
      page: 1,
      pageRowNum: 10,
      sortBy: 'kioskId',
      sortOrder: 'asc',
      keyword: '',
      kioskTp: '',
    },

    // 파라미터 설정 함수
    setParams: (newParams) =>
      set((state) => ({
        params: { ...state.params, ...newParams },
      })),

    // 키오스크 데이터 조회 함수
    fetchKiosks: async () => {
      try {
        set({ isLoading: true, error: null })
        const response = await KioskService.getKioskList(get().params)

        set({
          kioskList: response.data || [],
          total: response.total || 0,
          pageCount: response.pageCount || 1,
          isLoading: false,
        })
      } catch (error) {
        set({ error: error as Error, isLoading: false })
      }
    },

    // 키오스크 추가 함수
    addKiosk: async (kiosk: Partial<Kiosk>) => {
      try {
        set({ isLoading: true, error: null })
        // 키오스크 추가 API 호출
        await KioskService.addKiosk(kiosk)
        // 추가 후 파라미터 초기화 및 데이터 재조회
        updateParams({ page: 1 }, true)
      } catch (error) {
        set({ error: error as Error, isLoading: false })
        throw error
      }
    },

    // 키오스크 수정 함수
    updateKiosk: async (kiosk: Kiosk) => {
      try {
        set({ isLoading: true, error: null })
        // 키오스크 수정 API 호출
        await KioskService.updateKiosk(kiosk)
        // 수정 후 파라미터 초기화 및 데이터 재조회
        updateParams({ page: 1 }, true)
      } catch (error) {
        set({ error: error as Error, isLoading: false })
        throw error
      }
    },

    // 페이지 변경 핸들러
    handlePageChange: (page) => updateParams({ page }, false),

    // 정렬 변경 핸들러
    handleSortChange: (sortBy, sortOrder) =>
      updateParams({ sortBy, sortOrder }, false),

    // 필터 변경 핸들러
    handleFilterChange: debounce((filter) => updateParams(filter, true), 300),
  }
})

// 스토어 외부에서
export const selectKioskList = (state: KiosksState) => state.kioskList
export const selectIsLoading = (state: KiosksState) => state.isLoading

export const selectTotal = (state: KiosksState) => state.total
export const selectPageCount = (state: KiosksState) => state.pageCount
export const selectError = (state: KiosksState) => state.error
export const selectParams = (state: KiosksState) => state.params
