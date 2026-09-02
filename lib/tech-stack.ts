// lib/tech-stack.ts
export interface TechItem {
  name: string;
  level?: string;
  description?: string;
}

export interface TechCategory {
  title: string;
  description: string;
  items: TechItem[];
}

export const techStackData: Record<"en" | "id", TechCategory[]> = {
  en: [
    {
      title: "Frontend Development",
      description: "Building responsive and clean user interfaces.",
      items: [
        { name: "React / Next.js", description: "Modern React framework and component-based UI" },
        { name: "JavaScript / TypeScript", description: "Core web programming languages" },
        { name: "Tailwind CSS", description: "Utility-first CSS styling framework" },
        { name: "HTML5 / CSS3", description: "Foundational web markup and styling" },
      ],
    },
    {
      title: "Backend & Database",
      description: "Learning server-side programming and managing data storage.",
      items: [
        { name: "Node.js / Express", description: "JavaScript runtime and simple REST APIs" },
        { name: "PostgreSQL / MySQL", description: "Relational database management" },
        { name: "MongoDB", description: "NoSQL document database" },
        { name: "Prisma ORM", description: "Database connection and queries" },
      ],
    },
    {
      title: "Tools & Workflow",
      description: "Development tools and version control used in projects.",
      items: [
        { name: "Git & GitHub", description: "Version control and code collaboration" },
        { name: "VS Code", description: "Primary code editor and extensions" },
        { name: "Postman", description: "API testing and debugging" },
        { name: "Vercel", description: "Simple web deployment and hosting" },
      ],
    },
  ],
  id: [
    {
      title: "Pengembangan Frontend",
      description: "Membangun antarmuka pengguna yang responsif dan rapi.",
      items: [
        { name: "React / Next.js", description: "Framework React modern dan UI berbasis komponen" },
        { name: "JavaScript / TypeScript", description: "Bahasa pemrograman web dasar" },
        { name: "Tailwind CSS", description: "Framework styling CSS utility-first" },
        { name: "HTML5 / CSS3", description: "Markup dan styling web dasar" },
      ],
    },
    {
      title: "Backend & Database",
      description: "Mempelajari pemrograman sisi server dan mengelola penyimpanan data.",
      items: [
        { name: "Node.js / Express", description: "Runtime JavaScript dan REST API sederhana" },
        { name: "PostgreSQL / MySQL", description: "Manajemen database relasional" },
        { name: "MongoDB", description: "Database dokumen NoSQL" },
        { name: "Prisma ORM", description: "Koneksi dan kueri database" },
      ],
    },
    {
      title: "Alat & Alur Kerja",
      description: "Alat pengembangan dan kontrol versi yang digunakan dalam proyek.",
      items: [
        { name: "Git & GitHub", description: "Kontrol versi dan kolaborasi kode" },
        { name: "VS Code", description: "Editor kode utama dan ekstensi" },
        { name: "Postman", description: "Pengujian dan debugging API" },
        { name: "Vercel", description: "Deployment dan hosting web sederhana" },
      ],
    },
  ],
};
