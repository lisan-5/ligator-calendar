import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className={`fixed top-4 right-4 p-3 rounded-full shadow-lg 
                 backdrop-blur-sm transition-all duration-300
                 ${isDark 
                   ? 'bg-slate-800/80 border-slate-700 hover:bg-slate-700/80' 
                   : 'bg-white/80 border-indigo-100 hover:bg-indigo-50/80'
                 } border hover:shadow-xl`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        initial={false}
        animate={{
          rotate: isDark ? 360 : 0,
        }}
        transition={{ duration: 0.5, ease: "anticipate" }}
      >
        {isDark ? (
          <Sun className="w-5 h-5 text-amber-400" />
        ) : (
          <Moon className="w-5 h-5 text-indigo-600" />
        )}
      </motion.div>
    </motion.button>
  );
};