// components/ui/ProjectCard.tsx
"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/types";
import Tag from "./Tag";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <Link
        href={`/projects/${project.slug}/`}
        className="group block"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative aspect-[16/9] mb-6 overflow-hidden rounded-none border border-border bg-background-elevated">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20 z-10" />

          {/* Thumbnail Image */}
          {project.thumbnail ? (
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className={`object-cover transition-transform duration-500 group-hover:scale-[1.02] ${
                project.animationVideoUrl && isHovered ? "opacity-0" : "opacity-100"
              }`}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-surface font-mono text-xs text-foreground-subtle">
              {project.title}
            </div>
          )}

          {/* Dribbble-style Optional Animation Video Preview on Hover */}
          {project.animationVideoUrl && (
            <video
              ref={videoRef}
              src={project.animationVideoUrl}
              loop
              muted
              playsInline
              preload="metadata"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            />
          )}

          <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="bg-background/90 backdrop-blur-sm p-2 rounded-none border border-border">
              <ArrowUpRight size={16} className="text-foreground" />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
              {project.title}
            </h3>
            <span className="text-foreground-subtle text-sm font-mono">
              {new Date(project.date).getFullYear()}
            </span>
          </div>

          <p className="text-foreground-muted line-clamp-2">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
