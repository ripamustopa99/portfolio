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
      description: "Building responsive, accessible, and high-performance user interfaces.",
      items: [
        { name: "React / Next.js", description: "Server components, SSR, SSG" },
        { name: "TypeScript", description: "Type-safe and robust application architecture" },
        { name: "Tailwind CSS", description: "Modern utility-first UI design" },
        { name: "Framer Motion", description: "Smooth animations and micro-interactions" },
      ],
    },
    {
      title: "Backend & APIs",
      description: "Designing scalable backend services, microservices architecture, and secure APIs.",
      items: [
        { name: "Node.js / Express", description: "RESTful APIs and microservices" },
        { name: "Go (Golang)", description: "High-concurrency backend services" },
        { name: "Python / FastAPI", description: "Fast asynchronous APIs and data processing" },
        { name: "GraphQL & REST", description: "Efficient client-server communication" },
      ],
    },
    {
      title: "Database & Storage",
      description: "Managing relational and non-relational data with high performance and integrity.",
      items: [
        { name: "PostgreSQL", description: "Relational database design & indexing" },
        { name: "MongoDB", description: "NoSQL document storage and aggregation" },
        { name: "Redis", description: "Caching, rate limiting, and session store" },
        { name: "Prisma ORM", description: "Type-safe database ORM and migrations" },
      ],
    },
    {
      title: "DevOps & Tools",
      description: "Automating deployment, testing, and infrastructure management.",
      items: [
        { name: "Docker & Kubernetes", description: "Containerization and orchestration" },
        { name: "Git & GitHub Actions", description: "CI/CD pipelines and version control" },
        { name: "AWS / Vercel", description: "Cloud infrastructure and serverless hosting" },
        { name: "Linux / Bash", description: "System administration and shell scripting" },
      ],
    },
  ],
  id: [
    {
      title: "Pengembangan Frontend",
      description: "Membangun antarmuka pengguna yang responsif, mudah diakses, dan berkinerja tinggi.",
      items: [
        { name: "React / Next.js", description: "Komponen server, SSR, SSG" },
        { name: "TypeScript", description: "Arsitektur aplikasi yang aman dan tangguh dengan tipe data" },
        { name: "Tailwind CSS", description: "Desain UI modern berbasis utility-first" },
        { name: "Framer Motion", description: "Animasi halus dan interaksi mikro" },
      ],
    },
    {
      title: "Backend & API",
      description: "Merancang layanan backend yang dapat diskala, arsitektur mikroservis, dan API yang aman.",
      items: [
        { name: "Node.js / Express", description: "RESTful API dan mikroservis" },
        { name: "Go (Golang)", description: "Layanan backend dengan konkurensi tinggi" },
        { name: "Python / FastAPI", description: "API asinkron cepat dan pemrosesan data" },
        { name: "GraphQL & REST", description: "Komunikasi klien-server yang efisien" },
      ],
    },
    {
      title: "Database & Penyimpanan",
      description: "Mengelola data relasional dan non-relasional dengan performa dan integritas tinggi.",
      items: [
        { name: "PostgreSQL", description: "Desain database relasional & pengindeksan" },
        { name: "MongoDB", description: "Penyimpanan dokumen NoSQL dan agregasi" },
        { name: "Redis", description: "Caching, rate limiting, dan penyimpanan sesi" },
        { name: "Prisma ORM", description: "ORM database yang aman dan migrasi data" },
      ],
    },
    {
      title: "DevOps & Alat",
      description: "Mengotomatiskan deployment, pengujian, dan manajemen infrastruktur.",
      items: [
        { name: "Docker & Kubernetes", description: "Containerisasi dan orkestrasi" },
        { name: "Git & GitHub Actions", description: "Pipeline CI/CD dan kontrol versi" },
        { name: "AWS / Vercel", description: "Infrastruktur cloud dan hosting serverless" },
        { name: "Linux / Bash", description: "Administrasi sistem dan shell scripting" },
      ],
    },
  ],
};
