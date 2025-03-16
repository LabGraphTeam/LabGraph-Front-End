const filter = (value: number, mean: number, sd: number) => {
  if (value > mean + 3 * sd) return mean + 3 * sd;
  if (value < mean - 3 * sd) return mean - 3 * sd;
  return value;
};

export default filter;
