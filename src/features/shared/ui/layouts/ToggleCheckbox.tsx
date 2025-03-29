interface CheckIconProps {
  text: string
  checked: boolean
  onChange: (checked: boolean) => void
}

const ToggleCheckbox = ({ text, checked, onChange }: CheckIconProps) => {
  return (
    <label className='flex cursor-pointer items-center space-x-1'>
      <div className='relative'>
        <input
          checked={checked}
          className='sr-only'
          id='rememberMe'
          onChange={(e) => onChange(e.target.checked)}
          type='checkbox'
        />
        <div
          className={`flex size-4 rounded-full border transition-colors duration-200 
                    ${checked ? 'border-borderColor bg-checkbox' : 'border-borderColor bg-checkbox'}`}
        >
          {checked ? (
            <svg
              className='size-4 text-textSecondary'
              fill='currentColor'
              viewBox='0 0 16 16'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z' />
            </svg>
          ) : null}
        </div>
      </div>
      <span className='text-textSecondary transition-colors duration-200'>{text}</span>
    </label>
  )
}

export default ToggleCheckbox
