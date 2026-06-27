import Image from "next/image";
import Effects from "@/components/Effects";
import Contact from "@/components/Contact";

const NAV = [
  ["about", "About"],
  ["experience", "Experience"],
  ["projects", "Projects"],
  ["skills", "Toolbox"],
  ["contact", "Say hi"],
] as const;

const SOCIALS = [
  ["GitHub", "https://github.com/AwaabMubasharSiddique"],
  ["LinkedIn", "https://www.linkedin.com/in/awaabmubasharsiddique/"],
  ["Email", "mailto:gr9awaab@gmail.com"],
] as const;

const PROJECTS = [
  {
    title: "SpeechFindr",
    description:
      "An AI web app that turns YouTube videos and uploaded media into searchable, timestamped transcripts with summaries, chapters, Q&A, translation and text-to-speech. Cascading transcription pipeline (native, then auto captions, then Groq Whisper) with parallel chunking and SHA-256 caching.",
    note: "final year project",
    tags: ["FastAPI", "Groq Whisper", "RAG", "Edge-TTS"],
    href: "https://github.com/AwaabMubasharSiddique",
  },
  {
    title: "Restaurant AI Assistant",
    description:
      "A multi-intent LangGraph agent that handles reservations, orders and menu queries through conditional routing. Real-time availability checks with a human-in-the-loop confirmation flow, plus RAG over the menu and FAQs.",
    note: "multi-intent agent",
    tags: ["LangGraph", "ChromaDB", "FastAPI", "React"],
    href: "https://github.com/AwaabMubasharSiddique",
  },
  {
    title: "AI Invoice Data Extractor",
    description:
      "Pulls structured data (vendor, line items, totals) from PDF and scanned invoices using OpenAI models with Pydantic-validated output. An automated layer verifies totals and flags low-confidence extractions for human review, then exports clean Excel.",
    note: "structured extraction",
    tags: ["OpenAI", "Pydantic", "Docker"],
    href: "https://github.com/AwaabMubasharSiddique",
  },
];

const SKILL_GROUPS = [
  { label: "Languages", items: ["Python", "JavaScript", "SQL"] },
  {
    label: "AI / ML",
    items: ["LangChain", "LangGraph", "RAG", "FAISS", "ChromaDB", "Pydantic", "Scikit-learn", "TensorFlow", "Claude"],
  },
  {
    label: "Frameworks",
    items: ["FastAPI", "React.js", "React Native", "Node.js", "Streamlit"],
  },
  { label: "Data", items: ["Pandas", "NumPy", "Matplotlib", "Seaborn"] },
  { label: "Databases", items: ["PostgreSQL", "MySQL", "MongoDB"] },
  {
    label: "Tools & Deployment",
    items: ["Git", "GitHub", "Docker", "Railway", "Supabase", "Vercel"],
  },
];

const TICKER = [
  "Open to AI / ML roles",
  "Agentic AI & RAG",
  "Backend development",
  "Karachi, PK",
  "BSCS · Iqra University",
];

function Squiggle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 12" className={className} aria-hidden fill="none">
      <path
        d="M2 8 Q 12 2, 22 7 T 42 7 T 62 7 T 82 7 T 102 7 T 118 5"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M12 2 L13.6 8.9 L21 10.5 L13.6 12.1 L12 19 L10.4 12.1 L3 10.5 L10.4 8.9 Z" />
    </svg>
  );
}

function SectionHeading({ n, title }: { n: string; title: string }) {
  return (
    <div className="sticky top-0 z-20 -mx-6 mb-10 bg-paper/95 px-6 py-4 sm:-mx-10 sm:px-10 lg:static lg:mx-0 lg:mb-12 lg:bg-transparent lg:p-0">
      <div className="flex items-center gap-4">
        <span className="stamp -rotate-2">No. {n}</span>
        <h2 className="wonk text-3xl font-bold italic tracking-tight sm:text-4xl">
          {title}
        </h2>
        <Squiggle className="hidden w-20 text-leaf sm:block" />
      </div>
    </div>
  );
}

function Tags({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((tag, i) => (
        <li
          key={tag}
          className={`border-[1.5px] border-ink bg-card px-2.5 py-0.5 font-mono text-[11px] ${
            i % 2 ? "rotate-[0.6deg]" : "-rotate-[0.6deg]"
          }`}
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  return (
    <>
      <Effects />
      <div id="top" className="relative z-10 mx-auto max-w-6xl px-6 sm:px-10 lg:px-12">
        <div className="lg:flex lg:gap-16">
          {/* Identity panel */}
          <header className="no-scrollbar pt-16 lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[42%] lg:flex-col lg:justify-between lg:overflow-y-auto lg:py-10">
            <div>
              <p className="rise stamp rotate-[-2deg]">
                Software Engineer @ AppCraftr · since Feb 2026
              </p>
              <h1 className="wonk hero-name mt-6 text-5xl font-black leading-[1.02] tracking-tight sm:text-6xl">
                <span data-scramble className="rise block">
                  Awaab
                </span>
                <span
                  data-scramble
                  className="rise block italic text-forest"
                  style={{ animationDelay: "100ms" }}
                >
                  Mubashar
                </span>
                <span
                  data-scramble
                  className="rise block"
                  style={{ animationDelay: "200ms" }}
                >
                  Siddique<span className="text-leaf">.</span>
                </span>
              </h1>
              <Squiggle className="rise mt-3 w-32 text-leaf" />
              <p
                className="rise mt-5 text-xl"
                style={{ animationDelay: "320ms" }}
              >
                I make{" "}
                <span className="rotator font-bold italic text-forest">
                  <span>
                    <span>AI agents.</span>
                    <span>RAG pipelines.</span>
                    <span>FastAPI backends.</span>
                    <span>ML models.</span>
                    <span>AI agents.</span>
                  </span>
                </span>
              </p>
              <p
                className="rise mt-4 max-w-sm leading-relaxed text-mute"
                style={{ animationDelay: "400ms" }}
              >
                I build and deploy production AI systems: agentic workflows,
                RAG pipelines, and document and media automation. Final-year
                BSCS student based in Karachi.
              </p>
              <nav className="hero-nav mt-10 hidden lg:block" aria-label="Sections">
                <ul className="space-y-3">
                  {NAV.map(([id, label], i) => (
                    <li key={id}>
                      <a
                        data-nav
                        href={`#${id}`}
                        className="group flex items-center gap-4 transition-colors"
                      >
                        <span className="nav-line" />
                        <span className="font-mono text-[11px] uppercase tracking-[0.3em]">
                          {String(i + 1).padStart(2, "0")}&ensp;{label}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 lg:mt-8 lg:shrink-0">
              {SOCIALS.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noreferrer"
                  className="font-mono text-xs uppercase tracking-[0.25em] text-mute underline decoration-leaf decoration-2 underline-offset-4 transition-colors hover:text-forest"
                >
                  {label}
                </a>
              ))}
              <a
                data-magnet
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="btn-ink px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-[0.25em]"
              >
                Resume ↗
              </a>
            </div>
          </header>

          {/* Content */}
          <main className="pb-10 pt-20 lg:w-[58%] lg:pt-20">
            <section id="about" aria-label="About" className="scroll-mt-16">
              <SectionHeading n="01" title="About, briefly" />
              <div data-reveal className="grid gap-10 sm:grid-cols-[1fr_auto]">
                <div className="space-y-4 leading-relaxed">
                  <p>
                    I&apos;m Awaab, a software engineer at{" "}
                    <span className="hl font-semibold">AppCraftr</span>, where
                    I ship features across a production codebase: FastAPI
                    backends and a React admin dashboard. The other half of my
                    week goes to finishing my BSCS at Iqra University
                    (CGPA 3.4).
                  </p>
                  <p className="text-mute">
                    My focus is{" "}
                    <span className="hl font-semibold text-ink">
                      applied AI
                    </span>{" "}
                    behind real interfaces: end-to-end agentic workflows, RAG
                    pipelines, and document and media automation. I care about
                    building systems that are reliable enough to put in front
                    of real users.
                  </p>
                </div>
                <div className="justify-self-center">
                  <div
                    data-tilt
                    className="relative w-44 rotate-[-3deg] border-[1.5px] border-ink bg-white p-2 pb-3 shadow-[6px_6px_0_rgba(23,28,23,0.85)]"
                  >
                    <span className="tape -top-3 left-1/2 -translate-x-1/2 rotate-[-4deg]" />
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <Image
                        src="/hero2.jpeg"
                        alt="Portrait of Awaab Mubashar Siddique"
                        fill
                        sizes="176px"
                        className="object-cover"
                        priority
                      />
                    </div>
                    <p className="font-hand mt-2 text-center text-lg leading-none text-mute">
                      that&apos;s me
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section id="experience" aria-label="Experience" className="mt-24 scroll-mt-16">
              <SectionHeading n="02" title="Where I've been" />
              <div className="space-y-8">
                <article data-reveal data-tilt className="card-ink rotate-[-0.4deg] p-7">
                  <span className="stamp rotate-1">Since Feb 2026</span>
                  <h3 className="wonk mt-4 text-2xl font-bold">
                    Software Engineer ·{" "}
                    <span className="italic text-forest">AppCraftr</span>
                  </h3>
                  <p className="mt-3 leading-relaxed text-mute">
                    Developing features and resolving bugs across a production
                    codebase, building and maintaining FastAPI backend APIs
                    and a React-based admin dashboard. Shipping to real users,
                    learning at production speed.
                  </p>
                  <div className="mt-5">
                    <Tags items={["FastAPI", "React", "Python", "REST APIs"]} />
                  </div>
                </article>
                <article data-reveal data-tilt className="card-ink rotate-[0.4deg] p-7">
                  <span className="stamp -rotate-1">Class of 2026</span>
                  <h3 className="wonk mt-4 text-2xl font-bold">
                    BSCS ·{" "}
                    <span className="italic text-forest">Iqra University</span>
                    , Karachi
                  </h3>
                  <p className="mt-3 leading-relaxed text-mute">
                    Machine learning, generative AI, data science, software
                    engineering and web development. Expected graduation July
                    2026, CGPA 3.4.
                  </p>
                </article>
              </div>
            </section>

            <section id="projects" aria-label="Projects" className="mt-24 scroll-mt-16">
              <SectionHeading n="03" title="Things I've built" />
              <ul data-reveal className="group/list border-b-[1.5px] border-ink/20">
                {PROJECTS.map((project, i) => (
                  <li key={project.title}>
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group -mx-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-4 border-t-[1.5px] border-ink/20 px-4 py-8 transition-[opacity,background-color] duration-300 hover:bg-high/30 hover:!opacity-100 group-hover/list:opacity-40"
                    >
                      <span className="font-mono text-xs text-mute">
                        0{i + 1}
                      </span>
                      <span>
                        <span className="flex flex-wrap items-baseline gap-x-3">
                          <span className="wonk text-2xl font-bold transition-colors group-hover:text-forest">
                            {project.title}
                          </span>
                          <span
                            aria-hidden
                            className="text-sm text-mute transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-forest"
                          >
                            ↗
                          </span>
                          <span className="font-hand text-lg text-leaf">
                            {project.note}
                          </span>
                        </span>
                        <span className="mt-2 block leading-relaxed text-mute">
                          {project.description}
                        </span>
                        <span className="mt-4 block">
                          <Tags items={project.tags} />
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <section id="skills" aria-label="Toolbox" className="mt-24 scroll-mt-16">
              <SectionHeading n="04" title="The toolbox" />
              <div data-reveal className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
                {SKILL_GROUPS.map((group) => (
                  <div key={group.label}>
                    <h3 className="mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-forest">
                      <Sparkle className="h-3 w-3 text-leaf" />
                      {group.label}
                    </h3>
                    <ul className="flex flex-wrap gap-2.5">
                      {group.items.map((skill, i) => (
                        <li
                          key={skill}
                          className={`border-[1.5px] border-ink bg-card px-3 py-1 text-sm shadow-[2px_2px_0_rgba(23,28,23,0.8)] transition-all hover:bg-high hover:shadow-[3px_3px_0_rgba(29,74,54,0.9)] ${
                            i % 2 ? "rotate-[0.5deg]" : "-rotate-[0.5deg]"
                          }`}
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p data-reveal className="font-hand mt-8 text-xl text-mute">
                always adding to it
              </p>
            </section>

            <div
              aria-hidden
              className="my-24 -mx-8 rotate-[-1.5deg] overflow-hidden border-y-2 border-ink bg-forest py-4 sm:-mx-12"
            >
              <div className="marquee-track flex">
                {[0, 1].map((copy) => (
                  <div
                    key={copy}
                    className="flex shrink-0 items-center font-mono text-sm font-bold uppercase tracking-[0.3em] text-paper"
                  >
                    {TICKER.map((item) => (
                      <span key={item} className="flex items-center">
                        <span className="px-8">{item}</span>
                        <Sparkle className="h-4 w-4 text-high" />
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <section id="contact" aria-label="Contact" className="scroll-mt-16">
              <SectionHeading n="05" title="Say hi" />
              <div data-reveal>
                <p className="wonk max-w-lg text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                  Have a role, a project, or a{" "}
                  <span className="italic text-forest">question</span>?
                </p>
                <p className="font-hand mt-4 text-2xl text-leaf">
                  drop me a message below ↓
                </p>
                <div className="mt-10">
                  <Contact />
                </div>
                <p className="mt-8 text-mute">
                  Or skip the form:{" "}
                  <a
                    href="mailto:gr9awaab@gmail.com"
                    className="font-semibold text-forest underline decoration-leaf decoration-2 underline-offset-4"
                  >
                    gr9awaab@gmail.com
                  </a>
                </p>
              </div>
            </section>

            <a
              id="to-top"
              href="#top"
              aria-label="Back to top"
              className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center border-[1.5px] border-ink bg-card text-ink shadow-[3px_3px_0_#171c17] hover:bg-high"
            >
              ↑
            </a>

            <footer className="mt-24 flex flex-wrap items-center justify-between gap-4 border-t-[1.5px] border-ink/20 py-10 font-mono text-[11px] uppercase tracking-[0.2em] text-mute">
              <p>© {new Date().getFullYear()} Awaab Mubashar Siddique</p>
              <p>Built in Karachi</p>
            </footer>
          </main>
        </div>
      </div>
    </>
  );
}
