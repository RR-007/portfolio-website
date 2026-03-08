"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";

// ─── Data ────────────────────────────────────────────────────────────────────

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

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 60, filter: "blur(4px)" },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: "easeOut" as const, delay },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

// ─── Project Card (3D tilt + glass) ──────────────────────────────────────────

function ProjectCard({ project, index }: { project: (typeof PROJECTS)[0]; index: number }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 200, damping: 25 });
  const glowX = useTransform(mx, [-0.5, 0.5], [0, 100]);
  const glowY = useTransform(my, [-0.5, 0.5], [0, 100]);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function onMouseLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      variants={fadeUp}
      custom={index * 0.08}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="relative group rounded-2xl p-8 border border-gray-800 hover:border-indigo-500/50 transition-colors duration-300 overflow-hidden cursor-default"
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        {/* Glass background */}
        <div
          className="absolute inset-0 rounded-2xl"
          style={{ background: "rgba(255,255,255,0.025)", backdropFilter: "blur(12px)" }}
        />
        {/* Hover glow spot */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${glowX.get()}% ${glowY.get()}%, rgba(99,102,241,0.12) 0%, transparent 60%)`,
          }}
        />
        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-xl font-bold group-hover:text-indigo-300 transition-colors duration-200">
              {project.name}
            </h3>
            <span className={`text-xs border rounded-full px-3 py-1 ml-4 shrink-0 ${project.badgeStyle}`}>
              {project.badge}
            </span>
          </div>
          <p className="text-gray-400 mb-6 leading-relaxed">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="text-xs bg-gray-800/80 text-gray-300 rounded-full px-3 py-1">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
      <motion.p variants={fadeUp} className="text-xs uppercase tracking-[0.25em] text-indigo-400 mb-4 font-medium">
        {eyebrow}
      </motion.p>
      <motion.h2
        variants={fadeUp}
        custom={0.1}
        className="text-3xl md:text-4xl font-bold mb-12 tracking-tight"
        style={{ letterSpacing: "-0.02em" }}
      >
        {title}
      </motion.h2>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Hero parallax
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  // Navbar scroll detection via framer instead of useEffect
  const { scrollY } = useScroll();
  scrollY.on("change", (v) => setScrolled(v > 20));

  return (
    <main className="min-h-screen bg-[#030712] text-white overflow-x-hidden">

      {/* ── Animated background orbs ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div
          className="orb-a absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)", filter: "blur(60px)" }}
        />
        <div
          className="orb-b absolute bottom-[10%] left-[-15%] w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)", filter: "blur(60px)" }}
        />
        <div
          className="orb-c absolute top-[50%] left-[40%] w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)", filter: "blur(80px)" }}
        />
      </div>

      {/* ── Grid overlay ── */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
          backgroundSize: "72px 72px",
        }}
      />

      {/* ── Navbar ── */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50"
        animate={{
          background: scrolled || menuOpen ? "rgba(3,7,18,0.9)" : "rgba(3,7,18,0)",
          backdropFilter: scrolled || menuOpen ? "blur(14px)" : "blur(0px)",
          borderBottom: scrolled || menuOpen ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(255,255,255,0)",
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.span
            className="font-bold text-white tracking-tight"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            RR
          </motion.span>
          <div className="flex items-center gap-8">
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="text-sm text-gray-400 hover:text-white transition-colors hidden md:block"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="mailto:rohitrajeev02@gmail.com"
              className="text-sm px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors font-medium hidden md:block"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              Hire Me
            </motion.a>
            {/* Hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-1"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              <span className="block w-5 h-px bg-white transition-all duration-300"
                style={{ transform: menuOpen ? "translateY(6px) rotate(45deg)" : "none" }} />
              <span className="block w-5 h-px bg-white transition-all duration-300"
                style={{ opacity: menuOpen ? 0 : 1 }} />
              <span className="block w-5 h-px bg-white transition-all duration-300"
                style={{ transform: menuOpen ? "translateY(-6px) rotate(-45deg)" : "none" }} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="md:hidden overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <div className="px-6 pb-6 flex flex-col gap-4">
                {NAV_LINKS.map((link) => (
                  <a key={link.href} href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                    onClick={() => setMenuOpen(false)}>
                    {link.label}
                  </a>
                ))}
                <a href="mailto:rohitrajeev02@gmail.com"
                  className="text-sm px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors font-medium text-center"
                  onClick={() => setMenuOpen(false)}>
                  Hire Me
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ── Hero ── */}
      <section ref={heroRef} className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="flex flex-col items-center">
          <motion.p
            className="text-xs uppercase tracking-[0.25em] text-indigo-400 mb-6 font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Web & App Developer · India
          </motion.p>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6"
            style={{ letterSpacing: "-0.02em" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.55 }}
          >
            <span
              style={{
                backgroundImage: "linear-gradient(135deg, #fff 0%, #a5b4fc 50%, #818cf8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Rohit Rajeev
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.7 }}
          >
            I build frameworks, products, and mobile apps —{" "}
            <span className="text-gray-200">from low-code widget systems</span> to{" "}
            <span className="text-gray-200">shipped React Native apps.</span>
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
          >
            <a href="#projects"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-medium transition-all duration-200 hover:scale-105">
              View Projects
            </a>
            <a href="mailto:rohitrajeev02@gmail.com"
              className="px-6 py-3 border border-gray-700 hover:border-gray-500 hover:text-white text-gray-300 rounded-lg font-medium transition-all duration-200 hover:scale-105">
              Get in Touch
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <span className="text-xs tracking-widest uppercase text-gray-500">Scroll</span>
          <motion.div
            className="w-px h-10 bg-gradient-to-b from-gray-500 to-transparent"
            animate={{ scaleY: [1, 0.4, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </section>

      {/* ── About ── */}
      <section id="about" className="relative max-w-4xl mx-auto px-6 py-32">
        <SectionHeader eyebrow="About" title="A developer who ships." />
        <motion.div
          className="grid md:grid-cols-2 gap-10 text-gray-400 text-lg leading-relaxed"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <motion.p variants={fadeUp}>
            I&apos;m a full-stack developer based in India. At my day job, I architect
            a widget-based framework that lets teams build full websites from simple
            JSON configs — think low-code, but for developers.
          </motion.p>
          <motion.p variants={fadeUp} custom={0.1}>
            Outside of work, I build my own products. UsQuest is a React Native
            social app for couples and friend groups, currently in beta on the
            Play Store. I&apos;m interested in Web3, developer tooling, and building
            things that are actually used by real people.
          </motion.p>
        </motion.div>
      </section>

      {/* ── Projects ── */}
      <section id="projects" className="relative max-w-4xl mx-auto px-6 py-32">
        <SectionHeader eyebrow="Projects" title="Things I've shipped." />
        <motion.div
          className="flex flex-col gap-6"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </motion.div>
      </section>

      {/* ── Skills ── */}
      <section id="skills" className="relative max-w-4xl mx-auto px-6 py-32">
        <SectionHeader eyebrow="Skills" title="What I work with." />
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {SKILLS.map(({ category, items }, i) => (
            <motion.div
              key={category}
              variants={fadeUp}
              custom={i * 0.08}
              className="border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-colors duration-200"
              style={{ background: "rgba(255,255,255,0.02)", backdropFilter: "blur(8px)" }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <p className="text-indigo-400 text-xs font-medium uppercase tracking-widest mb-4">
                {category}
              </p>
              <ul className="flex flex-col gap-2">
                {items.map((item) => (
                  <li key={item} className="text-gray-300 text-sm">{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Contact ── */}
      <section
        id="contact"
        className="relative max-w-4xl mx-auto px-6 py-32"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <SectionHeader eyebrow="Contact" title="Let's work together." />
        <motion.p
          className="text-gray-400 text-lg mb-10 max-w-xl leading-relaxed"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          I&apos;m open to freelance projects, interesting collaborations, and good
          conversations. Reach out anytime.
        </motion.p>
        <motion.div
          className="flex flex-wrap gap-4"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {[
            { label: "Email Me", href: "mailto:rohitrajeev02@gmail.com", primary: true },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/rohit-rajeev-093564203/", primary: false },
            { label: "GitHub", href: "https://github.com/RR-007", primary: false },
          ].map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              variants={fadeUp}
              custom={i * 0.1}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                link.primary
                  ? "bg-indigo-600 hover:bg-indigo-500"
                  : "border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white"
              }`}
            >
              {link.label}
            </motion.a>
          ))}
        </motion.div>
      </section>

      {/* ── Footer ── */}
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
