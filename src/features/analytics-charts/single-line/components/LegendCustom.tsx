import getColorByLevel from '@/features/analytics-charts/utils/getColorByLevel'
import { LegendCustomSingleLineProps } from '@/types/Chart'

const LegendCustom = ({ payload, levelData: data }: LegendCustomSingleLineProps) => {
  if (!payload || !data) return null

  return (
    <div className='mt-2 flex justify-center gap-4 text-xs md:text-sm'>
      {payload.map((entry, index) => (
        <div className='flex items-center gap-2' key={`legend-${entry.value}`}>
          <div
            className='size-2.5 rounded-full'
            style={{
              backgroundColor: getColorByLevel(data[index].dataLevel.toString())
            }}
          />
          <span className='text-xs text-textPrimary md:text-sm'>
            {data[index].dataLevel.toString().toUpperCase()}
          </span>
        </div>
      ))}
    </div>
  )
}

export default LegendCustom
