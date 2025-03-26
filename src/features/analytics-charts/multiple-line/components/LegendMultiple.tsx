import React from 'react'

import { LegendMultipleLinesProps } from '@/types/Chart'

const LegendMultiple: React.FC<LegendMultipleLinesProps> = ({
  payload,
  multipleLineLevels: levels
}) => {
  if (!payload) return null

  return (
    <div className='mt-2 flex justify-center gap-4 text-xs'>
      {payload.map((entry: { color: string }, index: number) => (
        <div className='flex items-center gap-2' key={`legend-${index}-${levels[index]}`}>
          <div
            className='size-1.5 rounded-full md:size-2.5'
            style={{ backgroundColor: entry.color }}
          />
          <span className='text-xs text-textPrimary'>{levels[index].toUpperCase()}</span>
        </div>
      ))}
    </div>
  )
}

export default LegendMultiple
