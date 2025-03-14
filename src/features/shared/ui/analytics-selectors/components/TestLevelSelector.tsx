import React, { useCallback } from 'react';
import { TestLevelSelectorProps } from '../types/SelectorProps';

const TestLevelSelector: React.FC<TestLevelSelectorProps> = ({
  levelOptions,
  testLevel,
  setTestLevel,
}) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setTestLevel(Number(e.target.value));
    },
    [setTestLevel]
  );

  return (
    <>
      <label htmlFor='testLevel'>Level:</label>
      <select
        id='testLevel'
        value={testLevel}
        onChange={handleChange}
        className='rounded border border-borderColor bg-background text-textSecondary shadow-sm shadow-shadow focus:outline-none focus:ring-2 md:px-2 md:py-1 md:text-sm'
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
  );
};

export default TestLevelSelector;
