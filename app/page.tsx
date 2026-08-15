// app/page.tsx
import Hero from "@/components/sections/Hero";
import WhatIBuild from "@/components/sections/WhatIBuild";
import SelectedProjects from "@/components/sections/SelectedProjects";
import AboutSection from "@/components/sections/AboutSection";
import TechStack from "@/components/sections/TechStack";
import RecentNotes from "@/components/sections/RecentNotes";
import CallToAction from "@/components/sections/CallToAction";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatIBuild />
      <SelectedProjects />
      <AboutSection />
      <TechStack />
      <RecentNotes />
      <CallToAction />
    </>
  );
}
