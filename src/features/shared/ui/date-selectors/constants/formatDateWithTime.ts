const formatToTwoDigits = (value: number) => String(value).padStart(2, '0');

const formatDateWithTime = (year: number, month: number, day: number) => {
  const formattedDate = `${year}-${formatToTwoDigits(month)}-${formatToTwoDigits(day)}`;
  return `${formattedDate} 00:00:00`;
};

const formatEndDateWithTime = (year: number, month: number, day: number) => {
  const formattedDate = `${year}-${formatToTwoDigits(month)}-${formatToTwoDigits(day)}`;
  return `${formattedDate} 23:59:59`;
};

export { formatDateWithTime, formatEndDateWithTime };
