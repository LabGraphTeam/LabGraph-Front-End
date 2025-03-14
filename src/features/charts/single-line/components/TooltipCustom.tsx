import { TooltipProps } from 'recharts'
import { PayloadData } from '../../types/Chart'
import getColorByLevel from '../../utils/getColorByLevel'

const TooltipCustom = ({ active, payload }: TooltipProps<number, string>) => {
  if (!active || !payload?.length) return null

  return (
    <div className='rounded border border-border bg-background p-2 text-xs text-textPrimary shadow-md shadow-shadow'>
      {payload.map((item) => {
        const data = item.payload as PayloadData
        return (
          <div
            key={`${data.date}-${data.level}-${data.levelLot}`}
            className='mb-2 border-b border-border last:border-0 last:pb-0'
          >
            <div className='mb-1 flex items-center gap-2'>
              <div
                className='size-2.5 rounded-full'
                style={{
                  backgroundColor: getColorByLevel(data.level)
                }}
              />
              <span className='font-medium'>Level: {data.level.toUpperCase()}</span>
            </div>
            <p>Test: {data.name}</p>
            <p>Date: {data.date}</p>
            <p>Value: {`${data.rawValue.toFixed(2)} ${data.unitValue}`}</p>
            <p>Lot: {data.levelLot}</p>
            <p>Mean: {data.mean.toFixed(2)}</p>
            <p>Sd: {data.sd.toFixed(2)}</p>
          </div>
        )
      })}
    </div>
  )
}

export default TooltipCustom
