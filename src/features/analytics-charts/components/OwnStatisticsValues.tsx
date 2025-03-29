interface OwnStatisticsValues {
  isOwnStatisticValues: boolean
}

const OwnStatisticsValues = ({ isOwnStatisticValues }: OwnStatisticsValues) => {
  return (
    <span className={`text-[6px] font-extralight text-textPrimary md:text-xs`}>
      {isOwnStatisticValues ? 'Calculated' : 'Reference'}
    </span>
  )
}
export default OwnStatisticsValues
