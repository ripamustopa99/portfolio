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

export const techStackData: TechCategory[] = [
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
];
