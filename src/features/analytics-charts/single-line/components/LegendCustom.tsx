import { LegendCustomSingleLineProps } from '@/types/Chart'
import getColorByLevel from '../../utils/getColorByLevel'

const LegendCustom = ({ payload, data }: LegendCustomSingleLineProps) => {
  if (!payload || !data) return null

  return (
    <div className='mt-2 flex justify-center gap-4 text-xs md:text-sm'>
      {payload.map((entry, index) => (
        <div key={`legend-${entry.value}`} className='flex items-center gap-2'>
          <div
            className='size-2.5 rounded-full'
            style={{
              backgroundColor: getColorByLevel(data[index].level.toString())
            }}
          />
          <span className='text-xs text-textPrimary md:text-sm'>
            {data[index].level.toString().toUpperCase()}
          </span>
        </div>
      ))}
    </div>
  )
}

export default LegendCustom
