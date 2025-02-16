import React from 'react';
import { TooltipProps } from 'recharts';

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
    );

    return (
      <div className='rounded border border-border bg-background p-1 text-[0.5rem] text-textPrimary shadow-md shadow-shadow md:text-[0.65rem]'>
        {uniqueEntries.map((entry) => {
          const dataKeyIndex = entry.dataKey?.toString().slice(-1) ?? '';
          const data = entry.payload;
          const date = `date${dataKeyIndex}`;
          const level = `level${dataKeyIndex}`;
          const valueKey = `value${dataKeyIndex}`;
          const rawValueKey = `rawValue${dataKeyIndex}`;
          const levelLotKey = `levelLot${dataKeyIndex}`;
          const nameKey = `name${dataKeyIndex}`;
          const meanKey = `mean${dataKeyIndex}`;
          const sdKey = `sd${dataKeyIndex}`;

          if (data[valueKey]) {
            return (
              <div key={entry.payload.id} className='border-border'>
                <div className='flex items-center gap-2'>
                  <div
                    className='size-2.5 rounded-full'
                    style={{ backgroundColor: entry.stroke }}
                  />
                  <span className='font-medium'>{data[level].toUpperCase()}</span>
                </div>
                <p>Date: {data[date]}</p>
                <p>Test: {data[nameKey]}</p>
                <p>Value: {data[rawValueKey]}</p>
                <p>Lot: {data[levelLotKey]}</p>
                <p>Mean: {data[meanKey].toFixed(2)}</p>
                <p>Sd: {data[sdKey].toFixed(2)}</p>
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  }
  return null;
};

export default TooltipMultiple;
