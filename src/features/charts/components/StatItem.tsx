import React from 'react';

interface StatItemProps {
  label: string;
  value?: number;
  formatter: (value: number) => string;
}

const StatItem: React.FC<StatItemProps> = ({ label, value, formatter }) => {
  const displayValue = React.useMemo(() => {
    if (value === undefined || isNaN(value)) return '';
    return formatter(value);
  }, [value, formatter]);

  return (
    <div className='flex flex-row justify-start md:flex-col'>
      <span>{label}:</span>
      <span className='text-textPrimary'>{displayValue}</span>
    </div>
  );
};

export default React.memo(StatItem);
