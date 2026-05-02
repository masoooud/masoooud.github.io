import { useRef, useCallback, useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { profile } from '../../data/resume.js';

/* ── Brand icon SVGs (not in lucide-react v1.x) ── */
function GithubIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577
        0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7
        3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236
        1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93
        0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23
        .96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23
        3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22
        0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22
        0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592
        24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function LinkedinIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853
        0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9
        1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337
        7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063
        2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0
        .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24
        23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

import DataFlowBg from './hero-animations/DataFlowBg.jsx';
import profileImg from '../../assets/profile.jpg';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Hero() {
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef(null);
  const mousePosRef = useRef(null);

  // Show the animation on:
  // 1. Mouse/trackpad devices (hover: hover) and (pointer: fine)
  // 2. Tablet landscape — wide enough (≥1024px) and tall enough (≥600px) to
  //    exclude phones in landscape while including iPads and similar tablets.
  const [hasPointer, setHasPointer] = useState(false);
  useEffect(() => {
    const mqMouse = window.matchMedia('(hover: hover) and (pointer: fine)');
    const mqTablet = window.matchMedia('(orientation: landscape) and (min-width: 1024px) and (min-height: 600px)');

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
          maskImage: 'radial-gradient(ellipse 48% 46% at 50% 50%, black 30%, transparent 100%)',
          backdropFilter: 'blur(18px)',
        }}
      />

      {/* ── Hero content ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 text-center px-4 max-w-3xl mx-auto"
      >
        <motion.div variants={itemVariants} className="flex justify-center mb-6">
          <div className="w-28 h-28 rounded-full ring-4 ring-accent dark:ring-accent-dark overflow-hidden shadow-lg">
            <img
              src={profileImg}
              alt="Masoud Moharrami"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

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
          className="text-slate-600 dark:text-slate-300 text-lg max-w-xl mx-auto mb-8"
        >
          {profile.summary.split('**').map((part, i) =>
            i % 2 === 1
              ? <strong key={i} className="font-semibold text-accent dark:text-accent-dark">{part}</strong>
              : part
          )}
        </motion.p>

        {/* ── Social icons ── */}
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-5 mb-8">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="text-slate-500 dark:text-slate-400 hover:text-[#8534F3] dark:hover:text-[#8534F3]
              transition-colors"
          >
            <GithubIcon size={22} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="text-slate-500 dark:text-slate-400 hover:text-[#0A66C2] dark:hover:text-[#0A66C2]
              transition-colors"
          >
            <LinkedinIcon size={22} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Send email"
            className="text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white
              transition-colors"
          >
            <Mail size={22} />
          </a>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row mb-10 gap-4 justify-center">
          <a
            href="#experience"
            className="px-7 py-3 rounded-lg bg-accent dark:bg-accent-dark text-white dark:text-navy-950
              font-semibold hover:opacity-90 transition-opacity focus-visible:outline-none
              focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
          >
            View My Experience
          </a>
          <a
            href={profile.resumePdf}
            download="Masoud Moharrami - Resume.pdf"
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
      <a
        href="#about"
        className="px-7 py-3"
      >
        <div className="flex left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none"
            className="text-accent dark:text-accent-dark opacity-60"
          >
            <path
              d="M12 5v14M5 12l7 7 7-7"
              stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
        </div>
      </a>

    </section>
  );
}
