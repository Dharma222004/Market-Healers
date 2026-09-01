"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { AppShell } from "@/components/app/AppShell";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const AUTH_PREFIXES = [
  "/dashboard",
  "/learn",
  "/ai-tools",
  "/markets",
  "/profile",
  "/settings",
  "/notifications",
  "/community",
  "/subscription",
];

export const AppShellWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();

  const isAppRoute = AUTH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix + "/")
  );

  if (isAppRoute) {
    return <AppShell>{children}</AppShell>;
  }

  return (
    <>
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </>
  );
};
