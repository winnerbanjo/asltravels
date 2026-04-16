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
        <span className="rounded-full border border-[#D7E0EA] px-3 py-1 text-sm font-medium text-[#2563EB]">
          {isSignup ? "Start your agency" : "Welcome back"}
        </span>
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight text-[#0B1C2C]">
            {isSignup
              ? "Launch your branded travel business"
              : "Sign in to manage your agency"}
          </h1>
          <p className="max-w-md text-base leading-7 text-[#6B7280]">
            ASL gives you the infrastructure. You keep the brand, customer
            relationship, and margins.
          </p>
        </div>
        <div className="space-y-3 rounded-[1.5rem] border border-[#E5E7EB] bg-[linear-gradient(180deg,_#ffffff_0%,_#f8fbff_100%)] p-5">
          <p className="text-sm font-medium text-[#0B1C2C]">Included from day one</p>
          <ul className="space-y-2 text-sm text-[#6B7280]">
            <li>Branded booking website</li>
            <li>Flights, hotels, and car rentals</li>
            <li>Payments and markup controls</li>
          </ul>
        </div>
      </div>

      <div className="surface-card p-6 md:p-8">
        <form className="space-y-5" onSubmit={handleSubmit}>
          {isSignup ? (
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#0B1C2C]" htmlFor="name">
                Full name
              </label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={(event) =>
                  setForm((current) => ({ ...current, name: event.target.value }))
                }
                className="w-full rounded-xl border border-[#E5E7EB] px-4 py-3 outline-none transition focus:border-[#0B1C2C]"
                placeholder="Jane Okafor"
                required
              />
            </div>
          ) : null}

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#0B1C2C]" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(event) =>
                setForm((current) => ({ ...current, email: event.target.value }))
              }
              className="w-full rounded-xl border border-[#E5E7EB] px-4 py-3 outline-none transition focus:border-[#0B1C2C]"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#0B1C2C]" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={form.password}
              onChange={(event) =>
                setForm((current) => ({ ...current, password: event.target.value }))
              }
              className="w-full rounded-xl border border-[#E5E7EB] px-4 py-3 outline-none transition focus:border-[#0B1C2C]"
              placeholder="At least 8 characters"
              minLength={8}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center rounded-full bg-[#0B1C2C] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#132d46] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? isSignup
                ? "Creating account..."
                : "Logging in..."
              : isSignup
                ? "Start your agency"
                : "Log in"}
          </button>

          <p className="text-sm text-[#6B7280]">
            {isSignup ? "Already have an account?" : "Need an account?"}{" "}
            <Link
              href={isSignup ? "/login" : "/signup"}
              className="font-medium text-[#0B1C2C]"
            >
              {isSignup ? "Log in" : "Sign up"}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
