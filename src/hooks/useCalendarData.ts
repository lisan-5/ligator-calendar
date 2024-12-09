import { useMemo } from 'react';
import { 
  GREGORIAN_MONTHS, 
  getLeapYearOffset, 
  determineLeapYears, 
  getInitialEthiopianDate 
} from '../utils/calendarConverter';
import { ConversionType } from '../types/calendar';

export const useCalendarData = (
  year: number,
  month: number,
  day: number,
  conversionType: ConversionType
) => {
  const calendarData = useMemo(() => {
    const leapYearOffset = getLeapYearOffset(year);
    const { isJulianCalendar, isLeapYear } = determineLeapYears(year);
    const { month: ethiopianMonth, day: ethiopianDay } = getInitialEthiopianDate(
      isLeapYear,
      isJulianCalendar,
      leapYearOffset
    );

    const monthsData = GREGORIAN_MONTHS.map((_, monthIndex) => {
      const date = new Date(year, monthIndex, 1);
      const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
      const startDay = date.getDay();

      const gregorianDays = Array.from(
        { length: daysInMonth },
        (_, i) => i + 1
      );

      const ethiopianDays = Array.from(
        { length: daysInMonth },
        (_, i) => ((ethiopianDay + i - 1) % 30) + 1
      );

      return {
        month: monthIndex,
        startDay,
        gregorianDays,
        ethiopianDays,
      };
    });

    return monthsData;
  }, [year]);

  const displayedCalendars = useMemo(() => {
    switch (conversionType) {
      case 'year':
        return calendarData;
      case 'month':
        return [calendarData[month]];
      case 'day':
        return [{
          ...calendarData[month],
          gregorianDays: [day],
          ethiopianDays: [calendarData[month].ethiopianDays[day - 1]],
        }];
      default:
        return calendarData;
    }
  }, [calendarData, conversionType, month, day]);

  return displayedCalendars;
};