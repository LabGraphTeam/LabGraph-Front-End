import { useMemo } from 'react'

export const useAnalyticsOptions = (analyticsType: string) => {
  const analyticsOptions = [
    { value: 'biochemistry-analytics', label: 'Biochemistry' },
    { value: 'hematology-analytics', label: 'Hematology' },
    { value: 'coagulation-analytics', label: 'Coagulation' }
  ]

  const levelOptions = useMemo(() => {
    switch (analyticsType) {
      case 'hematology-analytics':
        return [
          { value: 0, label: '-' },
          { value: 1, label: '1' },
          { value: 2, label: '2' },
          { value: 3, label: '3' }
        ]
      case 'biochemistry-analytics':
      case 'coagulation-analytics':
        return [
          { value: 0, label: '-' },
          { value: 1, label: '1' },
          { value: 2, label: '2' }
        ]
      default:
        return [{ value: 1, label: '1' }]
    }
  }, [analyticsType])


  const filters = [
    { value: false, label: '-' },
    { value: true, label: '⚠️ Pending' }]

  return { analyticsOptions, levelOptions, filters }
}
