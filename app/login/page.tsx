// app/login/page.tsx
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import LoginForm from "@/components/auth/LoginForm";

export const metadata = {
  title: "Sign In — Portfolio",
  description: "Secure login to portfolio admin dashboard.",
};

export default async function LoginPage() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/dashboard");
  }

  return <LoginForm />;
}
