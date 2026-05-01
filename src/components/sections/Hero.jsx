import { useRef, useCallback, useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { profile } from '../../data/resume.js';

import DataFlowBg from './hero-animations/DataFlowBg.jsx';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden:   { opacity: 0, y: 30 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Hero() {
  const prefersReduced = useReducedMotion();
  const sectionRef     = useRef(null);
  const mousePosRef    = useRef(null);

  // Show the animation on:
  // 1. Mouse/trackpad devices (hover: hover) and (pointer: fine)
  // 2. Tablet landscape — wide enough (≥1024px) and tall enough (≥600px) to
  //    exclude phones in landscape while including iPads and similar tablets.
  const [hasPointer, setHasPointer] = useState(false);
  useEffect(() => {
    const mqMouse   = window.matchMedia('(hover: hover) and (pointer: fine)');
    const mqTablet  = window.matchMedia('(orientation: landscape) and (min-width: 1024px) and (min-height: 600px)');

    const update = () => setHasPointer(mqMouse.matches || mqTablet.matches);
    update();

    mqMouse.addEventListener('change', update);
    mqTablet.addEventListener('change', update);
    return () => {
      mqMouse.removeEventListener('change', update);
      mqTablet.removeEventListener('change', update);
    };
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (prefersReduced) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mousePosRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, [prefersReduced]);

  const handleMouseLeave = useCallback(() => {
    mousePosRef.current = null;
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-labelledby="hero-heading"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden
        bg-slate-50 dark:bg-navy-950"
    >
      {hasPointer && (
        <div className="absolute inset-0">
          <DataFlowBg mousePosRef={mousePosRef} />
        </div>
      )}

      {/* ── Radial backdrop — blurs + fades the animation behind the text ── */}
      <div
        aria-hidden="true"
        className="absolute z-10 pointer-events-none"
        style={{
          /* Centred ellipse, wider than the text block */
          width: '680px', height: '520px',
          left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)',
          /* Radial gradient mask: opaque centre → fully transparent edge */
          WebkitMaskImage: 'radial-gradient(ellipse 48% 46% at 50% 50%, black 30%, transparent 100%)',
          maskImage:        'radial-gradient(ellipse 48% 46% at 50% 50%, black 30%, transparent 100%)',
          backdropFilter:   'blur(18px)',
        }}
      />

      {/* ── Hero content ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 text-center px-4 max-w-3xl mx-auto"
      >
        <motion.p
          variants={itemVariants}
          className="font-mono text-accent dark:text-accent-dark text-sm uppercase tracking-widest mb-4"
        >
          Hello, I&apos;m
        </motion.p>

        <motion.h1
          id="hero-heading"
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl font-bold text-slate-900 dark:text-white leading-tight mb-4"
        >
          {profile.name}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl sm:text-2xl font-semibold text-accent dark:text-accent-dark mb-6"
        >
          {profile.tagline}
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="text-slate-600 dark:text-slate-300 text-lg max-w-xl mx-auto mb-10"
        >
          {profile.summary.split('\n')[0].trim()}
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#projects"
            className="px-7 py-3 rounded-lg bg-accent dark:bg-accent-dark text-white dark:text-navy-950
              font-semibold hover:opacity-90 transition-opacity focus-visible:outline-none
              focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
          >
            View My Work
          </a>
          <a
            href={profile.resumePdf}
            download
            aria-label="Download Masoud Moharrami's CV"
            className="px-7 py-3 rounded-lg border-2 border-accent dark:border-accent-dark
              text-accent dark:text-accent-dark font-semibold
              hover:bg-accent/10 dark:hover:bg-accent-dark/10
              transition-colors focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-offset-2 focus-visible:ring-accent"
          >
            Download CV
          </a>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
          className="text-accent dark:text-accent-dark opacity-60"
        >
          <path
            d="M12 5v14M5 12l7 7 7-7"
            stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round"
          />
        </svg>
      </div>

    </section>
  );
}
