import React from 'react';
import { SingleDateSelectorProps } from '../types/dateSelectorProps';
import DaySelector from './DaySelector';
import MonthSelector from './MonthSelector';
import YearSelector from './YearSelector';

const sanitize = (str: string) => str.replace(/\s+/g, '-').toLowerCase();

const SingleDateSelector: React.FC<SingleDateSelectorProps> = ({
  label,
  day,
  month,
  year,
  onDayChange,
  onMonthChange,
  onYearChange,
}) => {
  const prefix = sanitize(label);
  return (
    <div className='flex items-center gap-2 text-textSecondary '>
      <span className='font-medium md:text-sm'>{label}:</span>
      <DaySelector selectedDay={day} onDayChange={onDayChange} fieldId={`${prefix}-day-selector`} />
      <MonthSelector
        selectedMonth={month}
        onMonthChange={onMonthChange}
        fieldId={`${prefix}-month-selector`}
      />
      <YearSelector
        selectedYear={year}
        onYearChange={onYearChange}
        fieldId={`${prefix}-year-selector`}
      />
    </div>
  );
};

export default SingleDateSelector;
