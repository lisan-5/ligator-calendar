import React from 'react';
import { CalendarDays, CalendarRange } from 'lucide-react';
import { motion } from 'framer-motion';
import { ConversionType, ConversionOptionsProps } from '../types/calendar';

export const ConversionOptions: React.FC<ConversionOptionsProps> = ({ selected, onSelect }) => {
  const options = [
    { id: 'year', label: 'Year', icon: CalendarRange, description: 'View all months' },
    { id: 'month', label: 'Month', icon: CalendarDays, description: 'View specific month' },
  ] as const;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 max-w-2xl mx-auto">
      {options.map(({ id, label, icon: Icon, description }) => (
        <motion.button
          key={id}
          onClick={() => onSelect(id as ConversionType)}
          className={`
            p-6 rounded-xl border transition-all duration-300
            ${selected === id
              ? 'bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/50 dark:to-purple-900/50 border-indigo-300 dark:border-indigo-700 shadow-lg'
              : 'bg-white/80 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md'
            }
          `}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div 
            className="flex flex-col items-center gap-3"
            initial={false}
            animate={{ y: selected === id ? -5 : 0 }}
          >
            <Icon className={`w-8 h-8 ${
              selected === id 
                ? 'text-indigo-600 dark:text-indigo-400' 
                : 'text-slate-600 dark:text-slate-400'
            }`} />
            <span className={`font-medium text-lg ${
              selected === id
                ? 'text-indigo-900 dark:text-indigo-100'
                : 'text-slate-900 dark:text-slate-100'
            }`}>
              {label}
            </span>
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {description}
            </span>
          </motion.div>
        </motion.button>
      ))}
    </div>
  );
};