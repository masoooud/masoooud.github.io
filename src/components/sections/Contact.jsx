import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Calendar, MessageSquare } from 'lucide-react';
import { profile } from '../../data/resume.js';

function GithubIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedinIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

const contactItems = [
  {
    key: 'email',
    Icon: Mail,
    label: 'Email',
    display: profile.email,
    href: `mailto:${profile.email}`,
    external: false,
    iconBg: 'bg-blue-500',
  },
  {
    key: 'phone',
    Icon: Phone,
    label: 'Phone',
    display: '437-344-2205',
    href: 'tel:+14373442205',
    external: false,
    iconBg: 'bg-green-500',
  },
  {
    key: 'linkedin',
    Icon: LinkedinIcon,
    label: 'LinkedIn',
    display: 'Connect with me',
    href: profile.linkedin,
    external: true,
    iconBg: 'bg-blue-600',
  },
  {
    key: 'github',
    Icon: GithubIcon,
    label: 'GitHub',
    display: 'View my code',
    href: profile.github,
    external: true,
    iconBg: 'bg-slate-700',
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-24 bg-white dark:bg-navy-900"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-accent dark:text-accent-dark mb-3">
            Get In Touch
          </p>
          <h2
            id="contact-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4"
          >
            Let&apos;s Build{' '}
            <span className="text-accent dark:text-accent-dark">Scalable Solutions</span>{' '}
            Together
          </h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Looking for a <strong>senior back-end engineer</strong> who can design microservices,
            optimize cloud infrastructure, and deliver measurable results?{' '}
            Let&apos;s talk.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Left: Contact Information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-5">
              Contact Information
            </h3>

            <div className="flex flex-col gap-3 mb-8">
              {contactItems.map(({ key, Icon, label, display, href, external, iconBg }) => (
                <motion.a
                  key={key}
                  variants={itemVariants}
                  href={href}
                  aria-label={label}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="flex items-center gap-4 px-4 py-3.5 rounded-xl
                    bg-slate-50 dark:bg-navy-800
                    border border-slate-200 dark:border-navy-700
                    hover:border-accent/40 dark:hover:border-accent-dark/40
                    transition-colors duration-200 group"
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <span className={`flex-shrink-0 w-9 h-9 rounded-lg ${iconBg} flex items-center justify-center text-white`}>
                    <Icon size={16} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-100 group-hover:text-accent dark:group-hover:text-accent-dark transition-colors">
                      {display}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Location */}
            <motion.div
              variants={itemVariants}
              className="flex items-start gap-3 px-4 py-4 rounded-xl bg-gradient-to-br from-blue-900/15 to-accent/15"
            >
              <MapPin size={16} className="mt-0.5 flex-shrink-0 text-accent dark:text-accent-dark" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-accent dark:text-accent-dark">Location</p>
                <p className="text-sm text-slate-700 dark:text-slate-200 font-medium">{profile.location}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Available for remote work globally and on-site opportunities in the Greater Toronto Area.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Ready to Connect */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col gap-5"
          >
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Ready to Connect?
            </h3>

            {/* Let's Chat card */}
            <div className="rounded-2xl p-6 bg-gradient-to-br from-blue-900 to-accent text-white">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare size={18} aria-hidden="true" />
                <span className="font-semibold">Let&apos;s Chat</span>
              </div>
              <p className="text-sm text-white/80 mb-4">
                The fastest way to reach me is via email. I typically respond within 24 hours.
              </p>
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl
                  border border-white/30 bg-white/10 hover:bg-white/20
                  text-sm font-semibold transition-colors duration-200"
                aria-label={`Send email to ${profile.email}`}
              >
                <Mail size={15} aria-hidden="true" />
                Let&apos;s Chat
              </a>
            </div>

            {/* Book a Call card */}
            <div className="rounded-2xl p-6 bg-slate-50 dark:bg-navy-800 border border-slate-200 dark:border-navy-700">
              <div className="flex items-center gap-2 mb-3">
                <Calendar size={18} className="text-accent dark:text-accent-dark" aria-hidden="true" />
                <span className="font-semibold text-slate-900 dark:text-white">Book a Call</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                Prefer to discuss over a call? Let&apos;s schedule a time that works for both of us.
              </p>
              <a
                href="https://cal.com/masoud-moharrami/15min?overlayCalendar=true"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl
                  border border-slate-300 dark:border-navy-600
                  bg-white dark:bg-navy-900
                  hover:border-accent/50 dark:hover:border-accent-dark/50
                  text-sm font-semibold text-slate-800 dark:text-slate-100
                  transition-colors duration-200"
                aria-label="Book a 15-minute call (opens in new tab)"
              >
                <Calendar size={15} aria-hidden="true" />
                Book Now
              </a>
            </div>

            {/* Open to Opportunities */}
            <div className="rounded-2xl p-5 bg-slate-50 dark:bg-navy-800 border border-slate-200 dark:border-navy-700 text-center">
              <p className="text-sm font-semibold text-slate-900 dark:text-white mb-2">
                Open to Opportunities
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Senior/Lead Back-End Engineer &bull; Cloud Architecture &bull; Microservices &bull; Technical Advisory
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
