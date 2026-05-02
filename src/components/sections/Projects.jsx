import { motion } from 'framer-motion';
import { projects } from '../../data/resume.js';
import SectionHeading from '../ui/SectionHeading.jsx';
import ProjectCard from '../ui/ProjectCard.jsx';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative py-24 min-h-screen flex flex-col justify-center bg-slate-50 dark:bg-navy-950 overflow-hidden"
    >
      {/* Radial pulse background */}
      <motion.div
        aria-hidden="true"
        animate={{ scale: [1, 1.05, 1], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(16,185,129,0.12)_0%,transparent_65%)] pointer-events-none"
      />

      {/* Floating rotating diamond outlines */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        {[
          { style: { top: '8%', left: '3%' }, size: 48, dur: 7, delay: 0 },
          { style: { top: '20%', right: '4%' }, size: 32, dur: 9, delay: 1.3 },
          { style: { bottom: '22%', left: '2%' }, size: 42, dur: 8, delay: 2.5 },
          { style: { bottom: '9%', right: '7%' }, size: 56, dur: 6, delay: 0.8 },
          { style: { top: '50%', left: '1%' }, size: 24, dur: 10, delay: 3.2 },
          { style: { top: '38%', right: '2%' }, size: 40, dur: 8, delay: 1.8 },
          { style: { bottom: '42%', left: '7%' }, size: 28, dur: 7, delay: 4.1 },
          { style: { top: '68%', right: '5%' }, size: 36, dur: 9, delay: 2.0 },
          { style: { top: '14%', left: '46%' }, size: 20, dur: 8, delay: 3.5 },
          { style: { bottom: '35%', right: '43%' }, size: 22, dur: 7, delay: 1.0 },
        ].map((d, i) => (
          <motion.div
            key={i}
            style={{ ...d.style, width: d.size, height: d.size }}
            initial={{ opacity: 0.07, rotate: 45 }}
            animate={{ y: [0, -16, 0], opacity: [0.07, 0.17, 0.07] }}
            transition={{ duration: d.dur, repeat: Infinity, ease: 'easeInOut', delay: d.delay }}
            className="absolute border border-emerald-400/40 dark:border-emerald-400/25"
          />
        ))}
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading id="projects-heading">Projects</SectionHeading>
        </motion.div>

        <motion.ul
          aria-label="Featured projects"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          role="list"
        >
          {projects.map((project) => (
            <motion.li key={project.id} variants={cardVariants} className="flex">
              <ProjectCard project={project} />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
