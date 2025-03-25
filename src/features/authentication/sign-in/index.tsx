import AuthLink from '@/features/authentication/components/AuthLink'
import InputField from '@/features/authentication/components/InputField'
import SubmitButton from '@/features/authentication/components/SubmitButton'
import { useAuthValidator } from '@/features/authentication/hooks/useAuthValidator'
import AuthFormContainer from '@/features/authentication/layout/AuthFormContainer'
import CheckIcon from '@/shared/ui/icons/CheckBox'
import ErrorMessage from '@/shared/utils/components/error-message'
import { AtSign, Lock } from 'lucide-react'

const LoginForm = () => {
  const { formData, errors, handleChange, rememberMe, handleRememberMeChange, handleSubmit } =
    useAuthValidator(true)

  return (
    <AuthFormContainer>
      {errors && errors.length > 0 ? <ErrorMessage message={errors.map((error) => error.message).join(', ')} /> : null}
      <form className='mb-4 space-y-4' onSubmit={handleSubmit}>
        <InputField
          autoComplete='username'
          icon={<AtSign className='size-4 text-textSecondary' />}
          id='identifier'
          label='Email or Username'
          onChange={handleChange}
          placeholder='Enter your email or username'
          type='text'
          value={formData.identifier}
        />
        <InputField
          autoComplete='current-password'
          icon={<Lock className='size-4 text-textSecondary' />}
          id='password'
          label='Password'
          onChange={handleChange}
          placeholder='Enter your password'
          type='password'
          value={formData.password}
        />

        <div className='flex items-center justify-between text-xs sm:text-sm'>
          <CheckIcon
            checked={rememberMe}
            onChange={handleRememberMeChange}
            text='Keep me logged in'
          />
          <AuthLink href='#' linkText='Forgot password?' text='' />
        </div>

        <SubmitButton text='Sign-in' />
        <AuthLink href='/auth/signup' linkText='Sign up' text="Don't have an account?" />
      </form>
    </AuthFormContainer>
  )
}

export default LoginForm
