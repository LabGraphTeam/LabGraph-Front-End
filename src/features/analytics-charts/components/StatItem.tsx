import React from 'react'

import { StatItemProps } from '@/types/Chart'

const StatItem: React.FC<StatItemProps> = ({
  label = '',
  value = 0,
  unitValue = '',
  formatStatValue
}) => {
  const displayValue = formatStatValue(value, unitValue)

  return (
    <div className='flex flex-col text-[12px]'>
      <span>{label}:</span>
      <span className='text-[10px] text-textPrimary'>{displayValue}</span>
    </div>
  )
}

export default StatItem
