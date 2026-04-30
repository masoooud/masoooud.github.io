import { motion } from 'framer-motion';

export default function SkillBadge({ label }) {
  return (
    <motion.span
      whileHover={{ scale: 1.06 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className="inline-block px-3 py-1 text-sm font-mono rounded-full
        border border-accent/40 dark:border-accent-dark/40
        text-slate-700 dark:text-slate-200
        bg-accent/5 dark:bg-accent-dark/5
        hover:border-accent dark:hover:border-accent-dark
        hover:text-accent dark:hover:text-accent-dark
        transition-colors duration-200 cursor-default select-none"
    >
      {label}
    </motion.span>
  );
}
