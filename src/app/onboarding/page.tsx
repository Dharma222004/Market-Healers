import React from "react";
import { OnboardingWizard } from "@/components/auth/OnboardingWizard";

export const metadata = {
  title: "Onboarding & Investor Assessment — Market Healers",
  description: "Complete your 5-step investor assessment, evaluate your risk tolerance, and customize your learning progression.",
};

export default function OnboardingPage() {
  return (
    <div className="py-12 sm:py-20 px-4 flex items-center justify-center bg-[#F6F8FA] min-h-[calc(100vh-140px)]">
      <OnboardingWizard />
    </div>
  );
}
