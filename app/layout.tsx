// app/layout.tsx
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import AppLayout from "@/components/ui/AppLayout";
import { LanguageProvider } from "@/lib/LanguageContext";
import { getLang } from "@/lib/get-lang";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ripa Mustopa A — Software Developer",
  description:
    "Product showcase of software development work. Architecture, frontend systems, and developer experience.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Ripa Mustopa A — Software Developer",
    description: "Product showcase of software development work.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ripa Mustopa A — Software Developer",
    description:
      "Product showcase of software development work. Architecture, frontend systems, and developer experience.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ripa Mustopa A",
  jobTitle: "Software Developer",
  url: "https://ripamustopa.dev",
  sameAs: [],
  knowsAbout: [
    "Software Engineering",
    "Full-Stack Development",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lang = (await getLang()) as "en" | "id";

  return (
    <html lang={lang} className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <LanguageProvider initialLanguage={lang}>
          <AppLayout>{children}</AppLayout>
        </LanguageProvider>
      </body>
    </html>
  );
}
