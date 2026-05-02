import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { roles } from '../../data/resume.js';
import SectionHeading from '../ui/SectionHeading.jsx';
import TimelineItem from '../ui/TimelineItem.jsx';

const CODE_FLOATS = [
  { text: '{...}', style: { top: '6%', left: '3%' }, dur: 8, delay: 0 },
  { text: 'async', style: { top: '12%', right: '5%' }, dur: 10, delay: 1.5 },
  { text: '=>', style: { top: '30%', left: '1.5%' }, dur: 7, delay: 2.8 },
  { text: '</>', style: { top: '42%', right: '3%' }, dur: 9, delay: 0.8 },
  { text: '[ ]', style: { top: '58%', left: '4%' }, dur: 6, delay: 3.5 },
  { text: 'await', style: { bottom: '20%', right: '4%' }, dur: 8, delay: 1.8 },
  { text: '//', style: { bottom: '11%', left: '2%' }, dur: 7, delay: 2.5 },
  { text: 'class', style: { bottom: '7%', right: '13%' }, dur: 9, delay: 1.2 },
  { text: '@Bean', style: { top: '75%', left: '9%' }, dur: 8, delay: 4.0 },
  { text: 'void', style: { top: '22%', left: '44%' }, dur: 7, delay: 3.1 },
  { text: 'return', style: { top: '18%', right: '20%' }, dur: 9, delay: 2.2 },
  { text: 'import', style: { bottom: '30%', left: '16%' }, dur: 8, delay: 0.5 },
  { text: '::', style: { top: '65%', right: '18%' }, dur: 6, delay: 3.8 },
  { text: 'final', style: { bottom: '15%', left: '33%' }, dur: 7, delay: 1.6 },
  { text: 'extends', style: { top: '47%', right: '22%' }, dur: 10, delay: 4.2 },
];

export default function Experience() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  // Parallax: the center line grows as you scroll through the section
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      ref={sectionRef}
      className="relative py-24 min-h-screen flex flex-col justify-center bg-slate-50 dark:bg-navy-950 overflow-hidden"
    >
      {/* Decorative background */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none select-none">
        {/* Giant bracket decorations */}
        <motion.div
          animate={{ opacity: [0.04, 0.11, 0.04] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-2 lg:left-6 top-1/2 -translate-y-1/2 font-mono text-[10rem] lg:text-[15rem] text-slate-400 dark:text-slate-600 leading-none"
        >
          {'{'}
        </motion.div>
        <motion.div
          animate={{ opacity: [0.04, 0.11, 0.04] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
          className="absolute right-2 lg:right-6 top-1/2 -translate-y-1/2 font-mono text-[10rem] lg:text-[15rem] text-slate-400 dark:text-slate-600 leading-none"
        >
          {'}'}
        </motion.div>
        {/* Horizontal scan line sweeping top to bottom */}
        <motion.div
          style={{ top: 0 }}
          animate={{ y: [0, 2000] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear', repeatDelay: 3 }}
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 dark:via-accent-dark/20 to-transparent"
        />
        {/* Floating code symbols */}
        {CODE_FLOATS.map(({ text, style, dur, delay }) => (
          <motion.span
            key={text}
            style={style}
            animate={{ y: [0, -12, 0], opacity: [0.07, 0.17, 0.07] }}
            transition={{ duration: dur, repeat: Infinity, ease: 'easeInOut', delay }}
            className="absolute font-mono text-xs text-slate-400 dark:text-slate-500"
          >
            {text}
          </motion.span>
        ))}
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading id="experience-heading">Experience</SectionHeading>
        </motion.div>

        <div className="relative">
          {/* Vertical timeline line — desktop only */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 dark:bg-navy-700 -translate-x-1/2"
          >
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-accent to-accent/20 dark:from-accent-dark dark:to-accent-dark/20"
            />
          </div>

          <ol aria-label="Work history" className="relative flex flex-col md:block">
            {roles.map((role, index) => (
              <TimelineItem key={role.id} role={role} index={index} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
