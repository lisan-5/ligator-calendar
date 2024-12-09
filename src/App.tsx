import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar } from './components/Calendar';
import { DateInputs } from './components/DateInputs';
import { Logo } from './components/Logo';
import { AnimatedBackground } from './components/AnimatedBackground';
import { ConversionOptions } from './components/ConversionOptions';
import { Footer } from './components/Footer';
import { ThemeProvider } from './context/ThemeContext';
import { ConversionType } from './types/calendar';
import { useCalendarData } from './hooks/useCalendarData';

function App() {
  const [year, setYear] = useState(2024);
  const [month, setMonth] = useState(new Date().getMonth());
  const [conversionType, setConversionType] = useState<ConversionType>('year');

  const displayedCalendars = useCalendarData(year, month, 1, conversionType);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-transparent transition-colors duration-500">
        <AnimatedBackground />
        
        <div className="py-12 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Logo />
              <motion.p 
                className="text-lg text-slate-600 dark:text-slate-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Convert between Gregorian and Ethiopian (Ge'ez) calendars
              </motion.p>
            </motion.div>

            <ConversionOptions selected={conversionType} onSelect={setConversionType} />
            <DateInputs
              year={year}
              month={month}
              conversionType={conversionType}
              onYearChange={setYear}
              onMonthChange={setMonth}
            />

            <motion.div 
              className={`grid gap-6 ${
                conversionType === 'month' 
                  ? 'grid-cols-1 max-w-2xl mx-auto' 
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {displayedCalendars.map((data) => (
                <Calendar
                  key={data.month}
                  year={year}
                  month={data.month}
                  startDay={data.startDay}
                  gregorianDays={data.gregorianDays}
                  ethiopianDays={data.ethiopianDays}
                />
              ))}
            </motion.div>

            <Footer />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;