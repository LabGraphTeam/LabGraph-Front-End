import filter from './filter';

const normalizeValue = (value: number, mean: number, sd: number) => {
  return (filter(value, mean, sd) - mean) / (sd || 1);
};

export default normalizeValue;
