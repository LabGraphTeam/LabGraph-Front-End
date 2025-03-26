import { useRouter } from 'next/router'
import { useState } from 'react'

import { AuthService } from '@/services/auth-service'
import { AuthFormData } from '@/types/Auth'

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
    if (isLoginRequest) {
      const response = await AuthService.signIn({
        identifier: formData.identifier.trim(),
        password: formData.password,
        remember: rememberMe
      })

      if (response.success) {
        router.push('/charts/hematology')
        return { success: true }
      }
    }
    if (!isLoginRequest) {
      const response = await AuthService.signUp({
        identifier: formData.identifier.trim(),
        email: formData.email?.trim() ?? '',
        password: formData.password
      })

      if (response.ok) {
        router.push('/auth/login')
        return { success: true }
      }
    }
  }

  return { formData, setFormData, rememberMe, setRememberMe, handleSubmitAuth }
}
