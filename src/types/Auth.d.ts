import { ReactNode } from 'react'

export interface AuthFormData {
  identifier: string
  email?: string
  password: string
  confirmPassword?: string
}

export interface LoginFormData {
  identifier: string
  password: string
}

export interface InputFieldProps {
  id: string
  type: string
  label: string
  value: string
  placeholder?: string
  icon?: React.ReactNode
  autoComplete?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export interface SubmitButtonProps {
  text?: string
}

export interface AuthLinkProps {
  text: string
  linkText: string
  href: string
}

export interface SubmitButtonProps {
  text?: string
  icon?: boolean
}

export interface TokenContextProps {
  token: string | null
  isLoading: boolean
}

export interface TokenProviderProps {
  children: ReactNode
}

export interface ValidationError {
  field: string
  message: string
}
