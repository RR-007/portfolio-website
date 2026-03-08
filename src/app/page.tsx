"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const PROJECTS = [
  {
    name: "UsQuest",
    badge: "Live — Beta",
    badgeStyle: "text-indigo-400 border-indigo-400",
    description:
      "A React Native social app for couples and friend groups — shared lists, photo diaries, quests, location sharing, Spotify integration, and more. Built solo from scratch with a full CI/CD pipeline and distributed via Google Play and TestFlight.",
    tags: ["React Native", "Expo", "Firebase", "Node.js", "GitHub Actions", "EAS"],
  },
  {
    name: "Widget Framework",
    badge: "Ongoing",
    badgeStyle: "text-amber-400 border-amber-500",
    description:
      "A low-code framework that lets non-developers build full web pages from simple JSON configs — each 'widget' maps to a component, handling layouts, dynamic actions, and complex calculations. Currently leading a full rebuild in React, expanding support to developers for standardized, department-wide page experiences with drastically reduced dev time.",
    tags: ["Angular", "React", "JSON", "Low-Code", "Framework Design"],
  },
  {
    name: "College Fest Platform",
    badge: "Shipped",
    badgeStyle: "text-gray-500 border-gray-600",
    description:
      "Event platform built with a team for our college fest — event listings, pass booking, and live schedules for visitors. Shipped under deadline for a real audience.",
    tags: ["React", "Node.js"],
  },
];

const SKILLS = [
  { category: "Frontend", items: ["React", "React Native", "Next.js", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "Express", "FastAPI", "Firebase"] },
  { category: "Tooling", items: ["GitHub Actions", "EAS", "Expo", "CI/CD"] },
  { category: "Language", items: ["C++/C", "JS", "TS", "Python (avg)", "Java (avg)"] },
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main
      className="min-h-screen bg-gray-950 text-white"
      style={{
        backgroundImage: `radial-gradient(ellipse at 60% 0%, rgba(99,102,241,0.12) 0%, transparent 60%),
          linear-gradient(to bottom, #030712 0%, #030712 100%)`,
      }}
    >
      {/* Subtle grid overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
          backgroundSize: "72px 72px",
        }}
      />

      {/* Navbar */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled || menuOpen ? "rgba(3,7,18,0.95)" : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(12px)" : "none",
          borderBottom: scrolled || menuOpen ? "1px solid rgba(255,255,255,0.06)" : "none",
        }}
      >
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-bold text-white tracking-tight">RR</span>
          <div className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-gray-400 hover:text-white transition-colors hidden md:block"
              >
                {link.label}
              </a>
            ))}
            <a
              href="mailto:rohitrajeev02@gmail.com"
              className="text-sm px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors font-medium hidden md:block"
            >
              Hire Me
            </a>
            {/* Hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-1"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              <span
                className="block w-5 h-px bg-white transition-all duration-300"
                style={{ transform: menuOpen ? "translateY(6px) rotate(45deg)" : "none" }}
              />
              <span
                className="block w-5 h-px bg-white transition-all duration-300"
                style={{ opacity: menuOpen ? 0 : 1 }}
              />
              <span
                className="block w-5 h-px bg-white transition-all duration-300"
                style={{ transform: menuOpen ? "translateY(-6px) rotate(-45deg)" : "none" }}
              />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className="md:hidden overflow-hidden transition-all duration-300"
          style={{ maxHeight: menuOpen ? "300px" : "0" }}
        >
          <div className="px-6 pb-6 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-gray-400 hover:text-white transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="mailto:rohitrajeev02@gmail.com"
              className="text-sm px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors font-medium text-center"
              onClick={() => setMenuOpen(false)}
            >
              Hire Me
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <p className="relative text-xs uppercase tracking-[0.25em] text-indigo-400 mb-6 font-medium">
          Web & App Developer · India
        </p>
        <h1
          className="relative text-5xl md:text-7xl font-bold mb-6 tracking-tight"
          style={{ letterSpacing: "-0.02em" }}
        >
          Rohit Rajeev
        </h1>
        <p className="relative text-lg md:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed">
          I build frameworks, products, and mobile apps —{" "}
          <span className="text-gray-200">from low-code widget systems</span> to{" "}
          <span className="text-gray-200">shipped React Native apps.</span>
        </p>
        <div className="relative flex flex-wrap gap-4 justify-center">
          <a
            href="#projects"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-medium transition-all duration-200"
          >
            View Projects
          </a>
          <a
            href="mailto:rohitrajeev02@gmail.com"
            className="px-6 py-3 border border-gray-700 hover:border-gray-500 hover:text-white text-gray-300 rounded-lg font-medium transition-colors"
          >
            Get in Touch
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 flex flex-col items-center gap-2 opacity-40">
          <span className="text-xs tracking-widest uppercase text-gray-500">Scroll</span>
          <div className="w-px h-10 bg-linear-to-b from-gray-500 to-transparent" />
        </div>
      </section>

      {/* About */}
      <section id="about" className="relative max-w-4xl mx-auto px-6 py-32">
        <p className="text-xs uppercase tracking-[0.25em] text-indigo-400 mb-4 font-medium">
          About
        </p>
        <h2
          className="text-3xl md:text-4xl font-bold mb-10 tracking-tight"
          style={{ letterSpacing: "-0.02em" }}
        >
          A developer who ships.
        </h2>
        <div className="grid md:grid-cols-2 gap-10 text-gray-400 text-lg leading-relaxed">
          <p>
            I&apos;m a full-stack developer based in India. At my day job, I architect
            a widget-based framework that lets teams build full websites from simple
            JSON configs — think low-code, but for developers.
          </p>
          <p>
            Outside of work, I build my own products. UsQuest is a React Native
            social app for couples and friend groups, currently in beta on the
            Play Store. I&apos;m interested in Web3, developer tooling, and building
            things that are actually used by real people.
          </p>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="relative max-w-4xl mx-auto px-6 py-32">
        <p className="text-xs uppercase tracking-[0.25em] text-indigo-400 mb-4 font-medium">
          Projects
        </p>
        <h2
          className="text-3xl md:text-4xl font-bold mb-12 tracking-tight"
          style={{ letterSpacing: "-0.02em" }}
        >
          Things I&apos;ve shipped.
        </h2>
        <div className="flex flex-col gap-6">
          {PROJECTS.map((project) => (
            <div
              key={project.name}
              className="group border border-gray-800 rounded-2xl p-8 hover:border-indigo-500 transition-all duration-300"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold group-hover:text-indigo-300 transition-colors">
                  {project.name}
                </h3>
                <span className={`text-xs border rounded-full px-3 py-1 ${project.badgeStyle}`}>
                  {project.badge}
                </span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-800 text-gray-300 rounded-full px-3 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="relative max-w-4xl mx-auto px-6 py-32">
        <p className="text-xs uppercase tracking-[0.25em] text-indigo-400 mb-4 font-medium">
          Skills
        </p>
        <h2
          className="text-3xl md:text-4xl font-bold mb-12 tracking-tight"
          style={{ letterSpacing: "-0.02em" }}
        >
          What I work with.
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {SKILLS.map(({ category, items }) => (
            <div
              key={category}
              className="border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-colors"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <p className="text-indigo-400 text-xs font-medium uppercase tracking-widest mb-4">
                {category}
              </p>
              <ul className="flex flex-col gap-2">
                {items.map((item) => (
                  <li key={item} className="text-gray-300 text-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="relative max-w-4xl mx-auto px-6 py-32"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <p className="text-xs uppercase tracking-[0.25em] text-indigo-400 mb-4 font-medium">
          Contact
        </p>
        <h2
          className="text-3xl md:text-4xl font-bold mb-6 tracking-tight"
          style={{ letterSpacing: "-0.02em" }}
        >
          Let&apos;s work together.
        </h2>
        <p className="text-gray-400 text-lg mb-10 max-w-xl leading-relaxed">
          I&apos;m open to freelance projects, interesting collaborations, and good
          conversations. Reach out anytime.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="mailto:rohitrajeev02@gmail.com"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-medium transition-colors"
          >
            Email Me
          </a>
          <a
            href="https://www.linkedin.com/in/rohit-rajeev-093564203/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white rounded-lg font-medium transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/RR-007"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white rounded-lg font-medium transition-colors"
          >
            GitHub
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="max-w-4xl mx-auto px-6 py-8 flex items-center justify-between"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <span className="text-sm text-gray-600">© 2026 Rohit Rajeev</span>
        <span className="text-sm text-gray-600">Built with Next.js + Tailwind</span>
      </footer>
    </main>
  );
}