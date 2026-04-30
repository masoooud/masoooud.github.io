import { motion } from 'framer-motion';
import { useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { roles } from '../../data/resume.js';
import SectionHeading from '../ui/SectionHeading.jsx';
import TimelineItem from '../ui/TimelineItem.jsx';

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
      className="py-24 bg-white dark:bg-navy-900 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
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
