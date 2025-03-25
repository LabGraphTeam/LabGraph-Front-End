import { useState } from 'react';

export default function useDateSelector() {

  const today = new Date();

  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const startDate = {
    day: firstDayOfMonth.getDate(),
    month: firstDayOfMonth.getMonth() + 1,
    year: firstDayOfMonth.getFullYear(),
  };

  const endDate = {
    day: today.getDate(),
    month: today.getMonth() + 1,
    year: today.getFullYear(),
  };

  const [startDay, setStartDay] = useState<number>(startDate.day);
  const [startMonth, setStartMonth] = useState<number>(startDate.month);
  const [startYear, setStartYear] = useState<number>(startDate.year);

  const [endDay, setEndDay] = useState<number>(endDate.day);
  const [endMonth, setEndMonth] = useState<number>(endDate.month);
  const [endYear, setEndYear] = useState<number>(endDate.year);

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

  const dateValues = {
    startDay,
    startMonth,
    startYear,
    endDay,
    endMonth,
    endYear,
  }

  const dateHandlers = {
    handleStartDayChange,
    handleStartMonthChange,
    handleStartYearChange,
    handleEndDayChange,
    handleEndMonthChange,
    handleEndYearChange,
  }

  const combinedDateAndHandlersProps = {
    ...dateValues,
    ...dateHandlers
  }

  const combinedDateProps = {
    startDate,
    endDate
  }

  return {
    combinedDateAndHandlersProps,
    combinedDateProps,
    dateValues
  }
}
