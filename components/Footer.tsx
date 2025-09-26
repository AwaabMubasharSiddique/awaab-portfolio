export default function Footer() {
  return (
    <footer className="mt-10 border-t border-white/10">
      <div className="container-section py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-400">
        <div className="flex items-center gap-4">
          <a href="https://github.com/AwaabMubasharSiddique" target="_blank" rel="noreferrer" className="hover:text-white transition">GitHub</a>
          <a href="https://www.linkedin.com/in/awaabmubasharsiddique/" target="_blank" rel="noreferrer" className="hover:text-white transition">LinkedIn</a>
          <a href="mailto:gr9awaab@gmail.com" className="hover:text-white transition">Email</a>
        </div>
        <p className="text-xs">© {new Date().getFullYear()} Awaab Mubashar Siddique</p>
      </div>
    </footer>
  );
}


