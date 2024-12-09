import React from 'react';
import { motion } from 'framer-motion';
import { Github, Mail, MessageCircle, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  const links = [
    {
      icon: Github,
      text: 'GitHub',
      href: 'https://github.com/lisan-5',
      color: 'text-gray-800 dark:text-gray-200'
    },
    {
      icon: MessageCircle,
      text: 'Telegram',
      href: 'https://t.me/ligator',
      color: 'text-blue-500'
    },
    {
      icon: Mail,
      text: 'Email',
      href: 'mailto:lisan5abay@gmail.com',
      color: 'text-purple-600 dark:text-purple-400'
    },
    {
      icon: Globe,
      text: 'Website',
      href: 'https://lisane.netlify.app/',
      color: 'text-amber-500 dark:text-amber-400'
    }
  ];

  return (
    <motion.footer
      className="mt-16 pb-8 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {links.map(({ icon: Icon, text, href, color }) => (
            <motion.a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-800 
                       border border-indigo-100 dark:border-indigo-800 hover:border-indigo-300 
                       dark:hover:border-indigo-600 transition-all duration-300"
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className={`w-4 h-4 ${color}`} />
              <span className="text-sm text-slate-600 dark:text-slate-300">{text}</span>
            </motion.a>
          ))}
        </div>
        <p className="text-slate-600 dark:text-slate-400">
          © 2024 Lisanegebriel Abay Kebedew. All Rights Reserved
        </p>
      </div>
    </motion.footer>
  );
};