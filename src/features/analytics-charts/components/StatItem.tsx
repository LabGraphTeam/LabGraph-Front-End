import { StatItemProps } from '@/types/Chart'
import React from 'react'

const StatItem: React.FC<StatItemProps> = ({ label, value, formatter }) => {
  const displayValue = React.useMemo(() => {
    if (value === undefined || isNaN(value)) return ''
    return formatter(value)
  }, [value, formatter])

  return (
    <div className='flex flex-row justify-start md:flex-col'>
      <span>{label}:</span>
      <span className='text-textPrimary'>{displayValue}</span>
    </div>
  )
}

export default React.memo(StatItem)
