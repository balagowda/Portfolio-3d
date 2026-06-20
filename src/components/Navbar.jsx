import { useState, useEffect, useCallback } from 'react';
import './Navbar.css';

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* ------------------------------------------------
     Scroll‑dependent background shift
  ------------------------------------------------ */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ------------------------------------------------
     IntersectionObserver — active section detection
  ------------------------------------------------ */
  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.href.slice(1));
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  /* ------------------------------------------------
     Smooth scroll helper
  ------------------------------------------------ */
  const scrollTo = useCallback(
    (e, href) => {
      e.preventDefault();
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setMobileOpen(false);
    },
    [],
  );

  /* ------------------------------------------------
     Render
  ------------------------------------------------ */
  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        {/* Brand */}
        <a
          href="#home"
          className="navbar__brand"
          onClick={(e) => scrollTo(e, '#home')}
        >
          <span className="bracket">&lt;</span>BG
          <span className="bracket"> /&gt;</span>
        </a>

        {/* Desktop links */}
        <ul className="navbar__links">
          {NAV_ITEMS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className={`navbar__link${
                  activeSection === href.slice(1) ? ' active' : ''
                }`}
                onClick={(e) => scrollTo(e, href)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger (mobile) */}
        <button
          className={`navbar__hamburger${mobileOpen ? ' open' : ''}`}
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile dropdown */}
      <ul className={`navbar__mobile-menu${mobileOpen ? ' open' : ''}`}>
        {NAV_ITEMS.map(({ label, href }) => (
          <li key={href}>
            <a
              href={href}
              className={`navbar__mobile-link${
                activeSection === href.slice(1) ? ' active' : ''
              }`}
              onClick={(e) => scrollTo(e, href)}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
