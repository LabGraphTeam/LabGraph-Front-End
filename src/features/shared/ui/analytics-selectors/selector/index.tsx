import React, { useEffect, useMemo } from 'react'

import useFetchAnalytics from '@/features/analytics-charts/hooks/useFetchAnalytics'
import { PRIVATE_ROUTES } from '@/features/shared/routes/routes'
import useDateSelector from '@/shared/hooks/useDateSelector'
import TestSelectorActions from '@/shared/ui/analytics-selectors/components/TestSelectorActions'
import DateSelector from '@/shared/ui/date-selectors'
import ErrorMessage from '@/shared/utils/components/error-message'
import buildAnalyticsEndpoint from '@/shared/utils/helpers/buildAnalyticsEndpoint'
import { CommonTestSelectorProps } from '@/types/SelectorProps'

const TestSelectorWithLevel: React.FC<CommonTestSelectorProps> = ({
  availableAnalyticsNames,
  analyticsType,
  analyticsName,
  setAnalyticsName,
  setAnalyticsLevel,
  analyticsLevel,
  setAnalyticsData,
  setIsLoading,
  levelOptions
}) => {
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
      setAnalyticsData(data)
      setIsLoading(false)
    }
  }, [data, error, isLoading, setAnalyticsData, setIsLoading])

  return (
    <div className='mt-12 grid place-content-center items-start text-textSecondary md:mt-2 md:flex md:w-full md:justify-around'>
      {error ? <ErrorMessage message={error.toString()} /> : null}
      <DateSelector {...combinedDateAndHandlersProps} />
      <TestSelectorActions
        analyticsName={analyticsName}
        analyticsType={analyticsType}
        availableAnalyticsNames={availableAnalyticsNames}
        levelOptions={levelOptions}
        setAnalyticsLevel={setAnalyticsLevel}
        setAnalyticsName={setAnalyticsName}
        analyticsLevel={analyticsLevel}
        validationUrl={PRIVATE_ROUTES.MISC.ANALYTICS_TABLE}
      />
    </div>
  )
}
export default TestSelectorWithLevel
