import { AtSign, Lock, User } from 'lucide-react'

import AuthLink from '@/features/authentication/components/AuthLink'
import InputField from '@/features/authentication/components/InputField'
import SubmitButton from '@/features/authentication/components/SubmitButton'
import { useAuthValidator } from '@/features/authentication/hooks/useAuthValidator'
import AuthFormContainer from '@/features/authentication/layout/AuthFormContainer'
import ErrorMessage from '@/shared/utils/components/error-message'

const SignUpForm = () => {
  const { formData, errors, handleChange, handleSubmit } = useAuthValidator(false)

  return (
    <AuthFormContainer>
      {errors && errors.length > 0 ? (
        <ErrorMessage message={errors.map((error) => error.message).join(', ')} />
      ) : null}
      <form autoComplete='off' className='mb-4 space-y-4' onSubmit={handleSubmit}>
        <InputField
          autoComplete='username'
          icon={<User className='size-4 text-textSecondary' />}
          id='identifier'
          label='Username'
          onChange={handleChange}
          placeholder='Enter your username'
          type='text'
          value={formData.identifier}
        />
        <InputField
          autoComplete='email'
          icon={<AtSign className='size-4 text-textSecondary' />}
          id='email'
          label='Email'
          onChange={handleChange}
          placeholder='Enter your email'
          type='email'
          value={formData.email ? formData.email : ''}
        />
        <InputField
          autoComplete='new-password'
          icon={<Lock className='size-4 text-textSecondary' />}
          id='password'
          label='Password'
          onChange={handleChange}
          placeholder='Enter your password'
          type='password'
          value={formData.password}
        />
        <InputField
          autoComplete='new-password'
          icon={<Lock className='size-4 text-textSecondary' />}
          id='confirmPassword'
          label='Confirm Password'
          onChange={handleChange}
          placeholder='Confirm your password'
          type='password'
          value={formData.confirmPassword ?? ''}
        />
        <SubmitButton text='Create Account' />
        <AuthLink href='/auth/login' linkText='Sign in' text='Already have an account?' />
      </form>
    </AuthFormContainer>
  )
}

export default SignUpForm
