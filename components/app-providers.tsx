"use client";

import type { ReactNode } from "react";
import { AuthProvider } from "@/components/auth-provider";
import { Toaster } from "react-hot-toast";
import { StudioProvider } from "@/components/studio-provider";
import type { AuthUser } from "@/lib/types";

export function AppProviders({
  children,
  initialUser,
}: {
  children: ReactNode;
  initialUser: AuthUser | null;
}) {
  return (
    <AuthProvider initialUser={initialUser}>
      <StudioProvider>
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              border: "1px solid #E5E7EB",
              background: "#FFFFFF",
              color: "#0A0A0A",
              boxShadow: "0 1px 2px rgba(10, 10, 10, 0.04)",
            },
          }}
        />
      </StudioProvider>
    </AuthProvider>
  );
}
