import type { Metadata } from "next";
import { Fraunces, Caveat, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const jetMono = JetBrains_Mono({
  variable: "--font-jet",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://awaab.dev";
const DESCRIPTION =
  "Software engineer building and deploying production AI systems: agentic workflows, RAG pipelines, FastAPI backends and document/media automation.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Awaab Mubashar Siddique · Software Engineer",
    template: "%s · Awaab Mubashar Siddique",
  },
  description: DESCRIPTION,
  keywords: [
    "Awaab Mubashar Siddique",
    "Software Engineer",
    "AI Engineer",
    "Agentic AI",
    "RAG",
    "LangGraph",
    "FastAPI",
    "Machine Learning",
    "Karachi",
  ],
  authors: [{ name: "Awaab Mubashar Siddique", url: SITE_URL }],
  creator: "Awaab Mubashar Siddique",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Awaab Mubashar Siddique · Software Engineer",
    description: DESCRIPTION,
    siteName: "Awaab Mubashar Siddique",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Awaab Mubashar Siddique · Software Engineer",
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

const PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Awaab Mubashar Siddique",
  url: SITE_URL,
  email: "mailto:gr9awaab@gmail.com",
  jobTitle: "Software Engineer",
  worksFor: { "@type": "Organization", name: "AppCraftr" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Iqra University, Karachi" },
  address: { "@type": "PostalAddress", addressLocality: "Karachi", addressCountry: "PK" },
  knowsAbout: [
    "Agentic AI",
    "Generative AI",
    "Retrieval-Augmented Generation",
    "Backend Development",
    "Full-Stack Development",
  ],
  sameAs: [
    "https://github.com/AwaabMubasharSiddique",
    "https://www.linkedin.com/in/awaabmubasharsiddique/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${caveat.variable} ${jetMono.variable} bg-paper text-ink antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_SCHEMA) }}
        />
        {children}
      </body>
    </html>
  );
}
