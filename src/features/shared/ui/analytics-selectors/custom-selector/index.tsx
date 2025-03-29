import React, { useEffect } from 'react'

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
  setAnalyticsName,
  setGroupedAnalyticData,
  setIsLoading
}) => {
  const { dateValues, combinedDateAndHandlersProps } = useDateSelector()

  const endPointProps: BuildAnalyticsEndpointByNameAndDateProps = {
    analyticsName,
    analyticsMeasurementPeriod: {
      ...dateValues
    },
    analyticsType
  }

  const { data, error, isLoading } = useFetchAnalyticsGrouped(
    buildAnalyticsEndpointByNameAndDate(endPointProps)
  )

  useEffect(() => {
    if (!error && data && data.length > 0 && !isLoading) {
      setGroupedAnalyticData(data)
      setIsLoading(false)
    }
  }, [data, setGroupedAnalyticData, setIsLoading, isLoading, error])

  return (
    <div className='mt-12 grid content-center items-center text-textSecondary md:mt-8 md:w-full md:justify-around xl:flex'>
      {error ?? <ErrorMessage message={error} />}
      <DateSelector {...combinedDateAndHandlersProps} />
      <TestSelectorActions
        analyticsName={analyticsName}
        analyticsType={analyticsType}
        availableAnalyticsNames={availableAnalyticsNames}
        isMultiSelect={true}
        levelOptions={[]}
        setAnalyticsLevel={() => {}}
        setAnalyticsName={setAnalyticsName}
        analyticsLevel={0}
        validationUrl={PRIVATE_ROUTES.MISC.ANALYTICS_TABLE}
      />
    </div>
  )
}

export default TestSelectorWithoutLevel
