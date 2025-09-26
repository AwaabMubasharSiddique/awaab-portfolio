import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-section py-24 text-center">
      <h1 className="text-4xl font-bold gradient-text">Page not found</h1>
      <p className="text-zinc-400 mt-2">The page you are looking for does not exist.</p>
      <Link href="/" className="inline-block mt-6 px-4 py-2 rounded-md border border-white/20 hover:border-white/40 transition">Go home</Link>
    </div>
  );
}


