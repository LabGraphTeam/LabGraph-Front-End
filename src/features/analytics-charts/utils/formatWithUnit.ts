const formatWithUnit = (value: number, unitValue: string) =>
  value.toFixed(2) + (unitValue ? ' (' + unitValue + ')' : '')

export default formatWithUnit
