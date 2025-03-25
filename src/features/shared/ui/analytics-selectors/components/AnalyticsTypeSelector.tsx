import { useAnalyticsOptions } from '@/shared/hooks/useAnalyticsOptions'
import { AnalyticsTypeSelectorProps } from '@/types/Reports'

const AnalyticsTypeSelector = ({ analyticsType, onChange }: AnalyticsTypeSelectorProps) => {
  const { analyticsOptions } = useAnalyticsOptions(analyticsType)

  return (
    <select
      className='rounded-md border border-borderColor bg-background p-1 text-center text-xs text-textSecondary shadow-sm shadow-shadow'
      onChange={(e) => onChange(e.target.value)}
      value={analyticsType}
    >
      {analyticsOptions.map((option: { value: string; label: string }) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

export default AnalyticsTypeSelector
