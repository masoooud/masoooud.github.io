import { motion } from 'framer-motion';
import SkillBadge from './SkillBadge.jsx';

export default function ProjectCard({ project }) {
  return (
    <motion.article
      aria-label={`${project.name} project`}
      whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(16,185,129,0.15)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="rounded-xl p-6 border border-slate-200 dark:border-navy-700
        bg-white dark:bg-navy-900 flex flex-col gap-3 h-full"
    >
      <div>
        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">
          {project.name}
        </h3>
        <p className="text-xs font-medium text-accent dark:text-accent-dark mb-2">
          {project.company}
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {project.description}
        </p>
      </div>
      <div className="flex flex-wrap gap-2 mt-auto pt-2">
        {project.tech.map((t) => (
          <SkillBadge key={t} label={t} />
        ))}
      </div>
    </motion.article>
  );
}
