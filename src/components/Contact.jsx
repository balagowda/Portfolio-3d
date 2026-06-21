import { useState } from 'react';
import { motion } from 'framer-motion';
import EarthCanvas from './canvas/EarthCanvas';
import './Contact.css';

/* ---- Animation variants ---- */
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

/* ---- Contact details data ---- */
const contactDetails = [
  { icon: '📧', text: 'balagowda9900@gmail.com' },
  { icon: '📍', text: 'Bangalore, India' },
  // { icon: '📱', text: '+91 XXXXX XXXXX' },
];

/* ---- Social links data ---- */
const socials = [
  {
    label: 'GitHub',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
    href: 'https://github.com/balagowda',
  },
  {
    label: 'LinkedIn',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    href: 'https://www.linkedin.com/in/balachandregowda-p-20034a224/',
  },
  {
    label: 'Twitter',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    href: 'https://x.com/balagowda_02',
  },
];

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', form);
    alert('Thank you! Your message has been received.');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="contact section-padding">
      {/* Background glows */}
      <div className="contact__bg-glow contact__bg-glow--purple" />
      <div className="contact__bg-glow contact__bg-glow--cyan" />

      <div className="container">
        {/* Section Header */}
        <motion.p
          className="contact__label"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          — Contact
        </motion.p>

        <motion.h2
          className="contact__title gradient-text"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={1}
        >
          Get In Touch
        </motion.h2>

        {/* Two-Column Grid */}
        <div className="contact__grid">
          {/* ---- Left Column: Info ---- */}
          <motion.div
            className="contact__info"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h3 className="contact__info-heading" variants={fadeUp}>
              Let&apos;s work together
            </motion.h3>

            <motion.p className="contact__info-text" variants={fadeUp}>
              I&apos;m always open to discussing new projects, creative ideas,
              or opportunities to be part of your vision.
            </motion.p>

            {/* Contact details */}
            <motion.div className="contact__details" variants={fadeUp}>
              {contactDetails.map((item, idx) => (
                <div className="contact__detail-item" key={idx}>
                  <span className="contact__detail-icon">{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </motion.div>

            {/* Social links */}
            <motion.div className="contact__socials" variants={fadeUp}>
              {socials.map((s, idx) => (
                <a
                  key={idx}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__social-link"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </motion.div>
            </motion.div>
          
          {/* ---- Form (Moved to Left Column) ---- */}
          <motion.div
            className="contact__form-card"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={2}
          >
            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="contact__field">
                <label className="contact__label-text" htmlFor="contact-name">
                  Your Name
                </label>
                <input
                  id="contact-name"
                  className="contact__input"
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact__field">
                <label className="contact__label-text" htmlFor="contact-email">
                  Your Email
                </label>
                <input
                  id="contact-email"
                  className="contact__input"
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact__field">
                <label
                  className="contact__label-text"
                  htmlFor="contact-message"
                >
                  Your Message
                </label>
                <textarea
                  id="contact-message"
                  className="contact__textarea"
                  name="message"
                  placeholder="Tell me about your project..."
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="contact__submit">
                Send Message
              </button>
            </form>
          </motion.div>
          {/* ---- End Form ---- */}

          {/* ---- Right Column: Earth ---- */}
          <motion.div
            className="contact__earth"
            style={{ width: '100%', height: '100%', minHeight: '400px' }}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <EarthCanvas />
          </motion.div>

          {/* ---- Tagline (to the right of Earth) ---- */}
          <motion.div
            className="contact__tagline-card"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="contact__tagline">
              Experience working with a distributed team.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
