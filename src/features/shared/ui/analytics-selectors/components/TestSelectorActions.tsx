import UpdateResults from '@/features/analytics-upload-files'
import { TestSelectorActionsProps } from '@/types/SelectorProps'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import TestLevelSelector from './TestLevelSelector'
import TestNameSelector from './TestNameSelector'

const TestSelectorActions: React.FC<TestSelectorActionsProps> = ({
  availableTestNames: list,
  analyticName: testName,
  setTestName,
  levelOptions,
  testLevel,
  setTestLevel,
  analyticsType,
  googleSheetUrl
}) => {
  return (
    <div className='flex flex-row items-center gap-2'>
      <span className='text-xs text-textPrimary'>Test:</span>
      <TestNameSelector
        availableTestNames={list}
        analyticName={testName}
        setTestName={setTestName}
      />
      <span className='text-xs text-textPrimary'>Level:</span>
      {levelOptions && levelOptions.length > 0 && setTestLevel && (
        <TestLevelSelector
          levelOptions={levelOptions}
          analyticLevel={testLevel}
          setTestLevel={setTestLevel}
        />
      )}
      <span className='flex items-center gap-2'>
        <Link
          className='flex items-center justify-center rounded-md border border-borderColor px-2 py-0.5 text-sm font-medium text-textSecondary transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 md:px-2 md:py-1'
          target='_blank'
          href={googleSheetUrl || ''}
        >
          <span className='md:hidden'>
            <CheckCircle size={17} />
          </span>
          <span className='hidden md:inline'>
            <CheckCircle size={17} />
          </span>
        </Link>
        <UpdateResults analyticsType={analyticsType} />
      </span>
    </div>
  )
}

export default TestSelectorActions
