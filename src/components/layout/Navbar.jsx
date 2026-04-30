import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navItems } from '../../data/resume.js';
import { useScrollSpy } from '../../hooks/useScrollSpy.js';
import ThemeToggle from './ThemeToggle.jsx';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);

  const sectionIds = useMemo(() => navItems.map((item) => item.href.slice(1)), []);
  const activeId = useScrollSpy(sectionIds);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    if (!isOpen) return;
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen]);

  function handleLinkClick() {
    setIsOpen(false);
  }

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 dark:bg-navy-950/95 shadow-sm backdrop-blur-sm'
          : 'bg-white/70 dark:bg-navy-950/70 backdrop-blur-md'
      }`}
    >
      <nav aria-label="Main navigation" className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16" ref={menuRef}>
          {/* Logo */}
          <a
            href="#hero"
            className="font-mono font-bold text-lg text-accent dark:text-accent-dark hover:opacity-80 transition-opacity"
            aria-label="Back to top"
          >
            MM
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {navItems.map((item) => {
              const id = item.href.slice(1);
              const isActive = activeId === id;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'text-accent dark:text-accent-dark'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {/* Mobile hamburger */}
            <button
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              onClick={() => setIsOpen((v) => !v)}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg
                text-slate-600 dark:text-slate-300
                hover:bg-slate-200 dark:hover:bg-navy-700
                transition-colors duration-200"
            >
              {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden pb-3"
              role="list"
            >
              {navItems.map((item) => {
                const id = item.href.slice(1);
                const isActive = activeId === id;
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-current={isActive ? 'page' : undefined}
                      onClick={handleLinkClick}
                      className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive
                          ? 'text-accent dark:text-accent-dark'
                          : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
