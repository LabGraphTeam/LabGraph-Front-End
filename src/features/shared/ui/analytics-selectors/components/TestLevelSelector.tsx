import { TestLevelSelectorProps } from '@/types/SelectorProps'
import React, { useCallback } from 'react'

const TestLevelSelector: React.FC<TestLevelSelectorProps> = ({
  levelOptions,
  analyticLevel: testLevel,
  setTestLevel
}) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setTestLevel(Number(e.target.value))
    },
    [setTestLevel]
  )

  return (
    <>
      <label htmlFor='testLevel ' className='sr-only'>
        Level:
      </label>
      <select
        id='testLevel'
        value={testLevel}
        onChange={handleChange}
        className='hover:border-borderColor/80 focus:ring-borderColor/30 rounded-md border border-borderColor bg-background text-xs text-textSecondary shadow-sm shadow-shadow transition-all duration-200 focus:outline-none focus:ring-2 md:px-2 md:py-1'
      >
        {levelOptions
          .filter((option) => option.value !== 0)
          .map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
    </>
  )
}

export default TestLevelSelector
