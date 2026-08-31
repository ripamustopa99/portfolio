// lib/get-lang.ts
import { cookies } from "next/headers";

export async function getLang(): Promise<string> {
  try {
    const cookieStore = await cookies();
    return cookieStore.get("portfolio_lang")?.value || "en";
  } catch {
    return "en";
  }
}
