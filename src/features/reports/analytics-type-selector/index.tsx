import { AnalyticsTypeSelectorProps } from './type/AnalyticsTypeSelector';

const AnalyticsTypeSelector = ({ analyticsType, onChange }: AnalyticsTypeSelectorProps) => {
  return (
    <select
      className='rounded-md border border-borderColor bg-background text-xs text-textSecondary shadow-sm shadow-shadow md:text-sm'
      value={analyticsType}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value={'biochemistry-analytics'}>BIOCHEMISTRY</option>
      <option value={'hematology-analytics'}>HEMATOLOGY</option>
      <option value={'coagulation-analytics'}>COAGULATION</option>
    </select>
  );
};

export default AnalyticsTypeSelector;
