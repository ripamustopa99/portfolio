// components/sections/ContactForm.tsx
"use client";

import { useState } from "react";
import { Mail, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { trackEvent } from "@/lib/analytics";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    botcheck: "", // Honeypot anti-spam
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Anti-spam honeypot check
    if (formData.botcheck) {
      setStatus("success"); // Silently pass for bots
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "YOUR_ACCESS_KEY_HERE",
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `New message from ${formData.name} via Portfolio`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        trackEvent("contact_form_submitted");
        setFormData({ name: "", email: "", message: "", botcheck: "" });
      } else {
        setStatus("error");
        setErrorMessage(result.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  };

  return (
    <div className="pt-32 pb-24 min-h-[85vh] flex items-center">
      <div className="container-custom max-w-[1100px]">
        <ScrollReveal>
          <div className="mb-12">
            <p className="font-mono text-sm text-accent mb-3 tracking-wide">GET IN TOUCH</p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Let&apos;s work together
            </h1>
            <p className="text-foreground-muted max-w-xl text-base leading-relaxed">
              I&apos;m currently open for new opportunities and interesting projects. Have a question or want to collaborate? Feel free to reach out.
            </p>
          </div>
        </ScrollReveal>

        {/* Side-by-side Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Info & Social Links */}
          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal delay={0.1}>
              <div className="bg-surface/40 border border-border rounded-2xl p-6 sm:p-8 backdrop-blur-sm space-y-6 shadow-sm">
                <div>
                  <h3 className="text-sm font-mono uppercase tracking-wider text-foreground font-semibold mb-2">
                    Direct Contact
                  </h3>
                  <p className="text-sm text-foreground-muted">
                    Prefer emailing directly? Reach me at:
                  </p>
                  <a
                    href={`mailto:${siteConfig.social.email}`}
                    className="inline-flex items-center gap-2 mt-3 text-sm font-medium text-foreground hover:text-accent transition-colors"
                  >
                    <Mail size={16} className="text-accent" />
                    <span>{siteConfig.social.email}</span>
                  </a>
                </div>

                <div className="pt-6 border-t border-border">
                  <h3 className="text-sm font-mono uppercase tracking-wider text-foreground font-semibold mb-4">
                    Social Profiles
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {/* GitHub */}
                    <a
                      href={siteConfig.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl bg-surface border border-border hover:border-accent hover:text-accent transition-all duration-200 group text-left"
                    >
                      <svg className="w-4 h-4 fill-current text-foreground-muted group-hover:text-accent transition-colors shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                      <span className="text-xs font-medium text-foreground">GitHub</span>
                    </a>

                    {/* LinkedIn */}
                    <a
                      href={siteConfig.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl bg-surface border border-border hover:border-accent hover:text-accent transition-all duration-200 group text-left"
                    >
                      <svg className="w-4 h-4 fill-current text-foreground-muted group-hover:text-accent transition-colors shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                      <span className="text-xs font-medium text-foreground">LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <ScrollReveal delay={0.2}>
              <div className="bg-surface/50 border border-border rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-xl">
                {status === "success" ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
                    <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                      <CheckCircle2 size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">Message Sent Successfully!</h3>
                    <p className="text-sm text-foreground-muted max-w-md leading-relaxed">
                      Thank you for reaching out. I have received your message and will get back to you as soon as possible.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-4 px-6 py-2.5 rounded-xl bg-surface border border-border text-xs font-medium text-foreground hover:border-accent transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Honeypot Spam Protection */}
                    <input
                      type="checkbox"
                      name="botcheck"
                      value={formData.botcheck}
                      onChange={handleChange}
                      className="hidden"
                      style={{ display: "none" }}
                      aria-hidden="true"
                    />

                    <div className="space-y-1.5">
                      <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider text-foreground-muted">
                        Your Name <span className="text-accent">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:border-accent transition-colors placeholder:text-foreground-subtle"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-foreground-muted">
                        Your Email <span className="text-accent">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:border-accent transition-colors placeholder:text-foreground-subtle"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-foreground-muted">
                        Your Message <span className="text-accent">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Hello, I'd like to discuss a project..."
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:border-accent transition-colors placeholder:text-foreground-subtle resize-none"
                      />
                    </div>

                    {status === "error" && (
                      <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                        <AlertCircle size={16} className="shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-foreground text-background font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer shadow-lg mt-2"
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
