import { API_BASE_URL } from '@/services/constants/apiBaseUrl'
import { fetchWrapper } from '@/services/wrappers/fetch-wrapper'
import { AuthFormData } from '@/types/Auth'
import { AuthParams } from '@/types/AuthParams'

export const AuthService = {
  signIn: async ({ identifier, password, remember }: AuthParams) => {
    try {
      const backendResponse = await fetchWrapper({
        route: `${API_BASE_URL}/users/sign-in`,
        method: 'POST',
        body: { identifier, password },
        isLogin: true
      })

      if (backendResponse.tokenJWT) {
        const cookieResponse = await fetchWrapper({
          route: '/api/login',
          method: 'POST',
          body: {
            token: backendResponse.tokenJWT,
            dateExp: backendResponse.dateExp,
            remember
          }
        })

        return cookieResponse
      }
    } catch (error) {
      console.error('SignIn error:', error)
      throw error
    }
  },

  async signUp(userData: Omit<AuthFormData, 'confirmPassword'>) {
    try {
      const response = await fetchWrapper({
        route: `${API_BASE_URL}/users/sign-up`,
        method: 'POST',
        body: userData
      })

      return response
    } catch (e) {
      console.error('Error parsing response:', e)
    }
  }
}
