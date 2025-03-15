const analyticNameFormatFix = (testName: string) => {
  if (testName.includes('#')) {
    return (testName = testName.replace('#', '%23'));
  }
  if (testName.includes('%')) {
    return (testName = testName.replace('%', '%25'));
  }

  return testName;
};

export default analyticNameFormatFix;
