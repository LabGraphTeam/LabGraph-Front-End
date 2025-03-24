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
    <div className='ml-2 mt-32 text-[10px] md:mb-4 md:mt-40 md:text-xs'>
      <div className='mt-24 flex flex-col items-start justify-between font-light md:flex-row'>
        <DateSelector {...dateSelector} />
        <div className='relative mt-2 flex flex-row items-center gap-2 rounded-md border border-borderColor p-4 md:mt-0'>
          <div className='absolute -top-2.5 left-8 ml-7 -translate-x-1/2 bg-background px-2 text-[7px] font-extralight text-textPrimary md:ml-6 md:text-[10px]'>
            Filters & Actions
          </div>
          <label
            htmlFor='tests'
            className='md-gap-2 flex items-center gap-1 whitespace-nowrap text-textPrimary'
          >
            <span className=''>Test:</span>{' '}
            <select
              id='tests'
              value={analyticsType}
              onChange={(e) => setAnalyticsType(e.target.value)}
              className='focus:ring-borderColor/30 rounded border border-borderColor bg-background text-textPrimary focus:outline-none focus:ring-2 md:px-2 md:py-1'
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
            className='md-gap-2 mt-1 flex items-center gap-1 whitespace-nowrap text-textPrimary md:mt-0'
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
            className='md-gap-2 mt-1 flex items-center gap-1 whitespace-nowrap text-textPrimary md:mt-0'
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
    </div>
  )
}

export default AnalyticsFilters
