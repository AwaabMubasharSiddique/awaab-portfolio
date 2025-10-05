import Image from "next/image";

type Project = {
  title: string;
  description: string;
  href: string;
  imageSrc: string;
  imageAlt?: string;
};

const projects: Project[] = [
  {
    title: "Movie Recommendation System",
    description: "Machine learning–based movie recommendation system using collaborative filtering and content-based techniques to suggest relevant movies.",
    href: "#",
    imageSrc: "/projects/movie-recommend.jpg",
    imageAlt: "Movie Recommendation System",
  },
  {
    title: "Insurance Premium Category Predictor",
    description: "An insurance premium prediction app built with FastAPI and Streamlit that lets users input personal details to get real-time premium category predictions.",
    href: "#",
    imageSrc: "/projects/insurance.jpg",
  },
  {
    title: "Workout Buddy",
    description: "A simple MERN stack workout buddy app to log, track, and manage workouts.",
    href: "#",
    imageSrc: "/projects/workout.jpg",
  },
];

function ProjectCard({ title, description, href, imageSrc, imageAlt }: Project) {
  return (
    <div className="rounded-xl border border-white/10 bg-zinc-900/40 overflow-hidden group hover:border-white/20 transition">
      <div className="relative aspect-video bg-gradient-to-br from-zinc-800 to-zinc-900">
        <Image
          src={imageSrc}
          alt={imageAlt ?? title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          priority={false}
          unoptimized
        />
        <div className="absolute inset-0 ring-1 ring-white/10" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm text-zinc-400 mt-1">{description}</p>
        <a href={href} className="inline-block mt-3 text-sm px-3 py-1.5 rounded-md bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 text-white glow hover:scale-[1.02] active:scale-[.99] transition-transform">
          View Project
        </a>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="container-section">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 gradient-text">Projects</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {projects.map((p) => (
          <ProjectCard key={p.title} {...p} />
        ))}
      </div>
    </section>
  );
}


