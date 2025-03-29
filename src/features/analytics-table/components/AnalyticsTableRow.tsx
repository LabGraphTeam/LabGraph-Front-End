import React, { useState } from 'react'
import { CiCircleAlert, CiEdit } from 'react-icons/ci'

import { DESCRIPTION_OPTIONS } from '@/features/analytics-table/constants/descriptionOptions'
import sanitizeDescription from '@/features/analytics-table/utils/sanitizeDescription'
import customFormatDateWithYear from '@/features/shared/ui/date-selectors/constants/customFormatDateWithYear'
import ValidateButton from '@/features/shared/ui/layouts/ValidateButton'
import ErrorMessage from '@/features/shared/utils/components/error-message'
import { TableRowProps } from '@/types/AnalyticsTable'

const TableRow: React.FC<TableRowProps> = ({
  analyticData: item,
  onValidate,
  onUpdateDescription
}) => {
  const [validationError, setValidationError] = useState<Error | null>(null)

  const [isEditing, setIsEditing] = useState(false)
  const [description, setDescription] = useState(
    item.description ? sanitizeDescription(item.description) : ''
  )
  const [isCustomDescription, setIsCustomDescription] = useState(
    !DESCRIPTION_OPTIONS.some(
      (option) => option.value === sanitizeDescription(item.description || '')
    ) && item.description !== ''
  )

  const handleAnalyticsValidate = () => {
    if (onValidate) {
      onValidate(item.id).catch((error) => {
        setValidationError(error)
      })
    }
  }

  const handleSaveDescription = () => {
    if (onUpdateDescription) {
      const cleanDescription = sanitizeDescription(description)
      onUpdateDescription(item.id, cleanDescription).catch((error) => {
        setValidationError(error)
      })
      setIsEditing(false)
    }
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if (value === 'Other') {
      setIsCustomDescription(true)
      setDescription('')
      return
    }
    setIsCustomDescription(false)
    setDescription(value)
  }

  return (
    <tr className='rounded-md transition-colors duration-200 hover:bg-muted'>
      <td className='border-b border-border px-3 py-2 text-[6px] text-textPrimary md:text-xs'>
        {customFormatDateWithYear(item.date)}
      </td>
      <td className='border-b border-border px-3 py-2 text-[6px] text-textPrimary md:text-xs'>
        {item.name}
      </td>
      <td className='border-b border-border px-3 py-2 text-[6px] text-textPrimary md:text-xs'>
        {item.level.toUpperCase()}
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
          <span className='flex items-center'>
            <span className='mr-1' />
            {item.validator_user}
          </span>
        ) : (
          <span className='flex gap-1'>
            <CiCircleAlert width={12} height={12} />
            Pending
          </span>
        )}
      </td>
      <td className='border-b border-border px-3 py-2 text-[6px] md:text-xs'>
        <span className='flex items-center gap-1 '>
          {item.validator_user === 'Not validated' ? (
            <>
              <ValidateButton
                isToValidate={true}
                handleAnalyticsValidate={handleAnalyticsValidate}
              />
              {validationError && <ErrorMessage message={validationError.message} />}
            </>
          ) : (
            <ValidateButton
              isToValidate={false}
              handleAnalyticsValidate={handleAnalyticsValidate}
            />
          )}
          <button
            className='rounded border border-borderColor bg-surface p-1 text-[6px] text-textPrimary md:text-xs'
            onClick={() => setIsEditing(true)}
          >
            <CiEdit strokeWidth={1} />
          </button>
        </span>
      </td>

      <td className='border-b border-border px-3 py-2 text-[6px] text-textPrimary md:text-xs'>
        {isEditing ? (
          <div className='flex flex-col gap-1'>
            <select
              className='rounded border border-gray-300 px-2 py-1 text-[6px] text-black md:text-xs'
              onChange={handleDescriptionChange}
              value={isCustomDescription ? 'Other' : description}
            >
              {DESCRIPTION_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {isCustomDescription ? (
              <input
                className='mt-1 w-full rounded border border-gray-300 px-2 py-1 text-[6px] text-black md:text-xs'
                onChange={(e) => setDescription(e.target.value)}
                placeholder='Enter custom description'
                type='text'
                value={description}
              />
            ) : null}

            <span className='mt-1 flex gap-1'>
              <button
                className='rounded bg-blue-600 px-2 py-1 text-[6px] text-white hover:bg-blue-500 md:text-xs'
                onClick={handleSaveDescription}
              >
                Save
              </button>
              <button
                className='rounded bg-danger px-2 py-1 text-[6px] text-white hover:bg-red-400 md:text-xs'
                onClick={() => {
                  setIsEditing(false)
                  setDescription(item.description || '')
                  setIsCustomDescription(
                    !DESCRIPTION_OPTIONS.some((option) => option.value === item.description) &&
                      item.description !== ''
                  )
                }}
              >
                Cancel
              </button>
            </span>
          </div>
        ) : (
          <div className='flex items-center justify-between'>
            <span>{description || '-'}</span>
          </div>
        )}
      </td>
    </tr>
  )
}

export default TableRow
