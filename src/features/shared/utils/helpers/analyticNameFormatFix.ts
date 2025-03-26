const analyticNameFormatFix = (testName: string) => {
  if (testName.includes('#')) {
    return testName.replace('#', '%23')
  }
  if (testName.includes('%')) {
    return testName.replace('%', '%25')
  }

  return testName
}

export default analyticNameFormatFix
