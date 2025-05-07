import { useAuthStore } from '@/stores/auth-store'
// import { toast } from 'sonner'

// 환경 변수에서 API URL 가져오기
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8051'
const API_BASE_VERSION = import.meta.env.VITE_API_VERSION || 'v1'

/**
 * 인증 토큰이 포함된 API 요청을 수행하는 유틸리티 함수
 */
export const api = {
  async request<T>(url: string, options: RequestInit = {}): Promise<T> {
    const auth = useAuthStore.getState().auth
    const token = auth.accessToken
    
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
    
    const response = await fetch(`${API_BASE_URL}/${API_BASE_VERSION}/${url}`, {
      ...options,
      headers
    })
    
    // 401 응답 처리 (인증 만료)
    if (response.status === 401) {
      auth.reset()
      window.location.href = '/sign-in'
      throw new Error('인증이 만료되었습니다. 다시 로그인해주세요.')
    }
    
    // 성공적인 응답이 아닌 경우
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `요청 실패: ${response.status}`)
    }
    
    // 응답 본문이 없는 경우 (204 No Content 등)
    if (response.status === 204) {
      return {} as T
    }
    
    return response.json() as Promise<T>
  },
  
  // 편의 메서드들
  get<T>(url: string, options?: RequestInit): Promise<T> {
    return this.request<T>(url, { ...options, method: 'GET' })
  },
  
  post<T>(url: string, data?: unknown, options?: RequestInit): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined
    })
  },
  
  put<T>(url: string, data?: unknown, options?: RequestInit): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined
    })
  },
  
  delete<T>(url: string, options?: RequestInit): Promise<T> {
    return this.request<T>(url, { ...options, method: 'DELETE' })
  }
}
