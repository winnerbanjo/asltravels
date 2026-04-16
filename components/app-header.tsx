"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AslLogo } from "@/components/asl-logo";
import { useAuth } from "@/components/auth-provider";
import { withBasePath } from "@/lib/client-paths";

const navLinks = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#platform", label: "Platform" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#partners", label: "Partners" },
];

export function AppHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, setUser } = useAuth();
  const isHome = pathname === "/";

  const handleLogout = async () => {
    const response = await fetch(withBasePath("/api/auth/logout"), { method: "POST" });

    if (!response.ok) {
      toast.error("Something went wrong. Please try again.");
      return;
    }

    setUser(null);
    router.refresh();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-30 border-b border-[#D8E0F3] bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-container items-center justify-between gap-4 px-6 py-4 md:px-10">
        <Link href="/" className="shrink-0">
          <AslLogo compact />
        </Link>

        {isHome ? (
          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-[#667085] transition hover:text-[#0B1C5A]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        ) : (
          <div className="hidden lg:block" />
        )}

        <div className="flex items-center gap-3">
          {isAuthenticated && user ? (
            <>
              {user.role === "admin" ? (
                <Link
                  href="/admin"
                  className="hidden rounded-full border border-[#D7E0EA] px-4 py-2 text-sm font-medium text-[#0B1C2C] transition hover:bg-[#F8FBFF] sm:inline-flex"
                >
                  Admin
                </Link>
              ) : (
                <Link
                  href="/"
                  className="hidden rounded-full border border-[#D7E0EA] px-4 py-2 text-sm font-medium text-[#0B1C2C] transition hover:bg-[#F8FBFF] sm:inline-flex"
                >
                  Merchant dashboard
                </Link>
              )}
              <div className="hidden text-right md:block">
                <p className="text-sm font-medium text-[#0B1C2C]">{user.name}</p>
                <p className="text-xs text-[#6B7280]">{user.email}</p>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center justify-center rounded-full border border-[#D7E0EA] px-4 py-2 text-sm font-medium text-[#0B1C2C] transition hover:bg-[#F8FBFF]"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="inline-flex items-center justify-center px-2 py-2 text-sm font-medium text-[#0B1C2C] transition hover:text-[#2563EB]"
              >
                Merchant login
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-full bg-[#1736B6] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#0F2D9C]"
              >
                Create merchant account
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
