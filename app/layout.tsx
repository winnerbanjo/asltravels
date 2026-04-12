import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import { AppHeader } from "@/components/app-header";
import { AppProviders } from "@/components/app-providers";
import { getSession } from "@/lib/auth";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nile AI Studio",
  description: "Fix your product photo and make it look like a professional shoot.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const user = await getSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProviders initialUser={user}>
          <div className="min-h-screen bg-white">
            <AppHeader />
            {children}
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
