import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './Experience.css';

/* ============================================================
   Experience Data
   ============================================================ */
const experiences = [
  {
    role: 'Software Developer',
    company: 'TCS',
    duration: 'Jan 2025 – Present',
    description:
      'Developing and maintaining enterprise-grade microservices using Java and Spring Boot. Implementing cloud-native solutions on AWS. Collaborating with cross-functional teams to deliver high-quality software.',
    points: [
      'Built RESTful APIs serving 10K+ requests/day',
      'Delivered end-to-end backend solutions including testing and API validation.',
      'Collaborate effectively in Agile teams to ensure high-quality delivery.',
      'Gained AWS Cloud Practitioner certification.'
    ],
  },
  {
    role: 'Open Source Developer',
    company: 'Layer5.io',
    duration: 'Apr 2024 – Dec 2024',
    description:
      'Hands-on experience in front-end development during contribution period.',
    points: [
      'Focused on improving user experience',
      'Enhancing front-end functionality',
      'Collaborating with the community through effective debugging and knowledge sharing',
    ],
  },
  {
    role: 'Freelancer',
    // company: 'Tech Solutions Inc.',
    duration: 'Dec 2023',
    description:
      'Designed and developed a responsive web application for a client, managing both UI/UX design and full-stack implementation using React',
    points: [
      'Ensured cross-browser and cross-device compatibility',
      'Deployed and hosted the application ',
    ],
  },
];

/* ============================================================
   CalendarIcon – tiny inline SVG
   ============================================================ */
function CalendarIcon() {
  return (
    <svg
      className="timeline__duration-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

/* ============================================================
   TimelineCard – a single experience entry
   ============================================================ */
function TimelineCard({ experience, index }) {
  const isLeft = index % 2 === 0;
  const side = isLeft ? 'left' : 'right';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  /* Slide direction: left cards from -60px, right from +60px */
  const slideX = isLeft ? -60 : 60;

  return (
    <div
      className={`timeline__entry timeline__entry--${side}`}
      ref={ref}
    >
      {/* Glowing dot on the timeline */}
      <motion.div
        className="timeline__dot"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
      />

      {/* Horizontal connector (desktop only) */}
      <motion.div
        className="timeline__connector"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.35, ease: 'easeOut' }}
        style={{ transformOrigin: isLeft ? 'right center' : 'left center' }}
      />

      {/* Card */}
      <motion.div
        className="timeline__card"
        initial={{ x: slideX, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : {}}
        transition={{
          duration: 0.6,
          delay: 0.15,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {/* Duration badge */}
        <span className="timeline__duration">
          <CalendarIcon />
          {experience.duration}
        </span>

        {/* Role & company */}
        <h3 className="timeline__role">{experience.role}</h3>
        <p className="timeline__company">{experience.company}</p>

        {/* Description */}
        <p className="timeline__description">{experience.description}</p>

        {/* Bullet points */}
        <ul className="timeline__points">
          {experience.points.map((point, i) => (
            <motion.li
              className="timeline__point"
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.35,
                delay: 0.4 + i * 0.1,
                ease: 'easeOut',
              }}
            >
              <span className="timeline__point-dot" />
              <span>{point}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

/* ============================================================
   Experience Section
   ============================================================ */
export default function Experience() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="experience" ref={sectionRef}>
      <div className="experience__inner">
        {/* ---- Header ---- */}
        <motion.p
          className="experience__label"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          — My Journey
        </motion.p>

        <motion.h2
          className="experience__title gradient-text"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          Work Experience
        </motion.h2>

        <motion.p
          className="experience__subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
        >
          A timeline of my professional growth, from freelance to building
          production-grade systems at scale.
        </motion.p>

        {/* ---- Timeline ---- */}
        <div className="timeline">
          {/* Animated vertical line */}
          <motion.div
            className="timeline__line"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{
              duration: 1.2,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
          />

          {/* Experience cards */}
          {experiences.map((exp, index) => (
            <TimelineCard
              key={index}
              experience={exp}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
