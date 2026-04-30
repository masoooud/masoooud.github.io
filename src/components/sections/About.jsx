import { motion } from 'framer-motion';
import { profile } from '../../data/resume.js';
import SectionHeading from '../ui/SectionHeading.jsx';
import profileImg from '../../assets/profile.jpg';

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
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="space-y-4"
          >
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              {profile.summary}
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <span className="text-sm text-slate-500 dark:text-slate-400">
                📍 {profile.location}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="w-64 h-64 rounded-2xl overflow-hidden border-2 border-accent/30 dark:border-accent-dark/30 shadow-xl">
                <img
                  src={profileImg}
                  alt="Masoud Moharrami profile photo"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative accent corner */}
              <div
                aria-hidden="true"
                className="absolute -bottom-3 -right-3 w-24 h-24 rounded-xl border-2 border-accent dark:border-accent-dark opacity-30"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
