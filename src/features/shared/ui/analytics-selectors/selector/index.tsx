import React, { useEffect, useMemo, useState } from 'react'

import useFetchAnalytics from '@/features/analytics-charts/hooks/useFetchAnalytics'
import { PRIVATE_ROUTES } from '@/features/shared/utils/constants/privateRoutes'
import { useAnalyticsOptions } from '@/shared/hooks/useAnalyticsOptions'
import useDateSelector from '@/shared/hooks/useDateSelector'
import TestSelectorActions from '@/shared/ui/analytics-selectors/components/TestSelectorActions'
import DateSelector from '@/shared/ui/date-selectors'
import ErrorMessage from '@/shared/utils/components/error-message'
import buildAnalyticsEndpoint from '@/shared/utils/helpers/buildAnalyticsEndpoint'
import { CommonTestSelectorProps } from '@/types/SelectorProps'

const TestSelectorWithLevel: React.FC<CommonTestSelectorProps> = ({
  availableTestNames,
  analyticsType,
  defaultAnalyticsName,
  defaultAnalyticsLevel,
  setAnalyticListData,
  setIsLoading
}) => {
  const { levelOptions } = useAnalyticsOptions(analyticsType)
  const [analyticsName, setAnalyticsName] = useState<string>(defaultAnalyticsName)
  const [analyticsLevel, setAnalyticsLevel] = useState<number>(defaultAnalyticsLevel ?? 1)

  const { dateValues, combinedDateAndHandlersProps } = useDateSelector()

  const analyticsApiUrl = useMemo(() => {
    const analyticsEndPointProps = {
      analyticsType,
      analyticsName,
      analyticsLevel,
      analyticsMeasurementPeriod: {
        ...dateValues
      }
    }
    return buildAnalyticsEndpoint(analyticsEndPointProps)
  }, [analyticsType, analyticsName, analyticsLevel, dateValues])

  const { data, isLoading, error } = useFetchAnalytics(analyticsApiUrl)

  useEffect(() => {
    if (!error && !isLoading && data && data?.analyticsDTO?.length > 0) {
      setAnalyticListData(data)
      setIsLoading(false)
    }
  }, [data, error, isLoading, setAnalyticListData, setIsLoading])

  return (
    <div className='mt-12 grid place-content-center items-start text-textSecondary md:mt-2 md:flex md:w-full md:justify-around'>
      {error ? <ErrorMessage message={error.toString()} /> : null}
      <DateSelector {...combinedDateAndHandlersProps} />
      <TestSelectorActions
        analyticName={analyticsName}
        analyticsType={analyticsType}
        availableTestNames={availableTestNames}
        levelOptions={levelOptions}
        setTestLevel={setAnalyticsLevel}
        setTestName={setAnalyticsName}
        testLevel={analyticsLevel}
        validationUrl={PRIVATE_ROUTES.MISC.ANALYTICS_TABLE}
      />
    </div>
  )
}
export default TestSelectorWithLevel
