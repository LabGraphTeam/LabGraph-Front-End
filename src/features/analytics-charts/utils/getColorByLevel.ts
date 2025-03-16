const getColorByLevel = (level: string) => {
  const upperLevel = level.toUpperCase();
  switch (upperLevel) {
    case 'LOW':
    case 'PCCC1':
      return 'var(--color-primary)';
    case 'NORMAL':
    case 'NORMAL C. ASSAYED':
      return 'var(--color-secondary)';
    case 'HIGH':
    case 'PCCC2':
    case 'LOW ABN C. ASSAYED':
      return 'var(--color-accent)';
    default:
      return 'var(--color-primary)';
  }
};

export default getColorByLevel;
