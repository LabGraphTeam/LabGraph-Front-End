import React from 'react';
import { DaySelectorProps } from '../types/dateSelectorProps';

const DaySelector: React.FC<DaySelectorProps & { fieldId?: string }> = ({
  selectedDay,
  onDayChange,
  fieldId,
}) => {
  return (
    <select
      id={fieldId ?? 'day-selector'}
      name={fieldId ?? 'day-selector'}
      className='focus:ring-borderColor/30 rounded border border-borderColor bg-background p-0 text-sm text-textSecondary shadow-sm shadow-shadow focus:outline-none focus:ring-2 md:px-2 md:py-1'
      value={selectedDay}
      onChange={(e) => onDayChange(+e.target.value)}
    >
      {Array.from({ length: 31 }, (_, i) => (
        <option key={i} value={i + 1}>
          {i + 1}
        </option>
      ))}
    </select>
  );
};

export default DaySelector;
