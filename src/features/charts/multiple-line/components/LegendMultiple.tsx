import React from 'react'
import { LegendMultipleLinesProps } from '../../types/Chart'

const LegendMultiple: React.FC<LegendMultipleLinesProps> = ({ payload, levels }) => {
  if (!payload) return null

  return (
    <div className='mt-2 flex justify-center gap-4 text-xs md:text-sm'>
      {payload.map((entry: any, index: number) => (
        <div key={`legend-${index}-${levels[index]}`} className='flex items-center gap-2'>
          <div className='size-2.5 rounded-full' style={{ backgroundColor: entry.color }} />
          <span className='text-xs text-textPrimary md:text-sm'>{levels[index].toUpperCase()}</span>
        </div>
      ))}
    </div>
  )
}

export default LegendMultiple
