import React from 'react';
import SingleDateSelector from './components/SingleDateSelector';
import { DateSelectorProps } from './types/dateSelectorProps';

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
  handleEndYearChange,
}) => {
  return (
    <div className='space-y-1 md:space-y-1'>
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
  );
};

export default DateSelector;
