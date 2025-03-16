export interface DateSelectorProps {
  startDay: number;
  startMonth: number;
  startYear: number;
  endDay: number;
  endMonth: number;
  endYear: number;
  handleStartDayChange: (day: number) => void;
  handleStartMonthChange: (month: number) => void;
  handleStartYearChange: (year: number) => void;
  handleEndDayChange: (day: number) => void;
  handleEndMonthChange: (month: number) => void;
  handleEndYearChange: (year: number) => void;
}

export interface DaySelectorProps {
  selectedDay: number;
  onDayChange: (day: number) => void;
}

export interface MonthSelectorProps {
  selectedMonth: number;
  onMonthChange: (month: number) => void;
}

export interface SingleDateSelectorProps {
  label: string;
  day: number;
  month: number;
  year: number;
  onDayChange: (day: number) => void;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
}

export interface YearSelectorProps {
  selectedYear: number;
  onYearChange: (year: number) => void;
}
