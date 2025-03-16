import { TableRowProps } from '@/types/AnalyticsTable'
import React from 'react'

const TableRow: React.FC<TableRowProps> = ({ analyticItem: item }) => {
  return (
    <tr className='rounded-md transition-colors duration-200 hover:bg-muted'>
      <td className='border-b border-border px-3 py-2 text-[6px] text-textPrimary md:text-sm'>
        {item.date}
      </td>
      <td className='border-b border-border px-3 py-2 text-[6px] text-textPrimary md:text-sm'>
        {item.name}
      </td>
      <td className='border-b border-border px-3 py-2 text-[6px] text-textPrimary md:text-sm'>
        {item.level}
      </td>
      <td className='border-b border-border px-3 py-2 text-[6px] text-textPrimary md:text-sm'>
        {item.level_lot}
      </td>
      <td className='border-b border-border px-3 py-2 text-[6px] text-textPrimary md:text-sm'>
        {item.sd.toFixed(2)}
      </td>
      <td className='border-b border-border px-3 py-2 text-[6px] text-textPrimary md:text-sm'>
        {item.mean.toFixed(2)}
      </td>
      <td className='border-b border-border px-3 py-2 text-[6px] text-textPrimary md:text-sm'>
        {item.value.toFixed(2)}
      </td>
      <td className='border-b border-border px-3 py-2 text-[6px] text-textPrimary md:text-sm'>
        {item.unit_value}
      </td>
      <td className='border-b border-border px-3 py-2 text-[6px] text-textPrimary md:text-sm'>
        {item.rules}
      </td>
    </tr>
  )
}

export default TableRow
