import React from 'react'

import UpdateResults from '@/features/analytics-upload-files'
import ValidationButtonLink from '@/features/shared/ui/analytics-selectors/components/ValidationButtonLink'
import TestLevelSelector from '@/shared/ui/analytics-selectors/components/TestLevelSelector'
import TestNameSelector from '@/shared/ui/analytics-selectors/components/TestNameSelector'
import { SelectorActionsProps } from '@/types/SelectorProps'

const TestSelectorActions: React.FC<SelectorActionsProps> = ({
  availableAnalyticsNames,
  analyticsName,
  setAnalyticsName,
  levelOptions,
  analyticsLevel,
  setAnalyticsLevel,
  analyticsType,
  validationUrl,
  isMultiSelect
}) => {
  const shouldRenderLevelSelector =
    levelOptions && levelOptions.length > 0 && !isMultiSelect && !!setAnalyticsLevel

  return (
    <div className='relative mt-2 flex flex-row items-center gap-2 rounded-md border border-borderColor p-4 md:mt-0'>
      <div className='absolute -top-1.5 left-8 ml-7 -translate-x-1/2 bg-background px-2 text-[7px] font-extralight text-textPrimary md:-top-2 md:ml-6 md:text-[10px]'>
        Filters & Actions
      </div>
      <span className='text-xs text-textPrimary'>Test:</span>
      <TestNameSelector
        analyticsName={analyticsName}
        availableAnalyticsNames={availableAnalyticsNames}
        setAnalyticsName={setAnalyticsName}
      />
      {!isMultiSelect ? <span className='text-xs text-textPrimary'>Level:</span> : null}

      {shouldRenderLevelSelector ? (
        <TestLevelSelector
          analyticsLevel={analyticsLevel}
          levelOptions={levelOptions}
          setAnalyticsLevel={setAnalyticsLevel}
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
