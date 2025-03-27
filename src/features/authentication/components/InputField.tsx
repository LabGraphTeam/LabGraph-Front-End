import { Eye, EyeOff } from 'lucide-react'
import React, { useState } from 'react'

import { InputFieldProps } from '@/types/Auth'

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
      <label className='block text-xs text-textSecondary transition-colors sm:text-sm' htmlFor={id}>
        {label}
      </label>
      <div className='relative'>
        {icon ? <div className='absolute left-3 top-1/2 -translate-y-1/2'>{icon}</div> : null}
        <input
          autoComplete={autoComplete}
          className={`input-modern ${icon ? 'pl-10' : 'pl-3'}`}
          id={id}
          onChange={onChange}
          placeholder={placeholder}
          required
          type={type === 'password' && !showPassword ? 'password' : 'text'}
          value={value}
        />
        {type === 'password' ? (
          <button
            className='absolute right-3 top-1/2 -translate-y-1/2 text-textSecondary hover:text-textPrimary'
            onClick={togglePasswordVisibility}
            type='button'
          >
            {showPassword ? <EyeOff className='size-4' /> : <Eye className='size-4' />}
          </button>
        ) : null}
      </div>
    </div>
  )
}

export default InputField
