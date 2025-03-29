const DataItem = ({ label, value }: { label: string; value: string }) => (
  <div className='flex flex-col'>
    <span className='text-textPrimary md:text-[12px]'>{label}</span>
    <span className='md:text-[10px]'>{value}</span>
  </div>
)

export default DataItem
