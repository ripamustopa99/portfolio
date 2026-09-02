// lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getReadingTime(content: string, lang: string = "en"): string {
  const plainText = content.replace(/<[^>]*>?/gm, "");
  const words = plainText.trim().split(/\s+/).length;
  const wpm = 200;
  const minutes = Math.ceil(words / wpm);
  if (lang === "id") {
    return `${minutes} mnt baca`;
  }
  return `${minutes} min read`;
}
