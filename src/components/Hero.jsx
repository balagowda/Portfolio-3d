import { useCallback } from 'react';
import { motion } from 'framer-motion';
import HeroCanvas from './canvas/HeroCanvas';
import './Hero.css';


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const labelVariants = {
  hidden: { opacity: 0, x: -30, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

export default function Hero() {
  const handleScroll = useCallback((targetId) => {
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section id="home" className="hero">
      <div className="hero__canvas-container" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
        <HeroCanvas />
      </div>

      <motion.div
        className="hero__content"
        style={{ zIndex: 1, position: 'relative', marginTop: '28vh' }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="hero__cta-group" variants={itemVariants}>
          <button
            className="hero__cta hero__cta--primary"
            onClick={() => handleScroll('projects')}
          >
            <span className="hero__cta-text">View My Work</span>
            <span className="hero__cta-icon" aria-hidden="true">→</span>
          </button>
          <button
            className="hero__cta hero__cta--secondary"
            onClick={() => handleScroll('contact')}
          >
            <span className="hero__cta-text">Contact Me</span>
            <span className="hero__cta-icon" aria-hidden="true">✉️</span>
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero__scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <div className="hero__scroll-mouse">
          <div className="hero__scroll-wheel" />
        </div>
        <div className="hero__scroll-arrows">
          <span className="hero__scroll-chevron" />
          <span className="hero__scroll-chevron" />
          <span className="hero__scroll-chevron" />
        </div>
      </motion.div>
    </section>
  );
}
