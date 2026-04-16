import Link from "next/link";
import { AslLogo } from "@/components/asl-logo";

const navLinks = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#platform", label: "Platform" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/knowledge-base", label: "Knowledge base" },
  { href: "/#partners", label: "Partners" },
];

export function AppHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-[#D8E0F3] bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-container items-center justify-between gap-4 px-6 py-4 md:px-10">
        <Link href="/" className="shrink-0">
          <AslLogo compact />
        </Link>

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

        <div className="flex items-center gap-3">
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
        </div>
      </div>
    </header>
  );
}
