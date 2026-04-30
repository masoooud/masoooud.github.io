import { AnimatePresence, motion } from 'framer-motion';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext.jsx';

const CYCLE = { system: 'light', light: 'dark', dark: 'system' };
const LABELS = {
  system: 'Switch to light mode',
  light: 'Switch to dark mode',
  dark: 'Switch to system mode',
};

const ICONS = {
  system: Monitor,
  light: Sun,
  dark: Moon,
};

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const Icon = ICONS[theme];

  return (
    <button
      aria-label={LABELS[theme]}
      onClick={() => setTheme(CYCLE[theme])}
      className="relative flex items-center justify-center w-9 h-9 rounded-lg
        text-slate-600 dark:text-slate-300
        hover:bg-slate-200 dark:hover:bg-navy-700
        transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="absolute"
        >
          <Icon size={18} aria-hidden="true" />
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
