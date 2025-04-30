import Cookies from 'js-cookie'
import { create } from 'zustand'

const ACCESS_TOKEN = 'thisisjustarandomstring'

interface AuthUser {
  accountNo: string
  userId: string
  role: string[]
  exp: number
}

interface LoginCredentials {
  userId: string
  password: string
}

interface LoginResponse {
  accessToken: string
  user: AuthUser
}

interface AuthState {
  auth: {
    user: AuthUser | null
    setUser: (user: AuthUser | null) => void
    accessToken: string
    setAccessToken: (accessToken: string) => void
    resetAccessToken: () => void
    reset: () => void
    login: (credentials: LoginCredentials) => Promise<void>
    logout: () => void
    isAuthenticated: () => boolean
  }
}

export const useAuthStore = create<AuthState>()((set, get) => {
  const cookieState = Cookies.get(ACCESS_TOKEN)
  const initToken = cookieState ? JSON.parse(cookieState) : ''
  return {
    auth: {
      user: null,
      setUser: (user) =>
        set((state) => ({ ...state, auth: { ...state.auth, user } })),
      accessToken: initToken,
      setAccessToken: (accessToken) =>
        set((state) => {
          Cookies.set(ACCESS_TOKEN, JSON.stringify(accessToken))
          return { ...state, auth: { ...state.auth, accessToken } }
        }),
      resetAccessToken: () =>
        set((state) => {
          Cookies.remove(ACCESS_TOKEN)
          return { ...state, auth: { ...state.auth, accessToken: '' } }
        }),
      reset: () =>
        set((state) => {
          Cookies.remove(ACCESS_TOKEN)
          return {
            ...state,
            auth: { ...state.auth, user: null, accessToken: '' },
          }
        }),
      // 로그인 함수
      login: async (credentials: LoginCredentials) => {
        try {
          // Api 호출
          const response = await fetch('http://localhost:8051/api/auth/signin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
          })

          if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message || '로그인에 실패하였습니다.')
          }

          const data: LoginResponse = await response.json()

          // eslint-disable-next-line no-console
          console.log('Login response:', data)
          // 로그인 성공 시, 토큰 및 사용자 정보 저장

          // 토큰및 사용자 정보 저장
          get().auth.setAccessToken(data.accessToken)
          get().auth.setUser(data.user)

          return Promise.resolve()
        } catch (error) {
          
          toast.error(error instanceof Error ? error.message : '로그인 중 오류가 발생하였습니다.')
          return Promise.reject(error)
        }
      },
      // 로그아웃 함수
      logout: () => {
        get().auth.reset()
        toast.success('로그아웃 되었습니다.')
      },
      // 인증 여부 확인 함수
      isAuthenticated: () => {
        const token = get().auth.accessToken
        const user = get().auth.user

        return !!token || !!user
      }
    },
  }
})

// 편의를 위하여 훅도 지원
export const useAuth = () => useAuthStore((state) => state.auth)
