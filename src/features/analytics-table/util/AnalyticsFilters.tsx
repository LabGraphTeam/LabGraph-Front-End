import DateSelector from '@/features/shared/date-selector';
import React from 'react';
import { AnalyticsFiltersProps } from '../types/AnalyticsTable';

const AnalyticsFilters: React.FC<AnalyticsFiltersProps> = ({
  dateSelector,
  analyticsOptions,
  analyticsType,
  setAnalyticsType,
  levelOptions,
  level,
  setLevel,
  setFiltered,
}) => {
  return (
    <div className='mb-4 mt-16 grid grid-cols-2 content-center items-center justify-start font-medium md:mb-4 md:flex md:text-sm'>
      <div className='mt-4 w-full md:mt-14 md:w-auto'>
        <DateSelector {...dateSelector} />
        <label htmlFor='tests' className='flex items-center gap-1 text-textSecondary'>
          Test:{' '}
          <select
            id='tests'
            value={analyticsType}
            onChange={(e) => setAnalyticsType(e.target.value)}
            className='focus:ring-borderColor/30 mt-1 rounded border border-borderColor bg-background text-textSecondary focus:outline-none focus:ring-2 md:px-2 md:py-1 md:text-sm'
          >
            {analyticsOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor='level' className='flex items-center gap-2 text-textSecondary'>
          Level:{' '}
          <select
            id='level'
            value={level}
            onChange={(e) => {
              setLevel(Number(e.target.value));
              setFiltered(() => e.target.value !== '0');
            }}
            className='focus:ring-borderColor/30 mt-1 rounded border border-borderColor bg-background text-textSecondary focus:outline-none focus:ring-2 md:px-2 md:py-1 md:text-sm'
          >
            {levelOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
};

export default AnalyticsFilters;
