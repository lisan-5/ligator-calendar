import React from 'react';
import { CalendarDays } from 'lucide-react';
import { motion } from 'framer-motion';
import { getEthiopianMonthsForGregorianMonth } from '../utils/calendarConverter';
import { CalendarProps } from '../types/calendar';
import { getEthiopianYear } from '../utils/dateUtils';

export const Calendar: React.FC<CalendarProps> = ({
  year,
  month,
  gregorianDays,
  ethiopianDays,
  startDay,
}) => {
  const weeks = Math.ceil((startDay + gregorianDays.length) / 7);
  const monthName = new Date(year, month).toLocaleString('default', { month: 'long' });
  const ethiopianMonths = getEthiopianMonthsForGregorianMonth(month, year);
  const ethiopianYear = getEthiopianYear(year);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8 
                 border border-indigo-100 dark:border-indigo-800 hover:shadow-xl 
                 transition-all duration-300 hover:border-indigo-300 dark:hover:border-indigo-700"
      whileHover={{ y: -5 }}
    >
      <div className="flex flex-col mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>{monthName} {year}</span>
          </h3>
        </div>
        
        <div className="text-sm">
          <div className="text-indigo-600 dark:text-indigo-400 font-medium">
            Ethiopian Year: {ethiopianYear} - {ethiopianYear + 1}
          </div>
          <div className="text-slate-600 dark:text-slate-400">
            {ethiopianMonths.first.name} - {ethiopianMonths.second.name}
            <span className="text-slate-500 dark:text-slate-500 ml-2">
              ({ethiopianMonths.first.latinName} - {ethiopianMonths.second.latinName})
            </span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="text-center py-2 text-sm font-medium text-slate-600 dark:text-slate-400"
          >
            {day}
          </div>
        ))}
        
        {Array.from({ length: weeks * 7 }).map((_, index) => {
          const dayIndex = index - startDay;
          const gregorianDay = gregorianDays[dayIndex];
          const ethiopianDay = ethiopianDays[dayIndex];
          const isValidDay = dayIndex >= 0 && dayIndex < gregorianDays.length;

          return (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className={`
                relative border rounded-lg p-2 min-h-[80px] transition-colors duration-200
                ${isValidDay 
                  ? 'bg-white dark:bg-slate-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 border-indigo-100 dark:border-indigo-800' 
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700'}
              `}
            >
              {isValidDay && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 * dayIndex }}
                >
                  <div className="text-right text-slate-900 dark:text-slate-100 font-medium">
                    {gregorianDay}
                  </div>
                  <div className="text-sm text-indigo-600 dark:text-indigo-400 mt-1 font-medium">
                    {ethiopianDay}
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};