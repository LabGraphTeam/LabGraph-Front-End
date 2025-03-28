import { LegendProps } from 'recharts'

/** Representa um conjunto de dados analíticos */
export interface AnalyticData {
  id: number
  name: string
  level_lot: string
  test_lot: string
  level: string
  sd: number
  mean: number
  date: string
  value: number
  unit_value: string
  description: string
  rules: string
}

export interface MeanStdDevValueData {
  sd: number
  mean: number
  standardDeviation: number
}

export interface GroupedValuesByLevel {
  level: string
  values: AnalyticData[]
}

export interface GroupedMeanStdByLevel {
  level: string
  values: MeanStdDevValueData[]
}

export interface GroupedAnalyticData {
  groupedValuesByLevelDTO: GroupedValuesByLevel
  groupedMeanAndStdByLevelDTO: GroupedMeanStdByLevel
}

export interface AnalyticWithStatsData {
  calcMeanAndStdDTO: {
    mean: number
    standardDeviation: number
  }
  analyticsDTO: AnalyticData[]
}

export interface ChartEntry {
  date?: string
  [key: `value${number}`]: number
  [key: `date${number}`]: string
  [key: `level${number}`]: string
  [key: `rawValue${number}`]: string
  [key: `levelLot${number}`]: string
  [key: `name${number}`]: string
  [key: `description${number}`]: string
  [key: `rules${number}`]: string
  [key: `mean${number}`]: number
  [key: `sd${number}`]: number
  [key: `unit${number}`]: string
}

export interface MeanAndDeviationDisplayProps {
  mean: number
  sd: number
  ownMean: number
  ownSd: number
  unitValue: string
}

export interface MultipleLineChartProps {
  groupedAnalysisData: GroupedAnalyticData[]
}

export interface BaseGraphProps {
  availableAnalyticsNames: string[]
  defaultAnalyticsType: string
}
export interface SingleLineGraphProps extends BaseGraphProps {
  size: number
}

export type MultipleLineGraphProps = BaseGraphProps

export interface PayloadData {
  date: string
  level: string
  levelLot: string
  name: string
  rawValue: number
  unitValue: string

  rawValue: number
  sd: number
  mean: number
  ownSd: number
  ownMean: number
  description: string
  rules: string
}

export interface LegendCustomSingleLineProps extends LegendProps {
  payload?: Array<{
    value: string
    payload: {
      level: string
      strokeDasharray: string | number
    }
  }>
  levelData?: Array<{ dataLevel: string }>
}

export interface LegendMultipleLinesProps {
  payload?: { color: string }[]
  multipleLineLevels: string[]
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
  unitValue?: string
  formatStatValue: (value: number, unitValue: string) => string
}
