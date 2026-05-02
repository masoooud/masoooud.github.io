import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Cloud, Zap, GitBranch } from 'lucide-react';
import { capabilities, skillGroups } from '../../data/resume.js';
import SectionHeading from '../ui/SectionHeading.jsx';

// Per-capability card styles (light + dark)
const CAP_STYLES = {
  architecture: {
    card: 'bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950/80 dark:to-navy-900 border-indigo-200 dark:border-indigo-500/30 hover:border-indigo-400 dark:hover:border-indigo-400 hover:shadow-indigo-100/60 dark:hover:shadow-indigo-900/30',
    iconBg: 'bg-indigo-100 dark:bg-indigo-500/20 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-500/30',
    iconColor: 'text-indigo-500 dark:text-indigo-400',
    Icon: Cpu,
  },
  microservices: {
    card: 'bg-gradient-to-br from-sky-50 to-white dark:from-sky-950/80 dark:to-navy-900 border-sky-200 dark:border-sky-500/30 hover:border-sky-400 dark:hover:border-sky-400 hover:shadow-sky-100/60 dark:hover:shadow-sky-900/30',
    iconBg: 'bg-sky-100 dark:bg-sky-500/20 group-hover:bg-sky-200 dark:group-hover:bg-sky-500/30',
    iconColor: 'text-sky-500 dark:text-sky-400',
    Icon: Cloud,
  },
  performance: {
    card: 'bg-gradient-to-br from-amber-50 to-white dark:from-amber-950/80 dark:to-navy-900 border-amber-200 dark:border-amber-500/30 hover:border-amber-400 dark:hover:border-amber-400 hover:shadow-amber-100/60 dark:hover:shadow-amber-900/30',
    iconBg: 'bg-amber-100 dark:bg-amber-500/20 group-hover:bg-amber-200 dark:group-hover:bg-amber-500/30',
    iconColor: 'text-amber-500 dark:text-amber-400',
    Icon: Zap,
  },
  devops: {
    card: 'bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/80 dark:to-navy-900 border-emerald-200 dark:border-emerald-500/30 hover:border-emerald-400 dark:hover:border-emerald-400 hover:shadow-emerald-100/60 dark:hover:shadow-emerald-900/30',
    iconBg: 'bg-emerald-100 dark:bg-emerald-500/20 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-500/30',
    iconColor: 'text-emerald-500 dark:text-emerald-400',
    Icon: GitBranch,
  },
};

// Per-category badge colors
const CAT_BADGE = {
  languages: 'border-indigo-300 dark:border-indigo-500/40 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-200 hover:border-indigo-400 hover:bg-indigo-100 dark:hover:border-indigo-400 dark:hover:bg-indigo-500/20',
  'cloud-devops': 'border-sky-300 dark:border-sky-500/40 bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-200 hover:border-sky-400 hover:bg-sky-100 dark:hover:border-sky-400 dark:hover:bg-sky-500/20',
  databases: 'border-emerald-300 dark:border-emerald-500/40 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-200 hover:border-emerald-400 hover:bg-emerald-100 dark:hover:border-emerald-400 dark:hover:bg-emerald-500/20',
  tools: 'border-amber-300 dark:border-amber-500/40 bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-200 hover:border-amber-400 hover:bg-amber-100 dark:hover:border-amber-400 dark:hover:bg-amber-500/20',
  'system-design': 'border-rose-300 dark:border-rose-500/40 bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-200 hover:border-rose-400 hover:bg-rose-100 dark:hover:border-rose-400 dark:hover:bg-rose-500/20',
};

// Active tab highlight per category
const ACTIVE_TAB = {
  all: 'border-accent dark:border-accent-dark text-accent dark:text-accent-dark bg-accent/10 dark:bg-accent-dark/10',
  languages: 'border-indigo-500 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10',
  'cloud-devops': 'border-sky-500 text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-500/10',
  databases: 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10',
  tools: 'border-amber-500 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10',
  'system-design': 'border-rose-500 text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10',
};

const TABS = [
  { id: 'all', label: 'All' },
  { id: 'languages', label: 'Languages' },
  { id: 'cloud-devops', label: 'Cloud & DevOps' },
  { id: 'databases', label: 'Databases' },
  { id: 'tools', label: 'Tools & Methods' },
  { id: 'system-design', label: 'System Design' },
];

const INACTIVE_TAB = 'border-slate-200 dark:border-navy-700 text-slate-600 dark:text-slate-400 hover:border-slate-400 dark:hover:border-slate-500';

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const GHOST_SKILLS = [
  'Java', 'Go', 'Kotlin', 'TypeScript', 'Kubernetes', 'Docker',
  'Redis', 'Kafka', 'PostgreSQL', 'AWS', 'Terraform', 'gRPC',
  'Spring', 'Nginx', 'Prometheus', 'Helm', 'ElasticSearch', 'RabbitMQ',
  'GraphQL', 'Istio', 'ArgoCD', 'Vault',
];
const GHOST_POS = [
  { style: { top: '4%', left: '1%' }, dur: 7, delay: 0 },
  { style: { top: '8%', right: '3%' }, dur: 9, delay: 1.4 },
  { style: { top: '20%', left: '1%' }, dur: 6, delay: 2.8 },
  { style: { top: '33%', right: '2%' }, dur: 8, delay: 0.6 },
  { style: { top: '48%', left: '2%' }, dur: 10, delay: 3.2 },
  { style: { top: '59%', right: '3%' }, dur: 7, delay: 1.9 },
  { style: { top: '70%', left: '6%' }, dur: 8, delay: 4.0 },
  { style: { top: '77%', right: '8%' }, dur: 6, delay: 2.1 },
  { style: { bottom: '14%', left: '27%' }, dur: 9, delay: 0.3 },
  { style: { bottom: '8%', right: '25%' }, dur: 7, delay: 2.6 },
  { style: { top: '85%', left: '51%' }, dur: 8, delay: 1.1 },
  { style: { top: '17%', left: '42%' }, dur: 9, delay: 3.7 },
  { style: { top: '67%', left: '15%' }, dur: 7, delay: 0.9 },
  { style: { bottom: '21%', right: '37%' }, dur: 6, delay: 4.3 },
  { style: { top: '3%', left: '30%' }, dur: 8, delay: 1.6 },
  { style: { top: '13%', right: '18%' }, dur: 7, delay: 3.0 },
  { style: { top: '42%', right: '15%' }, dur: 9, delay: 2.3 },
  { style: { bottom: '30%', left: '11%' }, dur: 8, delay: 0.5 },
  { style: { bottom: '5%', left: '38%' }, dur: 7, delay: 3.8 },
  { style: { top: '55%', left: '24%' }, dur: 6, delay: 1.3 },
  { style: { top: '28%', right: '28%' }, dur: 9, delay: 4.6 },
  { style: { top: '90%', right: '12%' }, dur: 7, delay: 2.9 },
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState('all');

  const visibleBadges = (
    activeTab === 'all' ? skillGroups : skillGroups.filter((g) => g.id === activeTab)
  ).flatMap((g) => g.items.map((item) => ({ item, groupId: g.id })));

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative overflow-hidden py-24 min-h-screen flex flex-col justify-center bg-white dark:bg-navy-900"
    >
      {/* Decorative background */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* Large faded watermark */}
        <div className="absolute inset-0 flex items-end justify-center pb-4">
          <span className="text-[18vw] font-black leading-none uppercase tracking-widest text-slate-900/[0.025] dark:text-white/[0.025]">
            SKILLS
          </span>
        </div>
        {/* Bottom radial glow */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.06, 0.13, 0.06] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60vw] h-64 rounded-full bg-emerald-400 blur-3xl"
        />
        {/* Drifting ghost tech terms */}
        {GHOST_SKILLS.map((term, i) => (
          <motion.span
            key={term}
            style={GHOST_POS[i].style}
            animate={{ y: [0, -10, 0], opacity: [0.08, 0.20, 0.08] }}
            transition={{ duration: GHOST_POS[i].dur, repeat: Infinity, ease: 'easeInOut', delay: GHOST_POS[i].delay }}
            className="absolute text-xs font-mono text-slate-500 dark:text-slate-400"
          >
            {term}
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
          <SectionHeading id="skills-heading">Skills</SectionHeading>
        </motion.div>

        {/* ── Core capability spotlight cards ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14"
        >
          {capabilities.map((cap) => {
            const s = CAP_STYLES[cap.id];
            const Icon = s?.Icon;
            return (
              <motion.div
                key={cap.id}
                variants={cardVariants}
                className={`rounded-2xl p-5 border hover:shadow-lg transition-all duration-200 group cursor-default ${s?.card}`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors ${s?.iconBg}`}>
                  {Icon && <Icon size={20} className={s?.iconColor} />}
                </div>
                <h3 className="font-semibold mb-1 text-slate-900 dark:text-slate-100 text-sm">
                  {cap.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {cap.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Divider ── */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 border-t border-slate-200 dark:border-slate-700" />
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            All Technologies
          </span>
          <div className="flex-1 border-t border-slate-200 dark:border-slate-700" />
        </div>

        {/* ── Category tabs ── */}
        <div className="flex flex-wrap gap-2 mb-6" role="tablist" aria-label="Filter skills by category">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-1.5 rounded-full text-sm border transition-colors duration-150 cursor-pointer ${activeTab === tab.id ? ACTIVE_TAB[tab.id] : INACTIVE_TAB
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Filterable badge pool ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="flex flex-wrap gap-2"
          >
            {visibleBadges.map(({ item, groupId }) => (
              <motion.span
                key={`${groupId}-${item}`}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className={`inline-block px-3 py-1.5 text-sm font-mono rounded-full border cursor-default select-none transition-colors duration-150 ${CAT_BADGE[groupId]}`}
              >
                {item}
              </motion.span>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
