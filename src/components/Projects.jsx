import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import './Projects.css';

const projectsData = [
  {
    num: '01',
    title: 'E-Commerce Microservices Platform',
    description:
      'A scalable microservices architecture built with Spring Boot, featuring service discovery, API gateway, and event-driven communication.',
    tags: ['Java', 'Spring Boot', 'Microservices', 'Docker', 'RabbitMQ'],
    github: '#',
    live: '#',
  },
  {
    num: '02',
    title: 'Cloud Infrastructure Automation',
    description:
      'Automated AWS infrastructure provisioning using CloudFormation and CI/CD pipelines for seamless deployment workflows.',
    tags: ['AWS', 'CloudFormation', 'Jenkins', 'Docker'],
    github: '#',
    live: '#',
  },
  {
    num: '03',
    title: 'Real-time Analytics Dashboard',
    description:
      'A high-performance analytics dashboard with real-time data streaming, built with React frontend and Spring Boot backend.',
    tags: ['React', 'Spring Boot', 'WebSocket', 'MySQL'],
    github: '#',
    live: '#',
  },
  {
    num: '04',
    title: 'RESTful API Gateway',
    description:
      'A centralized API gateway handling authentication, rate limiting, and request routing for distributed microservices.',
    tags: ['Java', 'Spring Cloud', 'Redis', 'JWT'],
    github: '#',
    live: '#',
  },
];

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

function ProjectCard({ project }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [shine, setShine] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Tilt
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    setTilt({ rotateX, rotateY });

    // Shine
    const shineX = (x / rect.width) * 100;
    const shineY = (y / rect.height) * 100;
    setShine({ x: shineX, y: shineY });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <motion.div
      className={`project-card${isHovered ? ' project-card--hovered' : ''}`}
      variants={cardVariants}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1200px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(${isHovered ? 1.05 : 1}, ${isHovered ? 1.05 : 1}, 1)`,
        '--shine-x': `${shine.x}%`,
        '--shine-y': `${shine.y}%`
      }}
    >
      {/* Holographic overlay */}
      <div className="project-card__hologram" />

      {/* Gradient top border */}
      <div className="project-card__border-top" />

      {/* Glow effect on hover */}
      <div className="project-card__glow" />

      {/* Project number watermark */}
      <span className="project-card__number">{project.num}</span>

      {/* Content */}
      <div className="project-card__content">
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__description">{project.description}</p>

        <div className="project-card__tags">
          {project.tags.map((tag) => (
            <span key={tag} className="project-card__tag">
              {tag}
            </span>
          ))}
        </div>

        <div className="project-card__links">
          <a
            href={project.github}
            className="project-card__link-btn"
            aria-label="View on GitHub"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* GitHub-style icon using SVG */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 0.297C5.37 0.297 0 5.67 0 12.297c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>
          <a
            href={project.live}
            className="project-card__link-btn"
            aria-label="View live site"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* External link icon using SVG */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="projects-section">
      <motion.div
        className="projects-inner"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.div className="projects-header" variants={headerVariants}>
          <span className="projects-label">— Recent Work</span>
          <h2 className="projects-title">
            My <span className="projects-title__gradient">Projects</span>
          </h2>
        </motion.div>

        <div className="projects-grid">
          {projectsData.map((project) => (
            <ProjectCard key={project.num} project={project} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
