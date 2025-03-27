import React, { useEffect, useState } from 'react'

import useFetchAnalyticsGrouped from '@/features/analytics-charts/hooks/useFetchAnalyticsGrouped'
import { PRIVATE_ROUTES } from '@/features/shared/routes/routes'
import useDateSelector from '@/shared/hooks/useDateSelector'
import TestSelectorActions from '@/shared/ui/analytics-selectors/components/TestSelectorActions'
import DateSelector from '@/shared/ui/date-selectors'
import ErrorMessage from '@/shared/utils/components/error-message'
import buildAnalyticsEndpointByNameAndDate from '@/shared/utils/helpers/buildAnalyticsEndpointByNameAndDate'
import { BuildAnalyticsEndpointByNameAndDateProps } from '@/types/BuildAnalyticsEndpointByNameAndDateProps'
import { TestSelectorProps } from '@/types/SelectorProps'

const TestSelectorWithoutLevel: React.FC<TestSelectorProps> = ({
  availableAnalyticsNames,
  analyticsType,
  analyticsName,
  setGroupedAnalyticData,
  setIsLoading
}) => {
  const [testName, setTestName] = useState<string>(analyticsName)

  const { dateValues, combinedDateAndHandlersProps } = useDateSelector()

  const propsEndpoint: BuildAnalyticsEndpointByNameAndDateProps = {
    analyticName: testName,
    analyticsMeasurementPeriod: {
      ...dateValues
    },
    analyticsType
  }

  const endPoint = buildAnalyticsEndpointByNameAndDate(propsEndpoint)

  const { data, error } = useFetchAnalyticsGrouped(endPoint)

  useEffect(() => {
    setIsLoading(true)
    if (data && data.length > 0) {
      setIsLoading(false)
    }
    setGroupedAnalyticData(data || [])
  }, [endPoint, data, setGroupedAnalyticData, setIsLoading])

  return (
    <div className='mt-12 grid content-center items-center text-textSecondary md:mt-8 md:w-full md:justify-around xl:flex'>
      {error ? <ErrorMessage message={error.toString()} /> : null}
      <DateSelector {...combinedDateAndHandlersProps} />
      <TestSelectorActions
        analyticsName={testName}
        analyticsType={analyticsType}
        availableAnalyticsNames={availableAnalyticsNames}
        isMultiSelect={true}
        levelOptions={[]}
        setAnalyticsLevel={() => {}}
        setAnalyticsName={setTestName}
        analyticsLevel={0}
        validationUrl={PRIVATE_ROUTES.MISC.ANALYTICS_TABLE}
      />
    </div>
  )
}

export default React.memo(TestSelectorWithoutLevel)
