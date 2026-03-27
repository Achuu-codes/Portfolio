import { useEffect, useState } from "react";

const fallbackProfile = {
  name: "Shreyas R Achar",
  role: "Full-Stack Developer and SDE Intern Aspirant",
  intro:
    "I build student-first products, backend systems, and data-driven projects with a focus on shipping clean user experiences and strong fundamentals.",
  location: "Bengaluru, India",
  email: "shreyasrock9999@gmail.com",
  phone: "+91 9901774190",
  github: "https://github.com/Achuu-codes",
  resumeUrl: "/Shreyas_Achar_Resume.pdf",
  stats: [
    { value: "8.57", label: "CGPA at BMSCE" },
    { value: "78%+", label: "ML model accuracy" },
    { value: "15+", label: "IPL seasons analyzed" },
    { value: "1650", label: "Chess.com rating" }
  ],
  education: [],
  skills: {},
  projects: [],
  responsibilities: [],
  achievements: []
};

const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" }
];

function App() {
  const [profile, setProfile] = useState(fallbackProfile);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await fetch("/api/profile");
        if (!response.ok) {
          throw new Error("Profile request failed");
        }

        const data = await response.json();
        setProfile(data);
      } catch {
        setProfile(fallbackProfile);
      }
    };

    loadProfile();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const payload = {
      name: formData.get("name")?.toString().trim(),
      email: formData.get("email")?.toString().trim(),
      company: formData.get("company")?.toString().trim(),
      message: formData.get("message")?.toString().trim()
    };

    setIsSending(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      event.currentTarget.reset();
      setStatus({
        type: "success",
        message: data.message
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Unable to send your message right now."
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="page-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="site-header">
        <a className="brand" href="#top">
          <span className="brand-mark">SR</span>
          <span>{profile.name}</span>
        </a>

        <nav className="site-nav">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main id="top">
        <section className="hero section">
          <div className="hero-copy">
            <p className="eyebrow">B.E. Computer Science | BMSCE</p>
            <h1>{profile.role}</h1>
            <p className="hero-text">{profile.intro}</p>

            <div className="hero-actions">
              <a className="button button-primary" href="#projects">
                Explore Projects
              </a>
              <a className="button button-secondary" href={profile.resumeUrl} target="_blank" rel="noreferrer">
                View Resume
              </a>
            </div>

            <div className="hero-meta">
              <span>{profile.location}</span>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <a href={profile.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </div>
          </div>

          <aside className="hero-card">
            <p className="mini-label">Current Focus</p>
            <h2>Building full-stack products with strong CS fundamentals.</h2>
            <ul>
              <li>React, Node.js, Express.js, MongoDB</li>
              <li>DSA, OOP, DBMS, OS, Computer Networks</li>
              <li>Student communities, technical events, mentoring</li>
            </ul>
          </aside>
        </section>

        <section className="stats-grid section">
          {profile.stats.map((item) => (
            <article key={item.label} className="stat-card">
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </article>
          ))}
        </section>

        <section id="about" className="section two-column">
          <div>
            <p className="section-label">About</p>
            <h2>A modern engineering profile with product instinct.</h2>
          </div>

          <div className="about-card">
            <p>
              I am a Computer Science student at BMS College of Engineering who enjoys working across the stack, from
              polished frontend experiences to backend systems and data-driven models. My work is shaped by a strong
              interest in scalable apps, competitive problem solving, and practical engineering.
            </p>
            <p>
              I am actively targeting software development and internship opportunities where I can contribute quickly,
              learn fast, and grow with strong teams.
            </p>
          </div>
        </section>

        <section id="projects" className="section">
          <div className="section-heading">
            <div>
              <p className="section-label">Selected Work</p>
              <h2>Projects that combine engineering depth and practical impact.</h2>
            </div>
          </div>

          <div className="project-grid">
            {profile.projects.map((project) => (
              <article className="project-card" key={project.title}>
                <div className="project-topline">
                  <span>{project.category}</span>
                  <span>{project.stack}</span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <ul className="project-points">
                  {project.highlights.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="section skills-section">
          <div className="section-heading">
            <div>
              <p className="section-label">Tech Stack</p>
              <h2>Core tools, languages, and concepts I work with.</h2>
            </div>
          </div>

          <div className="skills-grid">
            {Object.entries(profile.skills).map(([title, items]) => (
              <article className="skill-card" key={title}>
                <p className="mini-label">{title}</p>
                <div className="pill-wrap">
                  {items.map((item) => (
                    <span className="pill" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="section split-section">
          <div>
            <p className="section-label">Leadership</p>
            <h2>Campus roles that strengthened execution and collaboration.</h2>
          </div>

          <div className="timeline">
            {profile.responsibilities.map((item) => (
              <article className="timeline-card" key={item.title}>
                <div className="timeline-heading">
                  <h3>{item.title}</h3>
                  <span>{item.organization}</span>
                </div>
                <ul>
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="section achievement-layout">
          <div>
            <p className="section-label">Achievements</p>
            <h2>Signals of consistency, discipline, and curiosity.</h2>
          </div>

          <div className="achievement-list">
            {profile.achievements.map((item) => (
              <article className="achievement-card" key={item}>
                <span className="achievement-dot" />
                <p>{item}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section education-section">
          <div>
            <p className="section-label">Education</p>
            <h2>Academic foundation built on strong performance.</h2>
          </div>

          <div className="education-grid">
            {profile.education.map((item) => (
              <article className="education-card" key={item.institution}>
                <span>{item.period}</span>
                <h3>{item.institution}</h3>
                <p>{item.degree}</p>
                <strong>{item.result}</strong>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="contact-copy">
            <p className="section-label">Contact</p>
            <h2>Let’s build something valuable together.</h2>
            <p>
              I’m open to SDE internships, student developer opportunities, and full-stack collaborations. If you have
              a role, project, or idea in mind, send a note.
            </p>
            <div className="contact-links">
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <a href={`tel:${profile.phone.replace(/\s+/g, "")}`}>{profile.phone}</a>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              Name
              <input name="name" type="text" placeholder="Your name" required />
            </label>

            <label>
              Email
              <input name="email" type="email" placeholder="you@example.com" required />
            </label>

            <label>
              Company / College
              <input name="company" type="text" placeholder="Optional" />
            </label>

            <label>
              Message
              <textarea name="message" rows="5" placeholder="Tell me about the opportunity..." required />
            </label>

            <button className="button button-primary" type="submit" disabled={isSending}>
              {isSending ? "Sending..." : "Send Message"}
            </button>

            {status.message ? (
              <p className={`form-status ${status.type === "success" ? "success" : "error"}`}>{status.message}</p>
            ) : null}
          </form>
        </section>
      </main>
    </div>
  );
}

export default App;
