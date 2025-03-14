import AuthFormContainer from '@/features/authentication/layout/AuthFormContainer'
import ErrorMessage from '@/features/shared/utils/components/error-message'
import { AtSign, Lock, User } from 'lucide-react'
import AuthLink from '../components/AuthLink'
import InputField from '../components/InputField'
import SubmitButton from '../components/SubmitButton'
import { useAuthValidator } from '../hooks/useAuthValidator'

const SignUpForm = () => {
  const { formData, errors, handleChange, handleSubmit } = useAuthValidator(false)

  return (
    <AuthFormContainer>
      {errors && errors.length > 0 && (
        <ErrorMessage message={errors.map((error) => error.message).join(', ')} />
      )}
      <form onSubmit={handleSubmit} className='mb-4 space-y-4' autoComplete='off'>
        <InputField
          id='identifier'
          type='text'
          label='Username'
          placeholder='Enter your username'
          value={formData.identifier}
          onChange={handleChange}
          icon={<User className='size-4 text-textSecondary' />}
          autoComplete='username'
        />
        <InputField
          id='email'
          type='email'
          label='Email'
          placeholder='Enter your email'
          value={formData.email ? formData.email : ''}
          onChange={handleChange}
          icon={<AtSign className='size-4 text-textSecondary' />}
          autoComplete='email'
        />
        <InputField
          id='password'
          type='password'
          label='Password'
          placeholder='Enter your password'
          value={formData.password}
          onChange={handleChange}
          icon={<Lock className='size-4 text-textSecondary' />}
          autoComplete='new-password'
        />
        <InputField
          id='confirmPassword'
          type='password'
          label='Confirm Password'
          placeholder='Confirm your password'
          value={formData.confirmPassword ?? ''}
          onChange={handleChange}
          icon={<Lock className='size-4 text-textSecondary' />}
          autoComplete='new-password'
        />
        <SubmitButton text='Create Account' />
        <AuthLink text='Already have an account?' linkText='Sign in' href='/auth/login' />
      </form>
    </AuthFormContainer>
  )
}

export default SignUpForm
