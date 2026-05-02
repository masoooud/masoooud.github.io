import { motion } from 'framer-motion';
import { MapPin, Briefcase } from 'lucide-react';
import { profile } from '../../data/resume.js';
import SectionHeading from '../ui/SectionHeading.jsx';
import profileImg from '../../assets/profile.jpg';

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
      className="relative overflow-hidden py-24 min-h-screen flex flex-col justify-center bg-white dark:bg-navy-900"
    >
      {/* Decorative background */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0"
          style={{ backgroundImage: 'radial-gradient(rgba(16,185,129,0.07) 1.5px, transparent 1.5px)', backgroundSize: '30px 30px' }}
        />
        {/* Rotating dashed rings — top-right */}
        <motion.svg
          animate={{ rotate: 360 }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-24 -right-20 w-[520px] h-[520px] pointer-events-none"
          viewBox="0 0 520 520"
          style={{ color: 'rgba(16,185,129,0.13)' }}
        >
          <circle cx="260" cy="260" r="220" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="12 18" />
          <circle cx="260" cy="260" r="162" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="7 22" />
          <circle cx="260" cy="260" r="98" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 16" />
        </motion.svg>
        {/* Counter-rotating rings — bottom-left */}
        <motion.svg
          animate={{ rotate: -360 }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-32 -left-24 w-[440px] h-[440px] pointer-events-none"
          viewBox="0 0 440 440"
          style={{ color: 'rgba(99,102,241,0.10)' }}
        >
          <circle cx="220" cy="220" r="185" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="10 15" />
          <circle cx="220" cy="220" r="125" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="5 18" />
        </motion.svg>
        {/* Gradient blobs */}
        <motion.div
          animate={{ x: [0, 35, 0], y: [0, -25, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-20 right-[8%] w-96 h-96 rounded-full bg-emerald-400/15 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -22, 0], y: [0, 32, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute -bottom-20 left-[3%] w-80 h-80 rounded-full bg-indigo-400/10 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, 18, 0], y: [0, -18, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute bottom-[10%] right-[35%] w-64 h-64 rounded-full bg-sky-400/10 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, 24, 0], y: [0, 18, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
          className="absolute top-[38%] left-[14%] w-48 h-48 rounded-full bg-amber-400/10 blur-3xl"
        />
        {/* Sparkle dots */}
        {[[18, 72], [83, 28], [44, 87], [66, 13], [9, 47], [91, 62], [55, 38], [30, 56]].map(([x, y], i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0, 0.65, 0], scale: [0.6, 1.4, 0.6] }}
            transition={{ duration: 2.5 + i * 0.6, repeat: Infinity, ease: 'easeInOut', delay: i * 1.0 }}
            className="absolute w-1.5 h-1.5 rounded-full bg-emerald-400"
            style={{ left: `${x}%`, top: `${y}%` }}
          />
        ))}
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
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
            className="flex justify-center order-first md:order-last"
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
      </div>
    </section>
  );
}

