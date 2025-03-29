import { FaCheck } from 'react-icons/fa6'

interface ValidateButtonProps {
  isToValidate: boolean
  handleAnalyticsValidate: () => void
}

const ValidateButton = ({ isToValidate, handleAnalyticsValidate }: ValidateButtonProps) => {
  return (
    <>
      {isToValidate ? (
        <>
          <button
            className='rounded border border-borderColor bg-surface p-1 text-[6px] text-surface transition-colors duration-300 hover:text-textSecondary hover:duration-75 md:text-xs'
            onClick={() => {
              handleAnalyticsValidate()
            }}
          >
            <FaCheck strokeWidth={0.5} />
          </button>
        </>
      ) : (
        <button
          className='cursor-not-allowed rounded border border-borderColor bg-surface p-1 text-[6px] text-textPrimary md:text-xs'
          disabled
        >
          <FaCheck strokeWidth={0.5} />
        </button>
      )}
    </>
  )
}

export default ValidateButton
