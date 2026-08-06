// app/page.tsx
import Hero from "@/components/sections/Hero";
import SelectedProjects from "@/components/sections/SelectedProjects";
import RecentNotes from "@/components/sections/RecentNotes";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SelectedProjects />
      <RecentNotes />
    </>
  );
}
