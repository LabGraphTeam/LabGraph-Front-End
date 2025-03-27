export interface ChartConfig {
  testList: string[]
  analyticsType: string
  size: number
}

export type ChartConfigMap = Record<string, ChartConfig>

export const chartConfigs: ChartConfigMap = {
  hematology: {
    testList: [
      'WBC',
      'RBC',
      'HGB',
      'HCT',
      'MCV',
      'MCH',
      'MCHC',
      'RDW-CV',
      'PLT',
      'NEU#',
      'LYM#',
      'MON#',
      'EOS#',
      'BAS#',
      'NRBC%',
      'NRBC#',
      'NEU%',
      'LYM%',
      'MON%',
      'EOS%',
      'BAS%'
    ],
    analyticsType: 'hematology-analytics',
    size: 3
  },
  biochemistry: {
    testList: [
      'ALB2',
      'ALP2S',
      'ALTL',
      'AMYL2',
      'ASTL',
      'BILD2',
      'BILT3',
      'CA2',
      'CHOL2',
      'CK2',
      'CKMB2',
      'CL-I',
      'CREJ2',
      'CRP4',
      'GGTI2',
      'GLUC3',
      'HDLC4',
      'K-I',
      'LDHI2',
      'LIP',
      'MG-2',
      'NA-I',
      'PHOS2',
      'TRIGL',
      'UA2',
      'UREL'
    ],
    analyticsType: 'biochemistry-analytics',
    size: 2
  },
  coagulation: {
    testList: ['TAP-20', 'TTPA'],
    analyticsType: 'coagulation-analytics',
    size: 2
  }
}

export const getValidChartTypes = (): string[] => {
  return Object.keys(chartConfigs)
}
