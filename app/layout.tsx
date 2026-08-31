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
  openGraph: {
    title: "Ripa Mustopa A — Software Developer",
    description: "Product showcase of software development work.",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lang = (await getLang()) as "en" | "id";

  return (
    <html lang={lang} className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen flex flex-col">
        <LanguageProvider initialLanguage={lang}>
          <AppLayout>{children}</AppLayout>
        </LanguageProvider>
      </body>
    </html>
  );
}
