import { useEffect } from 'react'
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
import { KiosksTable } from './components/kiosks-table'
import KiosksProvider from './context/kiosks-context'
import { kioskListSchema } from './data/schema'
import { getKiosks, kiosks as localKiosks } from './data/kiosks'

export default function Kiosks() {
  // 서버에서 키오스크 데이터 가져오기
  const { data: kiosks, isLoading, error } = useQuery({
    queryKey: ['kiosks'],
    queryFn: getKiosks,
    staleTime: 60 * 1000, // 1분 동안 데이터를 신선한 상태로 유지
    placeholderData: localKiosks, // 로딩 중에 표시할 기본 데이터
    retry: 1, // 실패 시 한 번만 재시도
  })

  // 키오스크 데이터 파싱
  const kioskList = kioskListSchema.parse(kiosks || [])

  // 에러 처리
  useEffect(() => {
    if (error) {
      toast.error('데이터를 불러오는 중 오류가 발생했습니다. 로컬 데이터를 표시합니다.')
      // eslint-disable-next-line no-console
      console.error('Error fetching kiosks:', error)
    }
  }, [error])

  return (
    <KiosksProvider>
      {/* ===== Top Heading ===== */}
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      {/* ===== Content ===== */}
      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Kiosk List</h2>
            <p className='text-muted-foreground'>
              {isLoading ? '키오스크 데이터를 불러오는 중...' : '키오스크를 관리합니다.'}
            </p>
          </div>
          <KiosksPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <KiosksTable data={kioskList} columns={columns} isLoading={isLoading} />
        </div>
      </Main>

      <KiosksDialogs />
    </KiosksProvider>
  )
}
