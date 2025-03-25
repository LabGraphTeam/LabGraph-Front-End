import { LegendMultipleLinesProps } from '@/types/Chart'
import React from 'react'

const LegendMultiple: React.FC<LegendMultipleLinesProps> = ({
  payload,
  multipleLineLevels: levels
}) => {
  if (!payload) return null

  return (
    <div className='mt-2 flex justify-center gap-4 text-xs md:text-sm'>
      {payload.map((entry: { color: string }, index: number) => (
        <div className='flex items-center gap-2' key={`legend-${index}-${levels[index]}`}>
          <div className='size-2.5 rounded-full' style={{ backgroundColor: entry.color }} />
          <span className='text-xs text-textPrimary md:text-sm'>{levels[index].toUpperCase()}</span>
        </div>
      ))}
    </div>
  )
}

export default LegendMultiple
