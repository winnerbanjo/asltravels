import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import { AppHeader } from "@/components/app-header";
import { AppProviders } from "@/components/app-providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ASL Travels",
  description: "Launch a fully branded travel agency in minutes with booking infrastructure, payments, and operations already handled.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProviders initialUser={null}>
          <div className="min-h-screen bg-white">
            <AppHeader />
            {children}
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
