import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AnimatedBackground from "@/components/AnimatedBackground";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Awaab Mubashar Siddique | Portfolio",
  description: "Portfolio of Awaab Mubashar Siddique - Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased bg-[#0b0b12] text-zinc-200`}> 
        <AnimatedBackground />
        <div className="min-h-screen flex flex-col">
          {/* Navbar */}
          <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/30 border-b border-white/10">
            <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
              <a href="#home" className="text-sm font-semibold tracking-wider text-white">Awaab.dev</a>
              <nav className="hidden sm:flex items-center gap-6 text-sm">
                <a href="#skills" className="hover:text-white/90 transition-colors">Skills</a>
                <a href="#projects" className="hover:text-white/90 transition-colors">Projects</a>
                <a href="#contact" className="hover:text-white/90 transition-colors">Contact</a>
                <a href="/resume.pdf" target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-md bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 text-white shadow-[0_0_20px_rgba(168,85,247,.35)] hover:scale-[1.02] active:scale-[.99] transition-transform">View Resume</a>
              </nav>
            </div>
          </header>
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
