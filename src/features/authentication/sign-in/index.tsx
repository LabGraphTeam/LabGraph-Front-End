import AuthFormContainer from '@/features/authentication/layout/AuthFormContainer'
import CheckIcon from '@/features/shared/ui/icons/CheckBox'
import ErrorMessage from '@/features/shared/utils/components/error-message'
import { AtSign, Lock } from 'lucide-react'
import AuthLink from '../components/AuthLink'
import InputField from '../components/InputField'
import SubmitButton from '../components/SubmitButton'
import { useAuthValidator } from '../hooks/useAuthValidator'

const LoginForm = () => {
  const { formData, errors, handleChange, rememberMe, handleRememberMeChange, handleSubmit } =
    useAuthValidator(true)

  return (
    <AuthFormContainer>
      {errors && errors.length > 0 && (
        <ErrorMessage message={errors.map((error) => error.message).join(', ')} />
      )}
      <form onSubmit={handleSubmit} className='mb-4 space-y-4'>
        <InputField
          id='identifier'
          type='text'
          label='Email or Username'
          placeholder='Enter your email or username'
          value={formData.identifier}
          onChange={handleChange}
          icon={<AtSign className='size-4 text-textSecondary' />}
          autoComplete='username'
        />
        <InputField
          id='password'
          type='password'
          label='Password'
          placeholder='Enter your password'
          value={formData.password}
          onChange={handleChange}
          icon={<Lock className='size-4 text-textSecondary' />}
          autoComplete='current-password'
        />


        <div className='flex items-center justify-between text-xs sm:text-sm'>
          <CheckIcon
            text='Keep me logged in'
            checked={rememberMe}
            onChange={handleRememberMeChange}
          />
          <AuthLink text='' linkText='Forgot password?' href='#' />
        </div>

        <SubmitButton text='Sign-in' />
        <AuthLink text="Don't have an account?" linkText='Sign up' href='/auth/signup' />
      </form>
    </AuthFormContainer>
  )
}

export default LoginForm
