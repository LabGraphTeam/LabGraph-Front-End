import UpdateResults from '@/features/analytics-upload-files'
import ValidationButtonLink from '@/features/shared/ui/analytics-selectors/components/ValidationButtonLink'
import TestLevelSelector from '@/shared/ui/analytics-selectors/components/TestLevelSelector'
import TestNameSelector from '@/shared/ui/analytics-selectors/components/TestNameSelector'
import { TestSelectorActionsProps } from '@/types/SelectorProps'
import React from 'react'

const TestSelectorActions: React.FC<TestSelectorActionsProps> = ({
  availableTestNames: list,
  analyticName: testName,
  setTestName,
  levelOptions,
  testLevel,
  setTestLevel,
  analyticsType,
  validationUrl,
  isMultiSelect
}) => {
  return (
    <div className='relative mt-2 flex flex-row items-center gap-2 rounded-md border border-borderColor p-4 md:mt-0'>
      <div className='absolute -top-1.5 left-8 ml-7 -translate-x-1/2 bg-background px-2 text-[7px] font-extralight text-textPrimary md:-top-2 md:ml-6 md:text-[10px]'>
        Filters & Actions
      </div>
      <span className='text-xs text-textPrimary'>Test:</span>
      <TestNameSelector
        analyticName={testName}
        availableTestNames={list}
        setTestName={setTestName}
      />
      {!isMultiSelect ? <span className='text-xs text-textPrimary'>Level:</span> : null}

      {levelOptions && levelOptions.length > 0 && !isMultiSelect && setTestLevel ? (
        <TestLevelSelector
          analyticLevel={testLevel}
          levelOptions={levelOptions}
          setTestLevel={setTestLevel}
        />
      ) : null}
      <span className='flex items-center gap-2'>
        <ValidationButtonLink validationUrl={validationUrl} />
        <UpdateResults analyticsType={analyticsType} />
      </span>
    </div>
  )
}

export default TestSelectorActions
