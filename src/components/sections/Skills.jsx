import { motion } from 'framer-motion';
import { Code2, Cloud, Database, Wrench, Cpu } from 'lucide-react';
import { skillGroups } from '../../data/resume.js';
import SectionHeading from '../ui/SectionHeading.jsx';
import SkillBadge from '../ui/SkillBadge.jsx';

const ICON_MAP = { Code2, Cloud, Database, Wrench, Cpu };

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="py-24 bg-slate-50 dark:bg-navy-950"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading id="skills-heading">Skills</SectionHeading>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {skillGroups.map((group) => {
            const Icon = ICON_MAP[group.icon];
            return (
              <motion.div
                key={group.id}
                variants={cardVariants}
                className="rounded-xl p-5 border border-slate-200 dark:border-navy-700
                  bg-white dark:bg-navy-900 hover:border-accent/50 dark:hover:border-accent-dark/50
                  hover:shadow-md transition-all duration-200"
                role="group"
                aria-labelledby={`skills-${group.id}-label`}
              >
                <div className="flex items-center gap-2 mb-4">
                  {Icon && (
                    <span className="text-accent dark:text-accent-dark" aria-hidden="true">
                      <Icon size={18} />
                    </span>
                  )}
                  <h3
                    id={`skills-${group.id}-label`}
                    className="text-sm font-semibold text-slate-700 dark:text-slate-200 uppercase tracking-wide"
                  >
                    {group.label}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <SkillBadge key={skill} label={skill} />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
