import MeanAndDeviationDisplay from '@/features/analytics-charts/components/MeanAndDeviationDisplay'
import getColorByLevel from '@/features/analytics-charts/utils/getColorByLevel'
import returnFullNameByTest from '@/features/analytics-charts/utils/returnFullNameByTest'
import { PayloadData } from '@/types/Chart'
import { TooltipProps } from 'recharts'

const TooltipCustom = ({ active, payload }: TooltipProps<number, string>) => {
  if (!active || !payload?.length) return null

  return (
    <div className='shadow-shadow/20 scale-95 gap-2 rounded-lg border border-border bg-background p-2 text-[10px] text-textPrimary shadow-lg transition-all duration-200 md:text-[12px]'>
      {payload.map((item) => {
        const data = item.payload as PayloadData
        return (
          <div
            className='mb-3 border-b border-border pb-2 last:mb-0 last:border-0 last:pb-0'
            key={`${data.date}-${data.level}-${data.levelLot}`}
          >
            <div className='mb-2 flex items-center gap-2'>
              <div
                className='ring-border/30 size-2 rounded-full ring-1'
                style={{
                  backgroundColor: getColorByLevel(data.level)
                }}
              />
              <span className='font-light tracking-wide'>{data.level.toUpperCase()}</span>
            </div>

            <div className='text-[12px]'>
              <DataItem label='Analyte Name:' value={returnFullNameByTest(data.name)} />
              <DataItem label='Date of Analysis:' value={data.date} />
              <DataItem
                label='Value of Analysis:'
                value={`${data.rawValue.toFixed(2)} ${data.unitValue}`}
              />
              <DataItem label='Lot of control:' value={data.levelLot} />

              <MeanAndDeviationDisplay
                mean={data.mean}
                ownMean={data.ownMean}
                ownSd={data.sd}
                sd={data.sd}
                unitValue={data.unitValue}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

const DataItem = ({ label, value }: { label: string; value: string }) => (
  <div className='flex flex-col'>
    <span className='text-[12px] text-textPrimary'>{label}</span>
    <span className='text-[10px]'>{value}</span>
  </div>
)

export default TooltipCustom
