import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth/authContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AppShellWrapper } from "@/components/layout/AppShellWrapper";

export const metadata: Metadata = {
  metadataBase: new URL("https://markethealers.com"),
  title: "Market Healers — Heal Your Wealth. Build Your Freedom.",
  description:
    "An institutional financial education and AI-powered decision-support ecosystem. Learn market mechanics, analyze equities with rigor, and develop lasting financial discipline.",
  keywords: [
    "financial education",
    "stock market education",
    "stock analysis tools",
    "stock screener",
    "investment learning",
    "financial market education",
    "Market Healers",
  ],
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Market Healers — Financial Market Learning & Decision Ecosystem",
    description:
      "Learn the Market. Build Your Financial Future. Premium FinTech + Financial Education platform with AI-powered decision tools.",
    url: "https://markethealers.com",
    siteName: "Market Healers",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 800,
        alt: "Market Healers Official Emblem",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans antialiased text-[#172033] bg-[#F6F8FA] min-h-screen flex flex-col selection:bg-[#00A88F]/20 selection:text-[#0B1F3A]">
        <AuthProvider>
          <AppShellWrapper>{children}</AppShellWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
