// components/sections/Hero.tsx
"use client";

import { motion } from "framer-motion";
import GlowButton from "@/components/ui/GlowButton";
import ParallaxSection from "@/components/ui/ParallaxSection";

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center pt-48 pb-24 overflow-hidden">
      {/* Subtle Neon Radial Glow Background at bottom-left */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-accent/[0.08] rounded-none blur-[150px] pointer-events-none" />

      <div className="container-custom relative z-10 w-full">
        <div className="max-w-3xl space-y-8 text-left">
          <ParallaxSection offset={20}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
                // SOFTWARE DEVELOPER & SYSTEM ARCHITECT
              </span>
            </motion.div>
          </ParallaxSection>

          <ParallaxSection offset={15}>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.08]"
            >
              Membangun sistem
              <span className="block text-gradient mt-3">
                berkinerja tinggi.
              </span>
            </motion.h1>
          </ParallaxSection>

          <ParallaxSection offset={10}>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.2,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="text-base sm:text-lg text-foreground-muted max-w-2xl leading-relaxed"
            >
              Merancang aplikasi web berkinerja tinggi dan arsitektur backend berskala luas dengan kode bersih, teknologi modern, dan dampak nyata.
            </motion.p>
          </ParallaxSection>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.3,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="flex flex-wrap items-center justify-start gap-4 pt-4"
          >
            <GlowButton href="/projects/" variant="primary">
              View Projects
            </GlowButton>
            <GlowButton href="/contact/" variant="secondary">
              Get in Touch
            </GlowButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
