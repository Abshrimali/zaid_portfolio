import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGithub, FaDownload, FaEnvelope, FaMapMarkerAlt, FaLinkedin } from "react-icons/fa";
import { profile, projects, skills, experience } from "./data";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const pageRef = useRef(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = scrollHeight > 0 ? (scrolled / scrollHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header fade in
      gsap.from(".header-wrapper", {
        opacity: 0,
        y: -20,
        duration: 0.8,
        ease: "power2.out",
      });

      // Hero section animations
      gsap.from(".hero-title", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
      });

      gsap.from(".hero-subtitle", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.4,
      });

      gsap.from(".hero-cta", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.6,
      });

      // Section animations
      gsap.utils.toArray(".section-card").forEach((card, index) => {
        gsap.from(card, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
          delay: index * 0.1,
        });
      });

      // Skill tags animation
      gsap.utils.toArray(".skill-tag").forEach((tag, index) => {
        gsap.from(tag, {
          opacity: 0,
          scale: 0.9,
          duration: 0.6,
          ease: "back.out",
          scrollTrigger: {
            trigger: tag,
            start: "top 90%",
          },
          delay: index * 0.05,
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("Sending message...");

    try {
      const response = await axios.post("/api/contact", formData);
      setStatus(response.data.message);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus(error?.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div ref={pageRef} className="page-wrapper">
      <div className="loading-bar" style={{ width: `${scrollProgress}%` }}></div>

      <header className="header-wrapper">
        <div className="container">
          <div className="header-content">
            <div className="brand">AS</div>
            <nav className="nav-main">
              <a href="#home">Home</a>
              <a href="#about">About</a>
              <a href="#experience">Experience</a>
              <a href="#skills">Skills</a>
              <a href="#projects">Projects</a>
              <a href="#education">Education</a>
              <a href="#contact">Contact</a>
              <a href={profile.resume} download className="btn-resume">
                Download Resume
              </a>
            </nav>
            <button className="menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
            {mobileMenuOpen && (
              <nav className="nav-mobile">
                <a href="#home" onClick={() => setMobileMenuOpen(false)}>
                  Home
                </a>
                <a href="#about" onClick={() => setMobileMenuOpen(false)}>
                  About
                </a>
                <a href="#experience" onClick={() => setMobileMenuOpen(false)}>
                  Experience
                </a>
                <a href="#skills" onClick={() => setMobileMenuOpen(false)}>
                  Skills
                </a>
                <a href="#projects" onClick={() => setMobileMenuOpen(false)}>
                  Projects
                </a>
                <a href="#education" onClick={() => setMobileMenuOpen(false)}>
                  Education
                </a>
                <a href="#contact" onClick={() => setMobileMenuOpen(false)}>
                  Contact
                </a>
              </nav>
            )}
          </div>
        </div>
      </header>

      <main className="main-content">
        {/* Hero Section */}
        <section id="home" className="section hero-section">
          <div className="container">
            <div className="hero-wrapper">
              <div className="hero-content">
                <h1 className="hero-title">{profile.name}</h1>
                <p className="hero-subtitle">Dynamic web apps built clean and scalable.</p>
                <p className="hero-description">
                  Full-stack development with {profile.subtitle}. I enjoy building responsive
                  interfaces and maintainable backend systems.
                </p>
                <div className="hero-cta">
                  <a href="#projects" className="btn-primary">
                    View projects
                  </a>
                  <a href={`mailto:${profile.email}`} className="btn-secondary">
                    Contact me
                  </a>
                </div>
              </div>
              <div className="hero-image">
                <img src="/profile.jpg" alt={profile.name} className="profile-picture" />
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="section about-section">
          <div className="container">
            <div className="section-header">
              <h2>Current Focus</h2>
              <p>Full-stack work with clean user experience.</p>
            </div>
            <div className="about-grid">
              <div className="section-card">
                <h3>Frontend</h3>
                <p>
                  React interfaces with responsive design, animations, and attention to usability.
                </p>
              </div>
              <div className="section-card">
                <h3>Backend</h3>
                <p>
                  ASP.NET Core, Node.js, and REST APIs with scalable logic and clean architecture.
                </p>
              </div>
              <div className="section-card">
                <h3>Teaching</h3>
                <p>
                  Comfortable explaining concepts, debugging issues, and helping others build
                  projects.
                </p>
              </div>
              <div className="section-card">
                <h3>Growth</h3>
                <p>
                  Actively learning through projects, coursework, and exploring new technologies.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="section experience-section">
          <div className="container">
            <div className="section-header">
              <h2>Recent Experience</h2>
            </div>
            <div className="experience-list">
              {experience.map((item) => (
                <div key={item.role} className="section-card experience-card">
                  <div className="exp-header">
                    <h3>{item.role}</h3>
                    <span className="exp-period">{item.period}</span>
                  </div>
                  <p className="exp-company">{item.company}</p>
                  <p className="exp-details">{item.details}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="section skills-section">
          <div className="container">
            <div className="section-header">
              <h2>Core Skills</h2>
            </div>
            <div className="skills-categories">
              <div className="skill-category">
                <h4>Frontend</h4>
                <div className="skill-tags">
                  <span className="skill-tag">React</span>
                  <span className="skill-tag">JavaScript</span>
                  <span className="skill-tag">HTML</span>
                  <span className="skill-tag">CSS</span>
                  <span className="skill-tag">Angular</span>
                </div>
              </div>
              <div className="skill-category">
                <h4>Backend</h4>
                <div className="skill-tags">
                  <span className="skill-tag">ASP.NET Core</span>
                  <span className="skill-tag">Node.js</span>
                  <span className="skill-tag">Express</span>
                  <span className="skill-tag">C#</span>
                </div>
              </div>
              <div className="skill-category">
                <h4>Database</h4>
                <div className="skill-tags">
                  <span className="skill-tag">SQL Server</span>
                  <span className="skill-tag">MongoDB</span>
                  <span className="skill-tag">MySQL</span>
                </div>
              </div>
              <div className="skill-category">
                <h4>Tools</h4>
                <div className="skill-tags">
                  <span className="skill-tag">Git</span>
                  <span className="skill-tag">GitHub</span>
                  <span className="skill-tag">GSAP</span>
                  <span className="skill-tag">Vite</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="section projects-section">
          <div className="container">
            <div className="section-header">
              <h2>Selected Projects</h2>
            </div>
            <div className="projects-grid">
              {projects.map((project, index) => (
                <a
                  key={project.title}
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="section-card project-card">
                  <div className="project-header">
                    <h3>{project.title}</h3>
                    <span className="project-number">0{index + 1}</span>
                  </div>
                  <p>{project.description}</p>
                  <div className="project-tech">
                    {project.tech.split(", ").map((tech) => (
                      <span key={tech} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="section education-section">
          <div className="container">
            <div className="section-header">
              <h2>Study & Strengths</h2>
            </div>
            <div className="education-grid">
              <div className="section-card">
                <p className="edu-status">In progress</p>
                <h4>ADSE Diploma</h4>
                <p className="edu-institute">Aptech Computer Education</p>
                <p>Advance Diploma in Software Engineering with practical web development focus.</p>
              </div>
              <div className="section-card">
                <p className="edu-status">Teaching Role</p>
                <h4>Teaching Intern</h4>
                <p className="edu-institute">Aptech Computer Education</p>
                <p>
                  Conducting training sessions and supporting students with web fundamentals and
                  practical projects.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="section impact-section">
          <div className="container">
            <div className="section-header">
              <h2>Quick Snapshot</h2>
            </div>
            <div className="impact-grid">
              <div className="impact-card">
                <p className="impact-number">30+</p>
                <p className="impact-label">Students Supported</p>
              </div>
              <div className="impact-card">
                <p className="impact-number">10+</p>
                <p className="impact-label">Projects Built</p>
              </div>
              <div className="impact-card">
                <p className="impact-number">5+</p>
                <p className="impact-label">Core Technologies</p>
              </div>
              <div className="impact-card">
                <p className="impact-number">2+</p>
                <p className="impact-label">Years Experience</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section contact-section">
          <div className="container">
            <div className="section-header">
              <h2>Let's Connect</h2>
            </div>
            <div className="contact-content">
              <div className="contact-info">
                <h3>Open to Work</h3>
                <p>
                  Open to full stack, internship, freelance, and junior engineering opportunities in
                  Karachi or remote-friendly teams.
                </p>
                <div className="contact-links">
                  <a href={`mailto:${profile.email}`} className="contact-link">
                    <FaEnvelope /> Email
                  </a>
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    className="contact-link">
                    <FaGithub /> GitHub
                  </a>
                  <a href={profile.resume} download className="contact-link">
                    <FaDownload /> Resume
                  </a>
                </div>
              </div>
              <form className="contact-form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  required
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message"
                  rows="5"
                  required></textarea>
                <button type="submit" className="btn-primary">
                  Send Message
                </button>
                {status && <p className="form-status">{status}</p>}
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2026 {profile.name}. All rights reserved.</p>
          <p>Built with React + Vite + GSAP</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
