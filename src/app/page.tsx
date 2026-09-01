import React from "react";
import { HeroSection } from "@/components/marketing/HeroSection";
import { TrustMetrics } from "@/components/marketing/TrustMetrics";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { EducationSection } from "@/components/marketing/EducationSection";
import { AiEcosystem } from "@/components/marketing/AiEcosystem";
import { AiProductsShowcase } from "@/components/marketing/AiProductsShowcase";
import { LearningPaths } from "@/components/marketing/LearningPaths";
import { CommunitySection } from "@/components/marketing/CommunitySection";
import { StoriesSection } from "@/components/marketing/StoriesSection";
import { FounderNote } from "@/components/marketing/FounderNote";
import { PricingSection } from "@/components/marketing/PricingSection";
import { FaqSection } from "@/components/marketing/FaqSection";
import { FinalCta } from "@/components/marketing/FinalCta";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F6F8FA]">
      {/* 2. Hero Section */}
      <HeroSection />

      {/* 3 & 4. Trust & Key Verified Statistics */}
      <TrustMetrics />

      {/* 5. How Market Healers Works (4-Step Process) */}
      <HowItWorks />

      {/* 6. Education Ecosystem (6 Levels) */}
      <EducationSection />

      {/* 7. AI Ecosystem Overview */}
      <AiEcosystem />

      {/* 8. Individual AI Product Showcase (Ruzhaa, Dhaleo, Determind, Jaro, Dhruvan) */}
      <AiProductsShowcase />

      {/* 9. Learning Pathways Breakdown */}
      <LearningPaths />

      {/* 10. Community & Mentorship */}
      <CommunitySection />

      {/* 12. Stories From Community (Ethical Verified Placeholders) */}
      <StoriesSection />

      {/* 13. Founder Note */}
      <FounderNote />

      {/* 14. Transparent Pricing & Tiers */}
      <PricingSection />

      {/* 14. Frequently Asked Questions */}
      <FaqSection />

      {/* 15. Final Non-Hype CTA */}
      <FinalCta />
    </main>
  );
}
