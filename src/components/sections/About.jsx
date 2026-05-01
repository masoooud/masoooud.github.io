import { motion } from 'framer-motion';
import { Layers, Zap, GitBranch, Cpu, MapPin, Briefcase } from 'lucide-react';
import { profile, capabilities } from '../../data/resume.js';
import SectionHeading from '../ui/SectionHeading.jsx';
import profileImg from '../../assets/profile.jpg';

const iconMap = { Layers, Zap, GitBranch, Cpu };

const stats = [
  { value: '9+', label: 'Years Experience' },
  { value: '4+', label: 'Years in Back-End' },
  { value: '15+', label: 'Enterprise Apps Shipped' },
];

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-24 bg-white dark:bg-navy-900"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <SectionHeading id="about-heading">About Me</SectionHeading>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* ── Left: bio + stats + badges ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="space-y-6"
          >
            {/* Quick stats */}
            <div className="flex gap-6">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-2xl font-bold text-accent dark:text-accent-dark">{s.value}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Two-paragraph bio */}
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              Back-end expert with a proven track record for delivering enterprise applications.
              Adept at designing and optimizing microservices, improving application performance,
              and collaborating in agile environments.
            </p>
            <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Passionate about evolving as a developer and constantly looking for opportunities
              to learn, mentor, and push the boundaries of what scalable systems can do.
            </p>

            {/* Location + availability badges */}
            <div className="flex flex-wrap gap-3 pt-1">
              <span className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400
                bg-slate-100 dark:bg-navy-800 px-3 py-1.5 rounded-full">
                <MapPin size={13} /> {profile.location}
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium
                text-accent dark:text-accent-dark
                bg-accent/10 dark:bg-accent-dark/10 px-3 py-1.5 rounded-full">
                <Briefcase size={13} /> Open to Senior / Lead / Staff roles
              </span>
            </div>
          </motion.div>

          {/* ── Right: circular photo with gradient ring ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative w-64 h-64">
              {/* Rotating gradient ring */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-full animate-spin-slow"
                style={{
                  background: 'conic-gradient(from 0deg, #10B981, #34D399, #10B981)',
                  padding: '3px',
                  borderRadius: '9999px',
                }}
              />
              <div className="absolute inset-[3px] rounded-full overflow-hidden bg-white dark:bg-navy-900 shadow-xl">
                <img
                  src={profileImg}
                  alt="Masoud Moharrami profile photo"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Divider ── */}
        <div className="flex items-center gap-4 mt-16 mb-10">
          <div className="flex-1 border-t border-slate-200 dark:border-slate-700" />
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Core Strengths
          </span>
          <div className="flex-1 border-t border-slate-200 dark:border-slate-700" />
        </div>

        {/* ── Capability cards ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {capabilities.map((cap, i) => {
            const Icon = iconMap[cap.icon];
            return (
              <motion.div
                key={cap.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 * i }}
                className="flex flex-col items-center text-center gap-4 p-6
                  rounded-2xl border border-slate-200 dark:border-slate-700
                  bg-slate-50 dark:bg-navy-950
                  shadow-md dark:shadow-navy-950/60
                  hover:border-accent dark:hover:border-accent-dark
                  hover:shadow-xl hover:-translate-y-1
                  transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full flex items-center justify-center
                  bg-accent/10 dark:bg-accent-dark/10">
                  {Icon && <Icon size={26} className="text-accent dark:text-accent-dark" />}
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white text-base">
                  {cap.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {cap.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
