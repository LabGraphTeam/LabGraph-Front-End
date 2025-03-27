const DataItem = ({ label, value }: { label: string; value: string }) => (
  <div className='flex flex-col'>
    <span className='text-[12px] text-textPrimary'>{label}</span>
    <span className='text-[10px]'>{value}</span>
  </div>
)

export default DataItem
