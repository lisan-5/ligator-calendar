import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export const AnimatedBackground: React.FC = () => {
  const { isDark } = useTheme();
  
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className={`absolute inset-0 ${
          isDark 
            ? 'bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900'
            : 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50'
        } transition-colors duration-500`}
        animate={{
          background: isDark
            ? [
                'linear-gradient(to bottom right, rgb(15, 23, 42), rgb(49, 46, 129), rgb(15, 23, 42))',
                'linear-gradient(to top left, rgb(15, 23, 42), rgb(49, 46, 129), rgb(15, 23, 42))',
                'linear-gradient(to bottom right, rgb(15, 23, 42), rgb(49, 46, 129), rgb(15, 23, 42))'
              ]
            : [
                'linear-gradient(to bottom right, rgb(238, 242, 255), rgb(245, 243, 255), rgb(252, 241, 244))',
                'linear-gradient(to top left, rgb(238, 242, 255), rgb(245, 243, 255), rgb(252, 241, 244))',
                'linear-gradient(to bottom right, rgb(238, 242, 255), rgb(245, 243, 255), rgb(252, 241, 244))'
              ]
        }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
      >
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${
              isDark 
                ? 'bg-gradient-to-br from-indigo-500/20 to-purple-500/20'
                : 'bg-gradient-to-br from-indigo-300/20 to-purple-300/20'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 100 + 20}px`,
              height: `${Math.random() * 100 + 20}px`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};