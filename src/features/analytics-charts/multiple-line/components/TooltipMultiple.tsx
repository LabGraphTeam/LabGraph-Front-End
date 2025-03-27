import React from 'react'
import { TooltipProps } from 'recharts'

import DataItem from '@/features/analytics-charts/components/DataItem'

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
      <div className='flex flex-row  gap-2 rounded border border-border bg-background p-1 text-[0.5rem] text-textPrimary shadow-md shadow-shadow md:gap-4 md:p-4 md:text-[0.65rem]'>
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
              <div key={`tooltip-${id}-${level}`}>
                <div className='flex items-center gap-2'>
                  <div className='size-2 rounded-full' style={{ backgroundColor: entry.stroke }} />
                  <span className='text-[10px] font-extralight text-textPrimary'>
                    {data[level].toUpperCase()}
                  </span>
                </div>
                <DataItem label='Date of Analysis' value={data[date]} />
                <DataItem label='Analyte' value={data[nameKey]} />
                <DataItem label='Lot' value={data[levelLotKey]} />
                <DataItem label='Value' value={`${data[rawValueKey]}(${data[unitKey]})`} />
                <DataItem
                  label='Mean'
                  value={`${data[meanKey].toFixed(2)}(${data[unitKey]})`}
                />{' '}
                <DataItem
                  label='StandardDeviation'
                  value={`${data[sdKey].toFixed(2)}(${data[unitKey]})`}
                />
              </div>
            )
          }
        })}
      </div>
    )
  }
}

export default TooltipMultiple
