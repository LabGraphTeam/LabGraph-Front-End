import React, { useCallback } from 'react'

import { TestLevelSelectorProps } from '@/types/SelectorProps'

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
      <label className='sr-only' htmlFor='testLevel '>
        Level:
      </label>
      <select
        className='hover:border-borderColor/80 focus:ring-borderColor/30 rounded-md border border-borderColor bg-background text-xs text-textSecondary shadow-sm shadow-shadow transition-all duration-200 focus:outline-none focus:ring-2 md:px-2 md:py-1'
        id='testLevel'
        onChange={handleChange}
        value={testLevel}
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
