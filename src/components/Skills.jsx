import { motion } from 'framer-motion';
import OrbitCanvas from './canvas/OrbitCanvas';
import './Skills.css';

const skillsData = [
  {
    category: 'Backend',
    color: '#f97316',
    skills: [
      { name: 'Java', icon: '/tech/java.svg', proficiency: 90 },
      { name: 'Spring Boot', icon: '/tech/spring.svg', proficiency: 85 },
      { name: 'Microservices', icon: '🧩', proficiency: 80 },
      { name: 'REST APIs', icon: '🔗', proficiency: 88 },
    ],
  },
  {
    category: 'Database',
    color: '#3b82f6',
    skills: [
      { name: 'MySQL', icon: '/tech/mysql.svg', proficiency: 80 },
      { name: 'PostgreSQL', icon: '🐘', proficiency: 78 },
      { name: 'MongoDB', icon: '🍃', proficiency: 75 },
      { name: 'Redis', icon: '⚡', proficiency: 72 },
    ],
  },
  {
    category: 'Cloud & DevOps',
    color: '#8b5cf6',
    skills: [
      { name: 'AWS', icon: '/tech/aws.svg', proficiency: 75 },
      { name: 'Docker', icon: '/tech/docker.svg', proficiency: 80 },
      { name: 'Kubernetes', icon: '⎈', proficiency: 70 },
      { name: 'CI/CD', icon: '🔄', proficiency: 76 },
    ],
  },
  {
    category: 'Tools & Others',
    color: '#10b981',
    skills: [
      { name: 'Git', icon: '/tech/git.svg', proficiency: 88 },
      { name: 'Linux', icon: '🐧', proficiency: 82 },
      { name: 'React', icon: '/tech/react.svg', proficiency: 85 },
      { name: 'VS Code', icon: '🔷', proficiency: 84 },
    ],
  },
];

/* ── animation variants ── */
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const categoryVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: 'easeOut' },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

/* ── proficiency bar (animates on scroll) ── */
function ProficiencyBar({ proficiency, color }) {
  const barRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="skills-bar-track" ref={barRef}>
      <div
        className="skills-bar-fill"
        style={{
          width: inView ? `${proficiency}%` : '0%',
          background: `linear-gradient(90deg, ${color}, ${color}99)`,
        }}
      />
    </div>
  );
}

/* ── skill card ── */
function SkillCard({ skill, color }) {
  return (
    <motion.div className="skills-card" variants={cardVariants} whileHover={{ scale: 1.05 }}>
      <div className="skills-card-glow" style={{ '--accent': color }} />
      <div className="skills-card-inner" style={{ position: 'relative', zIndex: 1 }}>
        <div className="skills-card-header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="skills-card-icon" style={{ width: '80px', height: '80px', marginBottom: '10px' }}>
            {skill.icon.includes('.svg') ? (
              <BallCanvas icon={skill.icon} />
            ) : (
              <span style={{ fontSize: '3rem' }}>{skill.icon}</span>
            )}
          </div>
          <span className="skills-card-name" style={{ fontSize: '1.1rem', fontWeight: 600 }}>{skill.name}</span>
        </div>
        <div className="skills-card-bar-wrapper">
          <ProficiencyBar proficiency={skill.proficiency} color={color} />
          <span className="skills-card-pct">{skill.proficiency}%</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ── main section ── */
export default function Skills() {
  return (
    <section id="skills" className="skills-section">
      <div className="skills-container">
        {/* heading */}
        <motion.div
          className="skills-heading"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <span className="skills-label">— What I Know</span>
          <h2 className="skills-title">
            Skills <span className="skills-title-accent">&amp; Technologies</span>
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', marginTop: '10px' }}>
            Interact with the planetary system below to explore my tech stack.
          </p>
        </motion.div>

        <motion.div
          className="skills-orbit-container"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <OrbitCanvas />
        </motion.div>
      </div>
    </section>
  );
}
