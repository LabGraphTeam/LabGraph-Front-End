import { useState } from 'react';

export default function useDateSelector() {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(1);

  const [startDay, setStartDay] = useState<number>(startDate.getDate());
  const [startMonth, setStartMonth] = useState<number>(startDate.getMonth() + 1);
  const [startYear, setStartYear] = useState<number>(startDate.getFullYear());

  const [endDay, setEndDay] = useState<number>(endDate.getDate());
  const [endMonth, setEndMonth] = useState<number>(endDate.getMonth() + 1);
  const [endYear, setEndYear] = useState<number>(endDate.getFullYear());

  // Helper function to get the last day of a month
  function getLastDayOfMonth(year: number, month: number): number {
    // month parameter is 1-12, but Date constructor expects 0-11
    return new Date(year, month, 0).getDate();
  }

  const handleStartDayChange = (day: number) => {
    // Validate day is within the month's range
    const maxDays = getLastDayOfMonth(startYear, startMonth);
    const validDay = Math.min(day, maxDays);
    
    // Set end date to the last day of the same month
    const lastDayOfMonth = getLastDayOfMonth(startYear, startMonth);

    setStartDay(validDay);
    setEndDay(lastDayOfMonth);
    setEndMonth(startMonth);
    setEndYear(startYear);
  };

  const handleEndDayChange = (day: number) => {
    // Validate day is within the month's range
    const maxDays = getLastDayOfMonth(endYear, endMonth);
    const validDay = Math.min(day, maxDays);
    
    setEndDay(validDay);
  };

  const handleStartMonthChange = (month: number) => {
    // Ensure day is valid for the new month
    const maxDays = getLastDayOfMonth(startYear, month);
    const validDay = Math.min(startDay, maxDays);
    
    // Set end date to the last day of the same month
    const lastDayOfMonth = getLastDayOfMonth(startYear, month);

    setStartMonth(month);
    setStartDay(validDay);
    setEndDay(lastDayOfMonth);
    setEndMonth(month);
    setEndYear(startYear);
  };

  const handleEndMonthChange = (month: number) => {
    // Ensure day is valid for the new month
    const maxDays = getLastDayOfMonth(endYear, month);
    const validDay = Math.min(endDay, maxDays);
    
    setEndMonth(month);
    setEndDay(validDay);
  };

  const handleStartYearChange = (year: number) => {
    // Ensure day is valid for the new year (especially for Feb 29)
    const maxDays = getLastDayOfMonth(year, startMonth);
    const validDay = Math.min(startDay, maxDays);
    
    // Set end date to the last day of the same month
    const lastDayOfMonth = getLastDayOfMonth(year, startMonth);

    setStartYear(year);
    setStartDay(validDay);
    setEndDay(lastDayOfMonth);
    setEndMonth(startMonth);
    setEndYear(year);
  };

  const handleEndYearChange = (year: number) => {
    // Ensure day is valid for the new year (especially for Feb 29)
    const maxDays = getLastDayOfMonth(year, endMonth);
    const validDay = Math.min(endDay, maxDays);
    
    setEndYear(year);
    setEndDay(validDay);
  };

  return {
    startDay,
    startMonth,
    startYear,
    handleStartDayChange,
    handleStartMonthChange,
    handleStartYearChange,
    endDay,
    endMonth,
    endYear,
    handleEndDayChange,
    handleEndMonthChange,
    handleEndYearChange,
  };
}
