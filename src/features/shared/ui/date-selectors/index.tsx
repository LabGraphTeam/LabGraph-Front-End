import React from 'react'

import SingleDateSelector from '@/shared/ui/date-selectors/components/SingleDateSelector'
import { DateSelectorProps } from '@/types/DateSelectorProps'

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
      <div className='absolute -top-1.5 left-8 ml-7 -translate-x-1/2 bg-background px-2 text-[7px] font-extralight text-textPrimary md:-top-2 md:ml-6 md:text-[10px]'>
        Date Interval
      </div>
      <SingleDateSelector
        day={startDay}
        label='From'
        month={startMonth}
        onDayChange={handleStartDayChange}
        onMonthChange={handleStartMonthChange}
        onYearChange={handleStartYearChange}
        year={startYear}
      />
      <SingleDateSelector
        day={endDay}
        label='To'
        month={endMonth}
        onDayChange={handleEndDayChange}
        onMonthChange={handleEndMonthChange}
        onYearChange={handleEndYearChange}
        year={endYear}
      />
    </div>
  )
}

export default DateSelector
