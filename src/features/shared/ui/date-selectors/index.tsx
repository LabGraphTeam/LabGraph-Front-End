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
    <div className='relative mb-2 flex flex-col gap-1 rounded-md border border-borderColor p-4 md:flex-row md:gap-4'>
      <div className='absolute -top-2.5 left-8 ml-7 -translate-x-1/2 bg-background px-2 text-[7px] font-extralight text-textPrimary md:ml-6 md:text-[10px]'>
        Date Interval
      </div>
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
