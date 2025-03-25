import React from 'react'
import { TooltipProps } from 'recharts'

/* eslint-disable @typescript-eslint/no-explicit-any */
const TooltipMultiple: React.FC<TooltipProps<any, any>> = ({ active, payload }) => {
  if (active && payload?.length) {
    const uniqueEntries = payload.filter(
      (entry, index, self) =>
        index ===
        self.findIndex(
          (e) =>
            e.dataKey &&
            entry.dataKey &&
            e.payload[`date${e.dataKey.toString().slice(-1)}`] ===
              entry.payload[`date${entry.dataKey.toString().slice(-1)}`] &&
            e.payload[`level${e.dataKey.toString().slice(-1)}`] ===
              entry.payload[`level${entry.dataKey.toString().slice(-1)}`]
        )
    )

    return (
      <div className='rounded border border-border bg-background p-1 text-[0.5rem] text-textPrimary shadow-md shadow-shadow md:text-[0.65rem]'>
        {uniqueEntries.map((entry) => {
          const dataKeyIndex = entry.dataKey?.toString().slice(-1) ?? ''
          const id = entry.dataKey
          const data = entry.payload
          const date = `date${dataKeyIndex}`
          const level = `level${dataKeyIndex}`
          const valueKey = `value${dataKeyIndex}`
          const rawValueKey = `rawValue${dataKeyIndex}`
          const levelLotKey = `levelLot${dataKeyIndex}`
          const nameKey = `name${dataKeyIndex}`
          const meanKey = `mean${dataKeyIndex}`
          const sdKey = `sd${dataKeyIndex}`
          const unitKey = `unit${dataKeyIndex}`

          if (data[valueKey]) {
            return (
              <div className='border-border' key={`tooltip-${id}-${level}`}>
                <div className='flex items-center gap-2'>
                  <div className='size-2 rounded-full' style={{ backgroundColor: entry.stroke }} />
                  <span className='text-[10px] font-extralight text-textPrimary'>
                    {data[level].toUpperCase()}
                  </span>
                </div>
                <p>Date of Analysis: {data[date]}</p>
                <p>Analyte: {data[nameKey]}</p>
                <p>Lot: {data[levelLotKey]}</p>
                <p>Value: {data[rawValueKey] + '-' + data[unitKey]}</p>
                <p>Mean: {data[meanKey].toFixed(2) + '-' + data[unitKey]}</p>
                <p>StandardDeviation: {data[sdKey].toFixed(2) + '-' + data[unitKey]}</p>
              </div>
            )
          }
          return null
        })}
      </div>
    )
  }
  return null
}

export default TooltipMultiple
