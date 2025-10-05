import Image from "next/image";

export default function Hero() {
  return (
    <section className="container-section pt-16 sm:pt-24" aria-labelledby="hero-heading">
      <div className="grid md:grid-cols-2 gap-10 items-center min-h-[75vh] md:min-h-0 place-content-center">
        <div className="space-y-6 text-center md:text-left order-2 md:order-none">
          <h1 id="hero-heading" className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
            <span className="gradient-text">Awaab Mubashar Siddique</span>
          </h1>
          <p className="text-zinc-300/90 text-base sm:text-lg max-w-prose">
          A BSCS student with a strong interest in ML, AI and Data Science. I enjoy building practical solutions, from full-stack apps to machine learning projects, and aspire to create impactful tech products.
          </p>
          <div className="flex gap-3 justify-center md:justify-start">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-md bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 text-white font-medium glow transition-transform hover:scale-[1.02] active:scale-[.99]"
            >
              View Resume
            </a>
            <a
              href="#projects"
              className="px-5 py-2.5 rounded-md border border-white/15 text-white/90 hover:text-white hover:border-white/30 transition"
            >
              See Projects
            </a>
          </div>
        </div>
        <div className="relative order-1 md:order-none">
          <div className="relative mx-auto w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900 to-zinc-950 overflow-hidden glow">
            <Image
              src="/hero2.jpeg"
              alt="Portrait"
              fill
              sizes="(max-width: 768px) 192px, (max-width: 1024px) 224px, 256px"
              className="object-cover"
              priority={true}
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
          </div>
        </div>
      </div>
    </section>
  );
}


