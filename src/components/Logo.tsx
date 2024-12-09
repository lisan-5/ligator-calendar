import React from 'react';
import { motion } from 'framer-motion';

export const Logo: React.FC = () => {
  const letterVariants = {
    initial: { y: 20, opacity: 0 },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    }),
  };

  const glowVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.02, 1],
      filter: [
        'drop-shadow(0 0 0px rgba(234, 179, 8, 0))',
        'drop-shadow(0 0 8px rgba(234, 179, 8, 0.5))',
        'drop-shadow(0 0 0px rgba(234, 179, 8, 0))',
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: 'reverse',
      },
    },
  };

  const letters = "Ligator".split("");

  return (
    <motion.div 
      className="mb-8 pt-4"
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.3 }
      }}
    >
      <motion.div 
        className="relative inline-block"
        variants={glowVariants}
        initial="initial"
        animate="animate"
      >
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            className="font-cursive text-7xl inline-block pb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-yellow-300 dark:from-amber-300 dark:to-yellow-200"
            variants={letterVariants}
            initial="initial"
            animate="animate"
            custom={i}
            whileHover={{
              y: -5,
              scale: 1.1,
              transition: { duration: 0.2 }
            }}
          >
            {letter}
          </motion.span>
        ))}
        <motion.div
          className="absolute -bottom-2 left-0 right-0 h-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-300 dark:from-amber-300 dark:to-yellow-200"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ 
            scaleX: 1, 
            opacity: 1,
            filter: [
              'brightness(1)',
              'brightness(1.3)',
              'brightness(1)',
            ],
          }}
          transition={{ 
            delay: 0.8, 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </motion.div>
    </motion.div>
  );
};