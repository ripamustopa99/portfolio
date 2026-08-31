// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const prisma = new PrismaClient();

async function main() {
  const email = "ripamustopa99@gmail.com";
  const password = "12";
  const passwordHash = await bcrypt.hash(password, 12);

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    await prisma.user.update({
      where: { email },
      data: { passwordHash, passwordChangedAt: new Date() },
    });
    console.log(`Admin user updated: ${email}`);
  } else {
    await prisma.user.create({
      data: {
        email,
        passwordHash,
        passwordChangedAt: new Date(),
      },
    });
    console.log(`Admin user created: ${email}`);
  }

  // Seed Projects
  const projectsDir = path.join(process.cwd(), "content/projects");
  if (fs.existsSync(projectsDir)) {
    const files = fs.readdirSync(projectsDir).filter(f => f.endsWith(".md"));
    for (const file of files) {
      // file format: slug.lang.md (e.g. undangan-dig.en.md or undangan-dig.id.md)
      const parts = file.replace(/\.md$/, "").split(".");
      const lang = parts.pop() || "en";
      const slug = parts.join(".");

      const fullPath = path.join(projectsDir, file);
      const fileContent = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContent);

      await prisma.project.upsert({
        where: { slug_language: { slug, language: lang } },
        update: {
          title: data.title || slug,
          description: data.description || "",
          date: data.date ? new Date(data.date) : new Date(),
          thumbnail: data.thumbnail || "",
          tags: data.tags || [],
          techStack: JSON.stringify(data.techStack || []),
          links: JSON.stringify(data.links || {}),
          featured: Boolean(data.featured),
          content: content || "",
        },
        create: {
          slug,
          language: lang,
          title: data.title || slug,
          description: data.description || "",
          date: data.date ? new Date(data.date) : new Date(),
          thumbnail: data.thumbnail || "",
          tags: data.tags || [],
          techStack: JSON.stringify(data.techStack || []),
          links: JSON.stringify(data.links || {}),
          featured: Boolean(data.featured),
          content: content || "",
        },
      });
      console.log(`Seeded project: ${slug} (${lang})`);
    }
  }

  // Seed Notes
  const notesDir = path.join(process.cwd(), "content/notes");
  if (fs.existsSync(notesDir)) {
    const files = fs.readdirSync(notesDir).filter(f => f.endsWith(".md"));
    for (const file of files) {
      const parts = file.replace(/\.md$/, "").split(".");
      const lang = parts.pop() || "en";
      const slug = parts.join(".");

      const fullPath = path.join(notesDir, file);
      const fileContent = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContent);

      await prisma.note.upsert({
        where: { slug_language: { slug, language: lang } },
        update: {
          title: data.title || slug,
          description: data.description || "",
          date: data.date ? new Date(data.date) : new Date(),
          tags: data.tags || [],
          content: content || "",
        },
        create: {
          slug,
          language: lang,
          title: data.title || slug,
          description: data.description || "",
          date: data.date ? new Date(data.date) : new Date(),
          tags: data.tags || [],
          content: content || "",
        },
      });
      console.log(`Seeded note: ${slug} (${lang})`);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
