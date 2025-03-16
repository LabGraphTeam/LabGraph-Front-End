import { InputFieldProps } from '@/types/Auth'
import { Eye, EyeOff } from 'lucide-react'
import React, { useState } from 'react'

const InputField: React.FC<InputFieldProps> = ({
  id,
  type,
  label,
  value,
  onChange,
  placeholder,
  autoComplete,
  icon
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className='space-y-0'>
      <label htmlFor={id} className='block text-xs text-textSecondary transition-colors sm:text-sm'>
        {label}
      </label>
      <div className='relative'>
        {icon && <div className='absolute left-3 top-1/2 -translate-y-1/2'>{icon}</div>}
        <input
          type={type === 'password' && !showPassword ? 'password' : 'text'}
          id={id}
          value={value}
          onChange={onChange}
          className={`input-modern ${icon ? 'pl-10' : 'pl-3'}`}
          required
          placeholder={placeholder}
          autoComplete={autoComplete}
        />
        {type === 'password' && (
          <button
            type='button'
            onClick={togglePasswordVisibility}
            className='absolute right-3 top-1/2 -translate-y-1/2 text-textSecondary hover:text-textPrimary'
          >
            {showPassword ? <EyeOff className='size-4' /> : <Eye className='size-4' />}
          </button>
        )}
      </div>
    </div>
  )
}

export default InputField
