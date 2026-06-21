import { useEffect, useRef } from 'react';
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from 'framer-motion';
import './About.css';

/* ── Animated counter hook ────────────────────────── */
function AnimatedNumber({ value, suffix = '', duration = 2 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => Math.round(v));

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(motionVal, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [isInView, value, duration, motionVal]);

  useEffect(() => {
    const unsubscribe = rounded.on('change', (v) => {
      if (ref.current) ref.current.textContent = `${v}${suffix}`;
    });
    return () => unsubscribe();
  }, [rounded, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

/* ── Stat data ────────────────────────────────────── */
const stats = [
  { value: 2, suffix: '+', label: 'Years Experience' },
  { value: 10, suffix: '+', label: 'Projects Completed' },
  { value: 5, suffix: '+', label: 'Technologies Mastered' },
  { value: 1, suffix: '', label: 'AWS Certification' },
];

/* ── Framer variants ──────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ── Component ────────────────────────────────────── */
export default function About() {
  return (
    <section id="about" className="about">
      {/* Ambient decorative orbs */}
      <div className="about__ambient-orb about__ambient-orb--1" />
      <div className="about__ambient-orb about__ambient-orb--2" />

      <motion.div
        className="about__content"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {/* ── Header ── */}
        <motion.p className="about__label" variants={fadeUp}>
          Introduction
        </motion.p>
        <motion.h2 className="about__title" variants={fadeUp}>
          About Me
        </motion.h2>

        {/* ── Two-column grid ── */}
        <div className="about__grid">
          {/* Left — Profile Image */}
          <motion.div className="about__image-wrapper" variants={fadeLeft}>
            <div className="about__profile">
              <div className="about__profile-inner">
                <img
                  src="/profile.jpg"
                  alt="Bala"
                  className="about__profile-img"
                />
              </div>
            </div>
          </motion.div>

          {/* Right — Bio + Stats */}
          <motion.div variants={fadeRight}>
            <div className="about__bio-card">
              <p className="about__bio-text">
                Passionate software developer with expertise in building{' '}
                <span className="about__bio-highlight">
                  scalable backend systems
                </span>{' '}
                and{' '}
                <span className="about__bio-highlight">
                  cloud-native applications
                </span>
                . Currently working as a{' '}
                <span className="about__bio-highlight">System Engineer</span>, I
                specialize in{' '}
                <span className="about__bio-highlight">
                  Java, Spring Boot, and AWS
                </span>{' '}
                to deliver high-performance solutions that make a real impact. I
                love turning complex problems into elegant, efficient code.
              </p>
            </div>

            {/* ── Stats ── */}
            <motion.div
              className="about__stats"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="about__stat-card"
                  variants={scaleIn}
                  custom={i}
                >
                  <div className="about__stat-number">
                    <AnimatedNumber
                      value={stat.value}
                      suffix={stat.suffix}
                      duration={1.8 + i * 0.2}
                    />
                  </div>
                  <div className="about__stat-label">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
