import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="stamp -rotate-2">Error 404</p>
      <h1 className="wonk text-5xl font-bold tracking-tight">
        Page <span className="italic text-forest">not found</span>.
      </h1>
      <p className="font-hand text-2xl text-mute">
        this page doesn&apos;t exist
      </p>
      <Link
        href="/"
        className="btn-ink px-6 py-2.5 font-mono text-xs font-semibold uppercase tracking-[0.25em]"
      >
        Take me home
      </Link>
    </div>
  );
}
