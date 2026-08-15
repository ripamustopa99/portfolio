// app/layout.tsx
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import AppLayout from "@/components/ui/AppLayout";

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
  title: "Your Name — Software Engineer",
  description:
    "Product showcase of software engineering work. Architecture, frontend systems, and developer experience.",
  openGraph: {
    title: "Your Name — Software Engineer",
    description: "Product showcase of software engineering work.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen flex flex-col">
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
