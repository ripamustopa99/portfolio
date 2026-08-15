// components/auth/LoginForm.tsx
"use client";

import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Loader2, CheckCircle2, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
        setTimeout(() => {
          router.push("/dashboard?welcome=true");
          router.refresh();
        }, 800);
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Invalid email or password.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-16 px-4 bg-background relative overflow-hidden">
      {/* Background ambient glow effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Back to Home Link */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-foreground-muted hover:text-accent transition-colors group"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            <span>BACK TO PORTFOLIO</span>
          </Link>
        </div>

        <ScrollReveal>
          <div className="bg-surface/50 border border-border rounded-2xl p-8 backdrop-blur-md shadow-2xl relative">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mx-auto mb-4 shadow-sm">
                <Lock size={22} />
              </div>
              <h1 className="text-2xl font-bold text-foreground tracking-tight">Welcome Back</h1>
              <p className="text-sm text-foreground-muted mt-1">
                Sign in to your account to continue
              </p>
            </div>

            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-8 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-lg font-bold text-foreground">Login Successful!</h3>
                <p className="text-sm text-foreground-muted">
                  Redirecting to your dashboard...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-start gap-3">
                    <ShieldAlert size={16} className="shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Email Field */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-foreground-muted">
                    Email Address <span className="text-accent">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground-muted">
                      <Mail size={16} />
                    </span>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="admin@example.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:border-accent transition-colors placeholder:text-foreground-subtle"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-xs font-mono uppercase tracking-wider text-foreground-muted">
                      Password <span className="text-accent">*</span>
                    </label>
                  </div>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground-muted">
                      <Lock size={16} />
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-11 py-3 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:border-accent transition-colors placeholder:text-foreground-subtle"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-foreground-muted hover:text-foreground transition-colors"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full py-3 rounded-xl bg-accent text-background font-semibold text-sm hover:opacity-90 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg shadow-accent/20 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <span>Sign In</span>
                  )}
                </button>
              </form>
            )}

            {/* Footer note */}
            <div className="mt-8 pt-6 border-t border-border text-center">
              <p className="text-xs text-foreground-muted">
                Default Seed: <span className="font-mono text-accent">admin@example.com</span> / <span className="font-mono text-accent">password123</span>
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
