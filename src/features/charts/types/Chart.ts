import { LegendProps } from 'recharts'

export interface ListingCollection extends Array<any> { }

export interface AnalyticItem {
  id: number
  name: string
  level_lot: string
  test_lot: string
  level: string
  sd: number
  mean: number
  ownMeanValue: number
  ownSdValue: number
  date: string
  value: number
  unit_value: string
  description: string
  rules?: string
}


export interface ControlChartProps {
  analyticItemList: AnalyticItem[]
}

export interface MeanStdDevValueData {
  mean: number
  standardDeviation: number
}

export interface AnalyticGroupedData {
  groupedValuesByLevelDTO: {
    level: string
    values: AnalyticItem[]
  }
  groupedMeanAndStdByLevelDTO: {
    level: string
    values: MeanStdDevValueData[]
  }
}

export interface MeanAndDeviationDisplayProps {
  mean: number
  sd: number
  ownMean: number
  ownSd: number
  unitValue: string
}

export interface MeanAndSdResponse {
  level: string
  meanAndSd: {
    mean: number
    standardDeviation: number
  }
}


export interface MultipleLineChartProps {
  analyticsListData: AnalyticGroupedData[]
  colors?: string[]
}

export interface SingleLineGraphProps {
  testList: string[]
  analyticsType: string
  levelListSize: number
}

export interface MultipleLineGraphProps {
  levelListSize: number
  testList: string[]
  analyticsType: string
}

export interface AnalyticWithStatsData {
  calcMeanAndStdDTO: {
    mean: number
    standardDeviation: number
  }
  analyticsDTO: {
    unit_value?: string
  }[]
}

export interface PayloadData {
  date: string
  level: string
  levelLot: string
  name: string
  rawValue: number
  unitValue: string
  mean: number
  sd: number
}

export interface LegendCustomSingleLineProps extends LegendProps {
  payload?: Array<{
    value: string
    payload: {
      level: string
      strokeDasharray: string | number
    }
  }>
  data?: Array<{
    level: string
  }>
}

export interface LegendMultipleLinesProps {
  payload?: any[]
  levels: string[]
}

export type ViewMode = 'single' | 'dual'

export interface GraphContextType {
  viewMode: ViewMode
  toggleView: () => void
  setViewMode: (mode: ViewMode) => void
}

export interface StatItemProps {
  label: string
  value?: number
  formatter: (value: number) => string
}
