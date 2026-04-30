import { motion } from 'framer-motion';

export default function TimelineItem({ role, index }) {
  const isLeft = index % 2 === 0;

  return (
    <motion.li
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`relative flex w-full md:w-1/2 ${
        isLeft ? 'md:pr-12 md:self-start' : 'md:pl-12 md:ml-auto md:self-start'
      } mb-8`}
    >
      {/* Timeline dot */}
      <span
        aria-hidden="true"
        className={`hidden md:block absolute top-6 w-3 h-3 rounded-full z-10
          ${role.isCurrent ? 'bg-accent dark:bg-accent-dark' : 'bg-slate-400 dark:bg-slate-500'}
          ${isLeft ? '-right-[7px]' : '-left-[7px]'}`}
      />

      {/* Card */}
      <article
        className={`w-full rounded-xl p-5 border transition-shadow
          ${
            role.isCurrent
              ? 'border-accent/50 dark:border-accent-dark/50 shadow-[0_0_20px_rgba(16,185,129,0.1)]'
              : 'border-slate-200 dark:border-navy-700'
          }
          bg-white dark:bg-navy-900 hover:shadow-lg`}
      >
        {role.isCurrent && (
          <span className="inline-block mb-2 px-2 py-0.5 text-xs font-semibold rounded-full
            bg-accent/15 dark:bg-accent-dark/15 text-accent dark:text-accent-dark">
            Current
          </span>
        )}
        <h3 className="text-base font-bold text-slate-800 dark:text-white">{role.title}</h3>
        <p className="text-sm font-medium text-accent dark:text-accent-dark mb-1">
          {role.company} · {role.location}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
          <time dateTime={role.startDate}>{role.startDate}</time>
          {' – '}
          {role.isCurrent ? (
            <time dateTime="present">Present</time>
          ) : (
            <time dateTime={role.endDate}>{role.endDate}</time>
          )}
        </p>
        <ul className="space-y-1">
          {role.achievements.map((ach, i) => (
            <li key={i} className="text-sm text-slate-600 dark:text-slate-300 flex gap-2">
              <span aria-hidden="true" className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent/60 dark:bg-accent-dark/60 flex-shrink-0" />
              <span>{ach}</span>
            </li>
          ))}
        </ul>
      </article>
    </motion.li>
  );
}
