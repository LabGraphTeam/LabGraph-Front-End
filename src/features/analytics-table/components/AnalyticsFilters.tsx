import DateSelector from '@/features/shared/ui/date-selectors'
import { AnalyticsFiltersProps } from '@/types/AnalyticsTable'
import React from 'react'

const AnalyticsFilters: React.FC<AnalyticsFiltersProps> = ({
  dateSelector,
  analyticsOptions,
  analyticsType,
  setAnalyticsType,
  levelOptions,
  level,
  setLevel,
  setFiltered,
  unValidFilter,
  setUnValidatedFilter,
  filters
}) => {
  return (
    <div className='md:mb-4 md:mt-40 md:text-xs'>
      <div className='mt-24 flex flex-col items-start justify-evenly font-light md:flex-row md:gap-0'>
        <DateSelector {...dateSelector} />
        <label
          htmlFor='tests'
          className='flex items-center gap-2 whitespace-nowrap text-textPrimary'
        >
          <span className=''>Test:</span>{' '}
          <select
            id='tests'
            value={analyticsType}
            onChange={(e) => setAnalyticsType(e.target.value)}
            className='focus:ring-borderColor/30 rounded border border-borderColor bg-background px-2 py-1 text-textPrimary focus:outline-none focus:ring-2'
          >
            {analyticsOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label
          htmlFor='level'
          className='mt-1 flex items-center gap-2 whitespace-nowrap text-textPrimary md:mt-0'
        >
          <span className=''>Level:</span>{' '}
          <select
            id='level'
            value={level}
            onChange={(e) => {
              setLevel(Number(e.target.value))
              setFiltered(() => e.target.value !== '0')
            }}
            className='focus:ring-borderColor/30 rounded border border-borderColor bg-background px-2 py-1 text-textPrimary focus:outline-none focus:ring-2'
          >
            {levelOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label
          htmlFor='isValidated'
          className='mt-1 flex items-center gap-2 whitespace-nowrap text-textPrimary md:mt-0'
        >
          <span className=''>Filter for non-validated:</span>{' '}
          <select
            id='isValidated'
            onChange={(e) => {
              setUnValidatedFilter(() => e.target.value == 'true')
            }}
            className='focus:ring-borderColor/30 rounded border border-borderColor bg-background px-2 py-1 text-textPrimary focus:outline-none focus:ring-2'
          >
            {filters.map((filter) => (
              <option key={String(filter.value)} value={String(filter.value)}>
                {filter.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  )
}

export default AnalyticsFilters
