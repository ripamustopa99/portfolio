// components/sections/Hero.tsx
"use client";

import { motion } from "framer-motion";
import GlowButton from "@/components/ui/GlowButton";
import ParallaxSection from "@/components/ui/ParallaxSection";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-16 overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container-custom relative z-10">
        <div className="max-w-3xl">
          <ParallaxSection offset={30}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <p className="font-mono text-sm text-accent mb-6 tracking-wide">
                SOFTWARE ENGINEER
              </p>
            </motion.div>
          </ParallaxSection>

          <ParallaxSection offset={20}>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-8 leading-[1.1]"
            >
              Building systems that
              <span className="block text-foreground-muted">
                scale with purpose.
              </span>
            </motion.h1>
          </ParallaxSection>

          <ParallaxSection offset={15}>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.2,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="text-lg text-foreground-muted mb-10 max-w-xl leading-relaxed"
            >
              I design and build software products with focus on architecture,
              developer experience, and measurable outcomes.
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
            className="flex flex-wrap gap-4"
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

      {/* Subtle glow accent */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
}
