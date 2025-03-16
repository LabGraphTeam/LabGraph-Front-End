import { authService } from '@/services/auth-service'
import { AuthFormData } from '@/types/Auth'
import { useRouter } from 'next/router'
import { useState } from 'react'

export const useHandleAuthForm = (isLoginRequest: boolean) => {
  const [rememberMe, setRememberMe] = useState(false)
  const router = useRouter()

  const [formData, setFormData] = useState<AuthFormData>({
    identifier: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleSubmitAuth = async () => {
    try {
      if (isLoginRequest) {
        const response = await authService.signIn({
          identifier: formData.identifier.trim(),
          password: formData.password,
          remember: rememberMe
        })

        if (response.success) {
          router.push('/charts/hematology')
          return { success: true }
        }
      } else {
        const response = await authService.signUp({
          identifier: formData.identifier.trim(),
          email: formData.email?.trim() ?? '',
          password: formData.password
        })

        if (response.ok) {
          router.push('/auth/login')
          return { success: true }
        }

        if (response.status === 409 || response.status === 401 || response.status === 403) {
          throw new Error('Signup was unsuccessful. Please verify your details and try again.')
        }
      }

      throw new Error('Authentication failed. Please try again.')
    } catch (err) {
      console.error('Auth error:', err)
      let errorMessage = 'An unknown error occurred.'
      if (err instanceof Error) {
        errorMessage = err.message
      }
      return { success: false, errorMessage }
    }
  }

  return { formData, setFormData, rememberMe, setRememberMe, handleSubmitAuth }
}
