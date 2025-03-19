import { TableRowProps } from '@/types/AnalyticsTable'
import React, { useState } from 'react'
import { DESCRIPTION_OPTIONS } from '../constants/descriptionOptions'

const sanitizeDescription = (description: string): string => {
  if (!description) return ''

  let cleaned = description.replace(/\\"/g, '"')

  cleaned = cleaned.replace(/^"+(.+?)"+$/, '$1')

  return cleaned
}

const TableRow: React.FC<TableRowProps> = ({
  analyticItem: item,
  onValidate,
  onUpdateDescription
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [description, setDescription] = useState(
    item.description ? sanitizeDescription(item.description) : ''
  )
  const [isCustomDescription, setIsCustomDescription] = useState(
    !DESCRIPTION_OPTIONS.some(
      (option) => option.value === sanitizeDescription(item.description || '')
    ) && item.description !== ''
  )

  const handleSaveDescription = () => {
    if (onUpdateDescription) {
      const cleanDescription = sanitizeDescription(description)
      onUpdateDescription(item.id, cleanDescription)
      setIsEditing(false)
    }
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if (value === 'Other') {
      setIsCustomDescription(true)
      setDescription('')
    } else {
      setIsCustomDescription(false)
      setDescription(value)
    }
  }

  return (
    <tr className='rounded-md transition-colors duration-200 hover:bg-muted'>
      <td className='border-b border-border px-3 py-2 text-[6px] text-textPrimary md:text-xs'>
        {item.date}
      </td>
      <td className='border-b border-border px-3 py-2 text-[6px] text-textPrimary md:text-xs'>
        {item.name}
      </td>
      <td className='border-b border-border px-3 py-2 text-[6px] text-textPrimary md:text-xs'>
        {item.level}
      </td>
      <td className='border-b border-border px-3 py-2 text-[6px] text-textPrimary md:text-xs'>
        {item.level_lot}
      </td>
      <td className='border-b border-border px-3 py-2 text-[6px] text-textPrimary md:text-xs'>
        {item.sd.toFixed(2)}
      </td>
      <td className='border-b border-border px-3 py-2 text-[6px] text-textPrimary md:text-xs'>
        {item.mean.toFixed(2)}
      </td>
      <td className='border-b border-border px-3 py-2 text-[6px] text-textPrimary md:text-xs'>
        {item.value.toFixed(2)}
      </td>
      <td className='border-b border-border px-3 py-2 text-[6px] text-textPrimary md:text-xs'>
        {item.unit_value}
      </td>
      <td className='border-b border-border px-3 py-2 text-[6px] text-textPrimary md:text-xs'>
        {item.rules}
      </td>
      <td className='border-b border-border px-3 py-2 text-[6px] text-textPrimary md:text-xs'>
        {item.validator_user !== 'Not validated' ? (
          <span className='text-green-500 flex items-center'>
            <span className='mr-1'>✅</span>
            {item.validator_user}
          </span>
        ) : (
          <span className='flex items-center text-amber-500'>⚠️Pending</span>
        )}
      </td>
      <td className='border-b border-border px-3 py-2 text-[6px] text-textPrimary md:text-xs'>
        {item.validator_user === 'Not validated' && (
          <button
            onClick={() => onValidate?.(item.id)}
            className='rounded bg-blue-500 px-2 py-1 text-[6px] text-white hover:bg-blue-600 md:text-xs'
          >
            Validate
          </button>
        )}
        {item.validator_user !== 'Not validated' && (
          <button
            disabled
            className='cursor-not-allowed rounded bg-blue-400 px-2 py-1 text-[6px] text-white md:text-xs'
          >
            Validated
          </button>
        )}
      </td>
      <td className='border-b border-border px-3 py-2 text-[6px] text-textPrimary md:text-xs'>
        {isEditing ? (
          <div className='flex flex-col gap-1'>
            <select
              value={isCustomDescription ? 'Other' : description}
              onChange={handleDescriptionChange}
              className='rounded border border-gray-300 px-2 py-1 text-[6px] text-black md:text-xs'
            >
              {DESCRIPTION_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {isCustomDescription && (
              <input
                type='text'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder='Enter custom description'
                className='mt-1 w-full rounded border border-gray-300 px-2 py-1 text-[6px] text-black md:text-xs'
              />
            )}

            <div className='mt-1 flex gap-1'>
              <button
                onClick={handleSaveDescription}
                className='hover:bg-green-600 rounded bg-blue-500 px-2 py-1 text-[6px] text-white md:text-xs'
              >
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false)
                  setDescription(item.description || '')
                  setIsCustomDescription(
                    !DESCRIPTION_OPTIONS.some((option) => option.value === item.description) &&
                      item.description !== ''
                  )
                }}
                className='rounded bg-danger px-2 py-1 text-[6px] text-white hover:bg-gray-600 md:text-xs'
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className='flex items-center justify-between'>
            <span>{description || '-'}</span>
            <button
              onClick={() => setIsEditing(true)}
              className='ml-2 text-[6px] text-blue-500 hover:text-blue-700 md:text-xs'
            >
              ✏️
            </button>
          </div>
        )}
      </td>
    </tr>
  )
}

export default TableRow
