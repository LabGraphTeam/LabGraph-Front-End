import { GroupedAnalyticData, AnalyticWithStatsData } from '@/types/Chart'

export interface LevelOptions {
  value: string | number
  label: string
}
export interface CommonTestSelectorProps {
  availableTestNames: string[]
  analyticsType: string
  analyticName: string
  analyticLevel: number
  setAnalyticListData: (data: AnalyticWithStatsData) => void
  setIsLoading: (data: boolean) => void
}

export interface TestSelectorProps {
  analyticsType: string
  availableTestNames: string[]
  analyticName: string
  setIsLoading: (data: boolean) => void
  setAnalyticGroupedData: (data: GroupedAnalyticData[]) => void
}

export interface TestNameSelectorWithLevelProps {
  availableTestNames: string[]
  analyticName: string
  setTestName: (name: string) => void
}

export interface TestLevelSelectorProps {
  levelOptions: LevelOptions[]
  analyticLevel: number
  setTestLevel: (level: number) => void
}

export interface TestSelectorActionsProps {
  availableTestNames: string[]
  analyticName: string
  setTestName: (name: string) => void
  levelOptions: LevelOptions[]
  testLevel: number
  setTestLevel: (level: number) => void
  analyticsType: string
  googleSheetUrl: string
}

export interface GoogleSheetLinkProps {
  googleSheetUrl?: string
}
