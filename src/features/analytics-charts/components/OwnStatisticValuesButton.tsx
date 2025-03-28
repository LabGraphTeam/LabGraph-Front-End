import { TbFileDescription, TbMathFunction } from 'react-icons/tb'

import OwnStatisticsValues from '@/features/analytics-charts/components/OwnStatisticsValues'

interface OwnStatisticButtonProps {
  isOwnStatisticValues: boolean
  setIsOwnStatisticValues: (value: boolean) => void
}
const OwnStatisticsButton = ({
  isOwnStatisticValues,
  setIsOwnStatisticValues
}: OwnStatisticButtonProps) => {
  return (
    <button
      className='flex flex-col items-center text-textPrimary transition-all duration-300'
      onClick={() => setIsOwnStatisticValues(!isOwnStatisticValues)}
    >
      <div className='rounded-full p-1 transition-all duration-300'>
        {isOwnStatisticValues ? (
          <TbMathFunction className='size-3 md:size-5' />
        ) : (
          <TbFileDescription className='size-3 md:size-5' />
        )}
      </div>
      {OwnStatisticsValues({
        isOwnStatisticValues
      })}
    </button>
  )
}

export default OwnStatisticsButton
