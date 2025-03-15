import { AnalyticGroupedData, AnalyticItem } from '@/features/charts/types/Chart'

export interface LevelOptions {
  value: string | number
  label: string
}
export interface CommonTestSelectorProps {
  testNameList: string[]
  analyticsType: string
  name: string
  level: number
  setAnalyticItem: (data: AnalyticItem[]) => void
  setIsLoading: (data: boolean) => void
}

export interface TestSelectorProps {
  analyticsType: string
  testNameList: string[]
  name: string
  setIsLoading: (data: boolean) => void
  setAnalyticItemList: (data: AnalyticGroupedData[]) => void
}

export interface TestNameSelectorProps {
  testNameList: string[]
  testName: string
  setTestName: (name: string) => void
}

export interface TestLevelSelectorProps {
  levelOptions: LevelOptions[]
  testLevel: number
  setTestLevel: (level: number) => void
}

export interface TestSelectorActionsProps {
  testNameList: string[]
  testName: string
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
