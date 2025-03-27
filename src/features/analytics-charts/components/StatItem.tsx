import React from 'react'

import { StatItemProps } from '@/types/Chart'

const StatItem: React.FC<StatItemProps> = ({ label, value, unitValue, formatStatValue }) => {
  const displayValue = React.useMemo(() => {
    if (value === undefined || isNaN(value)) return ''
    return formatStatValue(value, unitValue)
  }, [value, formatStatValue, unitValue])

  return (
    <div className='flex flex-col text-[12px]'>
      <span>{label}:</span>
      <span className='text-[10px] text-textPrimary'>{displayValue}</span>
    </div>
  )
}

export default React.memo(StatItem)
