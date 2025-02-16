import React from 'react';
import { MonthSelectorProps } from '../types/dateSelectorProps';

const MonthSelector: React.FC<MonthSelectorProps & { fieldId?: string }> = ({
  selectedMonth,
  onMonthChange,
  fieldId,
}) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <select
      id={fieldId ?? 'month-selector'}
      name={fieldId ?? 'month-selector'}
      className='focus:ring-borderColor/30 rounded border border-borderColor bg-background p-0 text-textSecondary shadow-sm shadow-shadow focus:outline-none focus:ring-2 md:px-2 md:py-1 md:text-sm'
      value={selectedMonth}
      onChange={(e) => onMonthChange(+e.target.value)}
    >
      {months.map((month, i) => (
        <option key={month} value={i + 1}>
          {month}
        </option>
      ))}
    </select>
  );
};

export default MonthSelector;
