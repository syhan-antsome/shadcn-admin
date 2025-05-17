import { useEffect } from 'react'
import { useKiosksStore, selectKioskList, selectIsLoading } from '../store/kiosks-store'

export function useKiosksData() {
  // Zustand 스토어에서 필요한 상태와 액션 가져오기
  const kioskList = useKiosksStore(selectKioskList)
  const isLoading = useKiosksStore(selectIsLoading)
  
  const total = useKiosksStore((state) => state.total)
  const pageCount = useKiosksStore((state) => state.pageCount)
  const error = useKiosksStore((state) => state.error)
  const params = useKiosksStore((state) => state.params)
  
  // 액션 가져오기
  const fetchKiosks = useKiosksStore((state) => state.fetchKiosks)
  const handlePageChange = useKiosksStore((state) => state.handlePageChange)
  const handleSortChange = useKiosksStore((state) => state.handleSortChange)
  const handleFilterChange = useKiosksStore((state) => state.handleFilterChange)
  
  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    fetchKiosks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchKiosks])
  
  return {
    kioskList,
    total,
    pageCount,
    isLoading,
    error,
    params,
    handlePageChange,
    handleSortChange,
    handleFilterChange,
    refetch: fetchKiosks
  }
}
