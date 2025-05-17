import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { KioskService } from '../services/kiosk-service'
import { kiosks as localKiosks } from '../data/kiosks'

// KioskParams 타입 정의 (오타 수정)
export interface KioskParams {
  page: number;
  pageRowNum: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  keyword: string;
  kioskTp: string;
  search?: string; // Search 컴포넌트에서 사용
}

export function useKiosksData() {
  const [params, setParams] = useState<KioskParams>({
    page: 1,
    pageRowNum: 10,
    sortBy: 'kioskId',
    sortOrder: 'asc',
    keyword: '',
    kioskTp: '',
  });

  // 서버에서 키오스크 데이터 가져오기
  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['kiosks', params],
    queryFn: () => KioskService.getAll(params),
    staleTime: 60 * 1000, // 1분 동안 데이터를 신선한 상태로 유지
    placeholderData: localKiosks, // 로딩 중에 표시할 기본 데이터
    retry: 1, // 실패 시 한 번만 재시도
  });

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setParams((prev) => ({ ...prev, page }));
  };

  // 정렬 변경 핸들러
  const handleSortChange = (sortBy: string, sortOrder: 'asc' | 'desc') => {
    setParams((prev) => ({ ...prev, sortBy, sortOrder }));
  };

  // 필터링 변경 핸들러
  const handleFilterChange = (filter: Partial<KioskParams>) => {
    const prevParams = {...params};
    setParams((prev) => ({ ...prev, ...filter, page: 1 }));
    
    // 동일한 필터 조건인 경우(예: 같은 검색어로 재검색)에도 강제로 refetch
    if (JSON.stringify({...params, ...filter, page: 1}) === JSON.stringify(prevParams)) {
      refetch();
    }
  };

  return {
    kioskList: data?.data || [],
    total: data?.total || 0,
    pageCount: data?.pageCount || 1,
    isLoading,
    error,
    params,
    handlePageChange,
    handleSortChange,
    handleFilterChange,
    refetch,
  };
}