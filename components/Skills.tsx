type SkillCardProps = {
  title: string;
  skills: string[];
};

function SkillCard({ title, skills }: SkillCardProps) {
  return (
    <div className="relative rounded-xl border border-white/10 bg-zinc-900/40 p-6 hover:border-white/20 transition group overflow-hidden">
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none bg-gradient-to-br from-fuchsia-600/15 via-purple-600/10 to-cyan-400/10" />
      <h3 className="text-lg font-semibold mb-4 text-white">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((s) => (
          <span
            key={s}
            className="text-xs px-3 py-1 rounded-full border border-white/10 text-white/90 hover:text-white hover:border-white/30 transition bg-zinc-800/50 hover:bg-zinc-800/80"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="container-section">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 gradient-text">Skills</h2>
      <div className="grid md:grid-cols-3 gap-4">
        <SkillCard title="Frontend" skills={["React", "HTML", "CSS", "Tailwind CSS"]} />
        <SkillCard title="Backend" skills={["FastAPI","Node.js", "Express", "MongoDB" ]} />
        <SkillCard title="Others" skills={["Python", "JavaScript", "Docker", "Github"]} />
      </div>
    </section>
  );
}


