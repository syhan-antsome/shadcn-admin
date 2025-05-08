import { api } from '@/lib/api'
import { Kiosk, KioskParams } from '../data/schema'

const API_URL = '/kiosk'

export const KioskService = {
  // 정렬 및 필터링 매개변수에 따라 키오스크 목록을 가져오는 함수
  getAll: async (
    params: KioskParams
  ): Promise<{
    data: Kiosk[]
    total: number
    pageCount: number
  }> => {
    // 쿼리스트링 작성
    const searchParams = new URLSearchParams()

    // 페이징 관련
    if (params.page) searchParams.append('page', params.page.toString())
    if (params.pageRowNum)
      searchParams.append('pageRowNum', params.pageRowNum.toString())

    // 정렬 관련
    if (params.sortBy) searchParams.append('sortBy', params.sortBy)
    if (params.sortOrder) searchParams.append('sortOrder', params.sortOrder)
    
    // 필터링 관련
    if (params.keyword !== undefined) searchParams.append('keyword', params.keyword)
    if (params.kioskTp !== undefined) searchParams.append('kioskTp', params.kioskTp)
        
    if (params.status) searchParams.append('status', params.status)
    if (params.type) searchParams.append('type', params.type)
    if (params.location) searchParams.append('location', params.location)
    if (params.search) searchParams.append('search', params.search)
    if (params.startDate)
      searchParams.append('startDate', params.startDate.toString())
    if (params.endDate)
      searchParams.append('endDate', params.endDate.toString())

    const queryString = searchParams.toString()
    const url = queryString ? `${API_URL}?${queryString}` : API_URL

    // API 호출
    const response = await api.get(url)
    return {
      data: response.listData,
      total: parseInt(response.listTotal, 10),
      pageCount: Math.ceil(parseInt(response.listTotal, 10) / (params.pageRowNum || 10))
    };
  },
  getById: async (id: string): Promise<Kiosk> => {
    return await api.get<Kiosk>(`${API_URL}/${id}`)
  },
  create: async (kiosk: Kiosk): Promise<Kiosk> => {
    return await api.post<Kiosk>(API_URL, kiosk)
  },
  update: async (id: string, kiosk: Kiosk): Promise<Kiosk> => {
    return await api.put<Kiosk>(`${API_URL}/${id}`, kiosk)
  },
  delete: async (id: string): Promise<void> => {
    return await api.delete<void>(`${API_URL}/${id}`)
  },
}
