import { useEffect } from 'react'
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
import { useKiosksData } from './hooks/useKiosksData'

export default function Kiosks() {
  // 커스텀 훅을 통해 키오스크 데이터 및 관련 핸들러 가져오기
  const {
    kioskList,
    total,
    pageCount,
    isLoading,
    error,
    params,
    handlePageChange,
    handleSortChange,
    handleFilterChange
  } = useKiosksData();

  // 에러 처리
  useEffect(() => {
    if (error) {
      toast.error('데이터를 불러오는 중 오류가 발생했습니다.')
      // eslint-disable-next-line no-console
      console.error('Error fetching kiosks:', error)
    }
  }, [error]);

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