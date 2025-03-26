export const DESCRIPTION_OPTIONS = [
  { value: '', label: 'Select a description...' },
  { value: 'Repeated in same aliquot', label: 'Repeated in same aliquot' },
  { value: 'Reconstituted in new aliquot', label: 'Reconstituted in new aliquot' },
  { value: 'Reagent change', label: 'Reagent change' },
  { value: 'Control stability', label: 'Control stability' },
  { value: 'Unknown issue', label: 'Unknown issue' },
  {
    value: 'Accepted with custom mean and deviations',
    label: 'Accepted with custom mean and deviations'
  },
  { value: 'Requires investigation', label: 'Requires investigation' },
  { value: 'Other', label: 'Other (custom)' }
] as const
