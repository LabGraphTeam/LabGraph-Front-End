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

/** Define valores de média e desvio padrão */
export interface MeanStdDevValueData {
  mean: number
  standardDeviation: number
}

/** Representa um conjunto de valores agrupados por nível */
export interface GroupedValuesByLevel {
  level: string
  values: AnalyticData[]
}

/** Representa um conjunto de médias e desvios agrupados por nível */
export interface GroupedMeanStdByLevel {
  level: string
  values: MeanStdDevValueData[]
}

/** Representa dados agrupados com média e desvio padrão */
export interface GroupedAnalyticData {
  groupedValuesByLevelDTO: GroupedValuesByLevel
  groupedMeanAndStdByLevelDTO: GroupedMeanStdByLevel
}

/** Estrutura dos dados analíticos com estatísticas */
export interface AnalyticWithStatsData {
  calcMeanAndStdDTO: MeanStdDevValueData
  analyticsDTO: AnalyticData[]
}

/** Define uma entrada de gráfico com chaves dinâmicas */
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

/** Define os dados necessários para exibição de média e desvio padrão */
export interface MeanAndDeviationDisplayProps extends MeanStdDevValueData {
  ownMean: number
  ownSd: number
  unitValue: string
}

/** Propriedades do componente de gráfico de múltiplas linhas */
export interface MultipleLineChartProps {
  groupedAnalysisData: GroupedAnalyticData[]
}

/** Propriedades comuns a gráficos */
export interface BaseGraphProps {
  availableAnalyticsNames: string[]
  defaultAnalyticsType: string
}

/** Propriedades do gráfico de linha única */
export interface SingleLineGraphProps extends BaseGraphProps {
  size: number
}

/** Propriedades do gráfico de múltiplas linhas */
export type MultipleLineGraphProps = BaseGraphProps

/** Dados de payload utilizados em gráficos */
export interface PayloadData extends MeanAndDeviationDisplayProps {
  date: string
  level: string
  levelLot: string
  name: string
  rawValue: number
  unitValue: string
}

/** Props para o componente de legenda personalizada em um gráfico de linha única */
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

/** Props para a legenda de gráficos com múltiplas linhas */
export interface LegendMultipleLinesProps {
  payload?: { color: string }[]
  multipleLineLevels: string[]
}

/** Define os modos de exibição do gráfico */
export type ViewMode = 'single' | 'dual'

/** Define o contexto do gráfico */
export interface GraphContextType {
  viewMode: ViewMode
  toggleView: () => void
  setViewMode: (mode: ViewMode) => void
}

/** Propriedades dos itens estatísticos exibidos */
export interface StatItemProps {
  label: string
  value: number
  unitValue: string
  formatStatValue: (value: number, unitValue: string) => string
}
