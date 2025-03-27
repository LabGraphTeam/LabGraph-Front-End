import React, { useCallback } from 'react'

import { TestNameSelectorWithLevelProps } from '@/types/SelectorProps'

const TestNameSelector: React.FC<TestNameSelectorWithLevelProps> = ({
  availableTestNames: list,
  analyticName: testName,
  setTestName
}) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setTestName(e.target.value)
    },
    [setTestName]
  )

  return (
    <>
      <label className='sr-only' htmlFor='testName'>
        Test Name
      </label>
      <select
        className='hover:border-borderColor/80 focus:ring-borderColor/30 rounded-md border border-borderColor bg-background text-xs text-textSecondary shadow-sm shadow-shadow transition-all duration-200 focus:outline-none focus:ring-2 md:px-2 md:py-1'
        id='testName'
        name='testName'
        onChange={handleChange}
        value={testName}
      >
        {list.map((optionValue) => (
          <option key={optionValue} value={optionValue}>
            {optionValue}
          </option>
        ))}
      </select>
    </>
  )
}

export default TestNameSelector
