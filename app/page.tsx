// app/page.tsx
import { Suspense } from "react";
import Hero from "@/components/sections/Hero";
import WhatIBuild from "@/components/sections/WhatIBuild";
import SelectedProjects from "@/components/sections/SelectedProjects";
import { SelectedProjectsSkeleton } from "@/components/ui/SelectedProjectsSkeleton";
import AboutSection from "@/components/sections/AboutSection";
import TechStack from "@/components/sections/TechStack";
import RecentNotes from "@/components/sections/RecentNotes";
import { RecentNotesSkeleton } from "@/components/ui/RecentNotesSkeleton";
import CallToAction from "@/components/sections/CallToAction";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatIBuild />
      <Suspense fallback={<SelectedProjectsSkeleton />}>
        <SelectedProjects />
      </Suspense>
      <AboutSection />
      <TechStack />
      <Suspense fallback={<RecentNotesSkeleton />}>
        <RecentNotes />
      </Suspense>
      <CallToAction />
    </>
  );
}
