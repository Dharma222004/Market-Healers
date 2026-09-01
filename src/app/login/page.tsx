import React, { Suspense } from "react";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata = {
  title: "Login — Market Healers",
  description: "Sign in to access your Market Healers learning dashboard and AI analytics workspace.",
};

export default function LoginPage() {
  return (
    <div className="py-16 sm:py-24 px-4 flex items-center justify-center bg-[#F6F8FA] min-h-[calc(100vh-140px)]">
      <Suspense fallback={<div className="w-full max-w-md h-96 bg-slate-200/60 rounded-xl animate-pulse" />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
