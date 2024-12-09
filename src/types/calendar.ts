export type ConversionType = 'year' | 'month';

export interface CalendarData {
  month: number;
  startDay: number;
  gregorianDays: number[];
  ethiopianDays: number[];
}

export interface DateInputsProps {
  year: number;
  month: number;
  conversionType: ConversionType;
  onYearChange: (year: number) => void;
  onMonthChange: (month: number) => void;
}

export interface ConversionOptionsProps {
  selected: ConversionType;
  onSelect: (type: ConversionType) => void;
}

export interface CalendarProps {
  year: number;
  month: number;
  gregorianDays: number[];
  ethiopianDays: number[];
  startDay: number;
}

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}