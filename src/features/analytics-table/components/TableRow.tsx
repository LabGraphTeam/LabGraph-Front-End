import { TableRowProps } from '@/types/AnalyticsTable'
import React from 'react'

const TableRow: React.FC<TableRowProps> = ({ analyticItem: item, onValidate }) => {
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
      <td className='border-b border-border px-3 py-2 text-[6px] text-textPrimary md:text-sm'>
        {item.validator_user ? (
          <span className="flex items-center text-green-500">
            <span className="mr-1">✅</span>
            {item.validator_user}
          </span>
        ) : (
          <span className="flex items-center text-amber-500">
            ⚠️
            Pending
          </span>
        )}
      </td>
      <td className='border-b border-border px-3 py-2 text-[6px] text-textPrimary md:text-sm'>
        {!item.validator_user && (
          <button
            onClick={() => onValidate && onValidate(item.id)}
            className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-[6px] md:text-xs"
          >
            Validate
          </button>
        )}
        {item.validator_user && (
          <button
            disabled
            className="px-2 py-1 bg-gray-400 text-gray-200 rounded cursor-not-allowed text-[6px] md:text-xs"
          >
            Validated
          </button>
        )}
      </td>
    </tr>
  )
}

export default TableRow
