"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/components/auth-provider";
import { withBasePath } from "@/lib/client-paths";
import type { AuthUser } from "@/lib/types";

type AuthFormProps = {
  mode: "login" | "signup";
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const isSignup = mode === "signup";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(withBasePath(`/api/auth/${mode}`), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const payload = (await response.json()) as {
        error?: string;
        user?: AuthUser;
      };

      if (!response.ok || !payload.user) {
        throw new Error(payload.error || "Something went wrong.");
      }

      setUser(payload.user);
      toast.success(isSignup ? "Account created." : "Logged in.");
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
      <div className="space-y-6">
        <span className="rounded-full border border-gray-200 px-3 py-1 text-sm font-medium text-gray-600">
          {isSignup ? "Create account" : "Welcome back"}
        </span>
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight text-[#0A0A0A]">
            {isSignup
              ? "Start designing without the guesswork"
              : "Pick up where you left off"}
          </h1>
          <p className="max-w-md text-base text-gray-500">
            Nile keeps the workflow simple: upload, choose a clean preset, and get client-ready visuals fast.
          </p>
        </div>
        <div className="space-y-3 rounded-xl border border-gray-200 bg-gray-50 p-5">
          <p className="text-sm font-medium text-[#0A0A0A]">Built for everyday designers</p>
          <ul className="space-y-2 text-sm text-gray-500">
            <li>Save edits to your account</li>
            <li>Reuse color and studio presets quickly</li>
            <li>No prompts, no technical setup</li>
          </ul>
        </div>
      </div>

      <div className="surface-card p-6 md:p-8">
        <form className="space-y-5" onSubmit={handleSubmit}>
          {isSignup ? (
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#0A0A0A]" htmlFor="name">
                Full name
              </label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={(event) =>
                  setForm((current) => ({ ...current, name: event.target.value }))
                }
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-black"
                placeholder="Jane Designer"
                required
              />
            </div>
          ) : null}

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#0A0A0A]" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(event) =>
                setForm((current) => ({ ...current, email: event.target.value }))
              }
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-black"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#0A0A0A]" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={form.password}
              onChange={(event) =>
                setForm((current) => ({ ...current, password: event.target.value }))
              }
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-black"
              placeholder="At least 8 characters"
              minLength={8}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center rounded-lg bg-black px-5 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? isSignup
                ? "Creating account..."
                : "Logging in..."
              : isSignup
                ? "Create account"
                : "Log in"}
          </button>

          <p className="text-sm text-gray-500">
            {isSignup ? "Already have an account?" : "Need an account?"}{" "}
            <Link
              href={isSignup ? "/login" : "/signup"}
              className="font-medium text-[#0A0A0A]"
            >
              {isSignup ? "Log in" : "Sign up"}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
