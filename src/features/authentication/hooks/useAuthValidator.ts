import { ValidationError } from '@/features/authentication/types/Auth'
import { useState } from 'react'
import { useHandleAuthForm } from './useHandleAuthForm'

export const useAuthValidator = (isLogin: boolean) => {
  const [errors, setErrors] = useState<ValidationError[]>([])
  const [loading, setLoading] = useState(false)

  const { formData, setFormData, rememberMe, setRememberMe, handleSubmitAuth } =
    useHandleAuthForm(isLogin)

  const validateForm = (): ValidationError[] => {
    const errors: ValidationError[] = []
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const passwordRegex = /[!@#$%^&*]/

    const PASSWORD_REQUIRED_LENGTH = 6

    if (isLogin) {
      if (!formData.identifier) {
        errors.push({ field: 'identifier', message: 'Identifier is required.' })
      }

      if (!formData.password) {
        errors.push({ field: 'password', message: 'Password is required.' })
      }

      return errors
    }

    if (!formData.email || !emailRegex.test(formData.email)) {
      errors.push({ field: 'email', message: 'A valid email address is required.' })
    }

    if (
      !formData.password ||
      formData.password.length < PASSWORD_REQUIRED_LENGTH ||
      !passwordRegex.test(formData.password)
    ) {
      errors.push({
        field: 'password',
        message: `Password must be at least ${PASSWORD_REQUIRED_LENGTH} characters long and include one special character.`
      })
    }

    if (!formData.confirmPassword) {
      errors.push({ field: 'confirmPassword', message: 'Confirm Password is required.' })
    }

    if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
      errors.push({
        field: 'confirmPassword',
        message: 'Passwords do not match.'
      })
    }

    return errors
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors([])
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
  }

  const handleRememberMeChange = (checked: boolean) => {
    setRememberMe(checked)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors([])

    const validationErrors = validateForm()
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      return
    }

    setLoading(true)

    try {
      const result = await handleSubmitAuth()
      if (!result.success) {
        setErrors([{ field: 'general', message: result.errorMessage ?? 'Authentication failed.' }])
      }
    } catch (err) {
      setErrors([
        { field: 'general', message: err instanceof Error ? err.message : 'Server error.' }
      ])
    } finally {
      setLoading(false)
    }
  }

  return {
    formData,
    rememberMe,
    errors,
    loading,
    handleChange,
    handleRememberMeChange,
    handleSubmit
  }
}
