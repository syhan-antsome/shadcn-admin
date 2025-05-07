import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/kiosks-columns'
import { KiosksDialogs } from './components/kiosks-dialogs'
import { KiosksPrimaryButtons } from './components/kiosks-primary-buttons'

import { KiosksFilter } from './components/kiosks-filter'
import { KiosksTable } from './components/kiosks-table'
import KiosksProvider from './context/kiosks-context'
import { kiosks as localKiosks } from './data/kiosks'
// import { kioskListSchema } from './data/schema'
import { KioskService } from './services/kiosk-service'

export default function Kiosks() {
  // 상태관리: 정렬 및 필터링 매개변수
  const [params, setParams] = useState<KioikParams>({
    page: 1,
    pageRowNum: 10,
    sortBy: 'kioskId',
    sortOrder: 'asc',
    keyword: '',
    kioskTp: '',
  })

  // 서버에서 키오스크 데이터 가져오기
  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['kiosks', params],
    queryFn: () => KioskService.getAll(params),
    staleTime: 60 * 1000, // 1분 동안 데이터를 신선한 상태로 유지
    placeholderData: localKiosks, // 로딩 중에 표시할 기본 데이터 ???????????
    retry: 1, // 실패 시 한 번만 재시도
  })

  // 에러 처리
  if (error) {
    toast.error('데이터를 불러오는 중 오류가 발생했습니다.')
    // eslint-disable-next-line no-console
    console.error('Error fetching kiosks:', error)
  }

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setParams((prev) => ({ ...prev, page }))
  }

  // 정렬 변경 핸들러
  const handleSortChange = (sortBy: string, sortOrder: 'asc' | 'desc') => {
    setParams((prev) => ({ ...prev, sortBy, sortOrder }))
  }

  // 필터링 변경 핸들러
  const handleFilterChange = (filter: Partial<KioskParams>) => {
    setParams((prev) => ({ ...prev, ...filter, page: 1 }))
  }

  const kioskList = data?.data || []
  const total = data?.total || 0
  const pageCount = data?.pageCount || 1

  // // 키오스크 데이터 파싱
  // const kioskList = kioskListSchema.parse(kiosks?.listData || [])

  // // 에러 처리
  // useEffect(() => {
  //   if (error) {
  //     toast.error(
  //       '데이터를 불러오는 중 오류가 발생했습니다. 로컬 데이터를 표시합니다.'
  //     )
  //     // eslint-disable-next-line no-console
  //     console.error('Error fetching kiosks:', error)
  //   }
  // }, [error])

  // eslint-disable-next-line no-console
  console.log('data >> ', data)
  // eslint-disable-next-line no-console
  console.log('kioskList >> ', kioskList)

  return (
    <KiosksProvider>
      {/* 헤더 부분 */}
      <Header fixed>
        <Search onSearch={(search) => handleFilterChange({ search })} />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      {/* 콘텐츠 부분 */}
      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Kiosk List</h2>
            <p className='text-muted-foreground'>
              {isLoading
                ? '키오스크 데이터를 불러오는 중...'
                : `총 ${total}개의 키오스크가 있습니다.`}
            </p>
          </div>
          <KiosksPrimaryButtons />
        </div>

        {/* 필터 컴포넌트 */}
        <KiosksFilter
          onFilterChange={handleFilterChange}
          isLoading={isLoading}
          currentFilter={params}
        />

        {/* 테이블 부분 */}
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <KiosksTable
            data={kioskList}
            columns={columns}
            isLoading={isLoading}
            pageCount={pageCount}
            currentPage={params.page || 1}
            onPageChange={handlePageChange}
            onSortChange={handleSortChange}
          />
        </div>
      </Main>

      <KiosksDialogs />
    </KiosksProvider>
  )
}
