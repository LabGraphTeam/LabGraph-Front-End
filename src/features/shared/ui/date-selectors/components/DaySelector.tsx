import { DaySelectorProps } from '@/types/DateSelectorProps'
import React from 'react'

const DaySelector: React.FC<DaySelectorProps & { fieldId?: string }> = ({
  selectedDay,
  onDayChange,
  fieldId
}) => {
  return (
    <select
      className='focus:ring-borderColor/30 rounded border border-borderColor bg-background p-0 text-[8px] text-textSecondary shadow-sm shadow-shadow focus:outline-none focus:ring-2 md:px-2 md:py-1 md:text-xs'
      id={fieldId ?? 'day-selector'}
      name={fieldId ?? 'day-selector'}
      onChange={(e) => onDayChange(+e.target.value)}
      value={selectedDay}
    >
      {Array.from({ length: 31 }, (_, i) => (
        <option key={i} value={i + 1}>
          {i + 1}
        </option>
      ))}
    </select>
  )
}

export default DaySelector
