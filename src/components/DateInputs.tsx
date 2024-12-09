import React from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GREGORIAN_MONTHS } from '../utils/calendarConverter';
import { DateInputsProps } from '../types/calendar';

export const DateInputs: React.FC<DateInputsProps> = ({
  year,
  month,
  conversionType,
  onYearChange,
  onMonthChange,
}) => {
  const [isMonthOpen, setIsMonthOpen] = React.useState(false);
  const monthRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (monthRef.current && !monthRef.current.contains(event.target as Node)) {
        setIsMonthOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numValue = parseInt(value, 10);
    
    if (value === '') {
      onYearChange(new Date().getFullYear());
    } else if (!isNaN(numValue) && numValue > 0 && numValue <= 9999) {
      onYearChange(numValue);
    }
  };

  return (
    <motion.div 
      className="flex flex-wrap items-center justify-center gap-4 mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="relative w-24">
        <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
          <Calendar className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
        </div>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={year}
          onChange={handleYearChange}
          className="block w-full pl-8 pr-2 py-1.5 text-sm 
                   border border-indigo-200 dark:border-indigo-700
                   bg-white dark:bg-slate-800
                   text-slate-900 dark:text-slate-100 rounded-lg 
                   focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                   transition-all duration-200 hover:border-indigo-400"
          placeholder="Year"
          maxLength={4}
        />
      </div>

      {conversionType !== 'year' && (
        <div className="relative w-48" ref={monthRef}>
          <button
            onClick={() => setIsMonthOpen(!isMonthOpen)}
            className="w-full px-3 py-1.5 text-sm 
                     border border-indigo-200 dark:border-indigo-700 rounded-lg
                     bg-white dark:bg-slate-800 text-left
                     text-slate-900 dark:text-slate-100
                     focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                     transition-all duration-200 hover:border-indigo-400
                     flex items-center justify-between"
          >
            <span>{GREGORIAN_MONTHS[month]}</span>
            <ChevronDown className="h-4 w-4 text-slate-500 dark:text-slate-400" />
          </button>

          <AnimatePresence>
            {isMonthOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-10 w-full mt-1 
                         bg-white dark:bg-slate-800 rounded-lg shadow-lg 
                         border border-indigo-100 dark:border-indigo-800 
                         max-h-60 overflow-auto"
              >
                {GREGORIAN_MONTHS.map((monthName, index) => (
                  <motion.button
                    key={monthName}
                    whileHover={{ backgroundColor: 'rgba(99, 102, 241, 0.1)' }}
                    onClick={() => {
                      onMonthChange(index);
                      setIsMonthOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left 
                             text-slate-700 dark:text-slate-300
                             hover:text-indigo-600 dark:hover:text-indigo-400 
                             transition-colors"
                  >
                    {monthName}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
};