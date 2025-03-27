import React from 'react'

import DaySelector from '@/shared/ui/date-selectors/components/DaySelector'
import MonthSelector from '@/shared/ui/date-selectors/components/MonthSelector'
import YearSelector from '@/shared/ui/date-selectors/components/YearSelector'
import { SingleDateSelectorProps } from '@/types/DateSelectorProps'

const sanitize = (str: string) => str.replace(/\s+/g, '-').toLowerCase()

const SingleDateSelector: React.FC<SingleDateSelectorProps> = ({
  label,
  day,
  month,
  year,
  onDayChange,
  onMonthChange,
  onYearChange
}) => {
  const prefix = sanitize(label)
  return (
    <div className='flex items-center gap-2 text-textPrimary'>
      <span className='font-medium md:text-xs'>{label}:</span>
      <DaySelector fieldId={`${prefix}-day-selector`} onDayChange={onDayChange} selectedDay={day} />
      <MonthSelector
        fieldId={`${prefix}-month-selector`}
        onMonthChange={onMonthChange}
        selectedMonth={month}
      />
      <YearSelector
        fieldId={`${prefix}-year-selector`}
        onYearChange={onYearChange}
        selectedYear={year}
      />
    </div>
  )
}

export default SingleDateSelector
