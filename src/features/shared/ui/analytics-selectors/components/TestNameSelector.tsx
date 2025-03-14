import React, { useCallback } from 'react';
import { TestNameSelectorProps } from '../types/SelectorProps';

const TestNameSelector: React.FC<TestNameSelectorProps> = ({
  testNameList: list,
  testName,
  setTestName,
}) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setTestName(e.target.value);
    },
    [setTestName]
  );

  return (
    <>
      <label htmlFor='testName' className='sr-only'>
        Test Name
      </label>
      <select
        id='testName'
        name='testName'
        value={testName}
        onChange={handleChange}
        className='hover:border-borderColor/80 focus:ring-borderColor/30 rounded-md border border-borderColor bg-background text-sm text-textSecondary shadow-sm shadow-shadow transition-all duration-200 focus:outline-none focus:ring-2 md:px-2 md:py-1'
      >
        {list.map((optionValue) => (
          <option key={optionValue} value={optionValue}>
            {optionValue}
          </option>
        ))}
      </select>
    </>
  );
};

export default TestNameSelector;
