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
  setFiltered
}) => {
  return (
    <div className=' md:mt-40 md:mb-10 md:text-xs'>
      {/* <div className='relative border border-borderColor rounded-md p-2 pt-3'> */}
        {/* <div className='absolute -top-3 left-4 bg-background px-2 text-xs font-light text-textSecondary'>
         Filters
        </div> */}
        <div className='flex mt-24 flex-col md:flex-row md:flex-wrap items-start justify-evenly md:gap-0 font-light'>
          <DateSelector {...dateSelector} />
          
          <label htmlFor='tests' className='flex items-center gap-2 whitespace-nowrap text-textSecondary'>
            <span className="">Test:</span>{' '}
            <select
              id='tests'
              value={analyticsType}
              onChange={(e) => setAnalyticsType(e.target.value)}
              className='focus:ring-borderColor/30 rounded border border-borderColor bg-background px-2 py-1 text-textSecondary focus:outline-none focus:ring-2'
            >
              {analyticsOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          
          <label htmlFor='level' className='flex items-center mt-1 md:mt-0 gap-2 whitespace-nowrap text-textSecondary'>
            <span className="">Level:</span>{' '}
            <select
              id='level'
              value={level}
              onChange={(e) => {
                setLevel(Number(e.target.value))
                setFiltered(() => e.target.value !== '0')
              }}
              className='focus:ring-borderColor/30 rounded border border-borderColor bg-background px-2 py-1 text-textSecondary focus:outline-none focus:ring-2'
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
    // </div>
  )
}

export default AnalyticsFilters
