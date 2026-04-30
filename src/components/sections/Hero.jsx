import { useEffect, useRef, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { profile } from '../../data/resume.js';

function ParticleCanvas({ mousePosRef }) {
  const canvasRef = useRef(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function createParticles() {
      particles = Array.from({ length: 70 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.8 + 0.5,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
        alpha: Math.random() * 0.5 + 0.15,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mouse = mousePosRef.current;

      for (const p of particles) {
        // Mouse repulsion
        if (mouse) {
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          const repelRadius = 110;
          if (mdist < repelRadius && mdist > 0) {
            const force = (1 - mdist / repelRadius) * 1.2;
            p.x += (mdx / mdist) * force;
            p.y += (mdy / mdist) * force;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16,185,129,${p.alpha})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      }

      // Draw lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(16,185,129,${0.1 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    }

    resize();
    createParticles();
    draw();

    const ro = new ResizeObserver(() => {
      resize();
      createParticles();
    });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, [prefersReduced, mousePosRef]);

  if (prefersReduced) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Hero() {
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef(null);
  const mousePosRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (prefersReduced) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mousePosRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, [prefersReduced]);

  const handleMouseLeave = useCallback(() => {
    mousePosRef.current = null;
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-labelledby="hero-heading"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden
        bg-slate-50 dark:bg-navy-950"
    >
      <ParticleCanvas mousePosRef={mousePosRef} />


      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-4 max-w-3xl mx-auto"
      >
        <motion.p
          variants={itemVariants}
          className="font-mono text-accent dark:text-accent-dark text-sm uppercase tracking-widest mb-4"
        >
          Hello, I&apos;m
        </motion.p>

        <motion.h1
          id="hero-heading"
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl font-bold text-slate-900 dark:text-white leading-tight mb-4"
        >
          {profile.name}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl sm:text-2xl font-semibold text-accent dark:text-accent-dark mb-6"
        >
          {profile.tagline}
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="text-slate-600 dark:text-slate-300 text-lg max-w-xl mx-auto mb-10"
        >
          {profile.summary.split('\n')[0].trim()}
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#projects"
            className="px-7 py-3 rounded-lg bg-accent dark:bg-accent-dark text-white dark:text-navy-950
              font-semibold hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
          >
            View My Work
          </a>
          <a
            href={profile.resumePdf}
            download
            aria-label="Download Masoud Moharrami's CV"
            className="px-7 py-3 rounded-lg border-2 border-accent dark:border-accent-dark
              text-accent dark:text-accent-dark font-semibold
              hover:bg-accent/10 dark:hover:bg-accent-dark/10
              transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
          >
            Download CV
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="text-accent dark:text-accent-dark opacity-60"
        >
          <path
            d="M12 5v14M5 12l7 7 7-7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}
