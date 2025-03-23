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
  setUnValidatedFilter,
  filters
}) => {
  return (
    <div className='ml-2 md:mb-4 mt-28 md:mt-40 text-[10px] md:text-xs'>
      <div className='mt-24 flex flex-col items-start justify-evenly font-light md:flex-row'>
        <DateSelector {...dateSelector} />
        <label
          htmlFor='tests'
          className='flex items-center gap-1 md-gap-2 whitespace-nowrap text-textPrimary'
        >
          <span className=''>Test:</span>{' '}
          <select
            id='tests'
            value={analyticsType}
            onChange={(e) => setAnalyticsType(e.target.value)}
            className='focus:ring-borderColor/30 rounded border border-borderColor bg-background md:px-2 md:py-1 text-textPrimary focus:outline-none focus:ring-2'
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
          className='mt-1 md:mt-0 flex items-center gap-1 md-gap-2 whitespace-nowrap text-textPrimary'
        >
          <span className=''>Level:</span>{' '}
          <select
            id='level'
            value={level}
            onChange={(e) => {
              setLevel(Number(e.target.value))
              setFiltered(() => e.target.value !== '0')
            }}
            className='focus:ring-borderColor/30 rounded border border-borderColor bg-background p-0 text-[10px] text-textSecondary shadow-sm shadow-shadow focus:outline-none focus:ring-2 md:px-2 md:py-1 md:text-xs'
            >
            {levelOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label
          htmlFor='validation-status'
          className='mt-1 md:mt-0 flex items-center gap-1 md-gap-2 whitespace-nowrap text-textPrimary'
        >
          <span>Status filter:</span>{' '}
          <select
            id='validation-status'
            onChange={(e) => {
              setUnValidatedFilter(() => e.target.value == 'true')
            }}
            className='focus:ring-borderColor/30 rounded border border-borderColor bg-background p-0 text-[10px] text-textSecondary shadow-sm shadow-shadow focus:outline-none focus:ring-2 md:px-2 md:py-1 md:text-xs'
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
