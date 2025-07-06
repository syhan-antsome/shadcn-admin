import Cookies from 'js-cookie'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { SearchProvider } from '@/context/search-context'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/app-sidebar'
import SkipToMain from '@/components/skip-to-main'
import { useAuthStore } from '@/stores/auth-store'

export const Route = createFileRoute('/_authenticated')({
  // 라우트 진입전에 인증상태를 확인하는 훅
  beforeLoad: () => {
    const auth = useAuthStore.getState().auth
    if(!auth.isAuthenticated()) {
      // 현재 접근하려는 경로를 저장
      const currentPath = window.location.pathname

      // 로그인 페이지로 리다이렉트하고 원래 경로를 쿼리 파라미터로 전달
      // return redirect({
      //   to: '/sign-in',
      //   search: {
      //     redirect: currentPath,
      //   },
      // })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const defaultOpen = Cookies.get('sidebar_state') !== 'false'
  return (
    <SearchProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
        <SkipToMain />
        <AppSidebar />
        <div
          id='content'
          className={cn(
            'ml-auto w-full max-w-full',
            'peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]',
            'peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]',
            'sm:transition-[width] sm:duration-200 sm:ease-linear',
            'flex h-svh flex-col',
            'group-data-[scroll-locked=1]/body:h-full',
            'has-[main.fixed-main]:group-data-[scroll-locked=1]/body:h-svh'
          )}
        >
          <Outlet />
        </div>
      </SidebarProvider>
    </SearchProvider>
  )
}
