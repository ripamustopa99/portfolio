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
    title: "Frontend Development",
    description: "Building responsive, accessible, and high-performance user interfaces.",
    items: [
      { name: "React / Next.js", description: "Server components, SSR, SSG" },
      { name: "TypeScript", description: "Type-safe robust application architecture" },
      { name: "Tailwind CSS", description: "Utility-first modern UI styling" },
      { name: "Framer Motion", description: "Fluid animations and micro-interactions" },
    ],
  },
  {
    title: "Backend & API",
    description: "Designing scalable backend services, microservices, and secure APIs.",
    items: [
      { name: "Node.js / Express", description: "RESTful APIs and microservices" },
      { name: "Go (Golang)", description: "High-concurrency backend services" },
      { name: "Python / FastAPI", description: "Fast asynchronous APIs and data processing" },
      { name: "GraphQL & REST", description: "Efficient client-server communication" },
    ],
  },
  {
    title: "Database & Storage",
    description: "Managing relational and non-relational data with performance and integrity.",
    items: [
      { name: "PostgreSQL", description: "Relational database design & indexing" },
      { name: "MongoDB", description: "NoSQL document storage and aggregation" },
      { name: "Redis", description: "Caching, rate limiting, and session stores" },
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
];
