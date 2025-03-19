import { DateSelectorProps } from '@/types/DateSelectorProps'
import React from 'react'
import SingleDateSelector from './components/SingleDateSelector'

const DateSelector: React.FC<DateSelectorProps> = ({
  startDay,
  startMonth,
  startYear,
  endDay,
  endMonth,
  endYear,
  handleStartDayChange,
  handleStartMonthChange,
  handleStartYearChange,
  handleEndDayChange,
  handleEndMonthChange,
  handleEndYearChange
}) => {
  return (
    <div className='mb-2 flex flex-col gap-1 md:flex-row md:gap-4'>
      <SingleDateSelector
        label='From'
        day={startDay}
        month={startMonth}
        year={startYear}
        onDayChange={handleStartDayChange}
        onMonthChange={handleStartMonthChange}
        onYearChange={handleStartYearChange}
      />
      <SingleDateSelector
        label='To'
        day={endDay}
        month={endMonth}
        year={endYear}
        onDayChange={handleEndDayChange}
        onMonthChange={handleEndMonthChange}
        onYearChange={handleEndYearChange}
      />
    </div>
  )
}

export default DateSelector
