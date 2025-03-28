const formatWithUnit = (value: number = 0, unitValue: string) =>
  value.toFixed(2) + (unitValue ? ' (' + unitValue + ')' : '')

export default formatWithUnit
