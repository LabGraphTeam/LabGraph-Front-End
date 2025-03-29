import { AnalyticWithStatsData, GroupedAnalyticData } from '@/types/Chart'

export interface AnalyticsLevelOptions {
  value: string | number
  label: string
}

export interface AnalyticsBaseProps {
  availableAnalyticsNames: string[]
  analyticsName: string
  setAnalyticsName: (name: string) => void
}

export interface AnalyticsSelectorProps extends AnalyticsBaseProps {
  analyticsType: string
  setAnalyticsType: (type: string) => void
  setIsLoading: (data: boolean) => void
}

export interface AnalyticsLevelSelectorProps {
  levelOptions: AnalyticsLevelOptions[]
  analyticsLevel: number
  setAnalyticsLevel: (level: number) => void
}

export interface CommonTestSelectorProps
  extends AnalyticsSelectorProps,
  AnalyticsLevelSelectorProps {
  setAnalyticsData: (data: AnalyticWithStatsData) => void
}

export interface TestSelectorProps extends AnalyticsSelectorProps {
  setGroupedAnalyticData: (data: GroupedAnalyticData[]) => void
}

export interface AnalyticsNameSelectorProps {
  availableAnalyticsNames: string[]
  analyticsName: string
  setAnalyticsName: (name: string) => void
}

export interface SelectorActionsProps
  extends AnalyticsNameSelectorProps,
  AnalyticsLevelSelectorProps {
  analyticsType: string
  validationUrl: string
  isMultiSelect?: boolean
}

export interface ValidationButtonLinkProps {
  validationUrl: string
}
