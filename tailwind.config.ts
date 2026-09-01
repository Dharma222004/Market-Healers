import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#040911",
          900: "#08111F", // Dark interface
          850: "#0B1F3A", // Primary Brand Navy
          800: "#0E1A2B", // Dark surface
          700: "#132742",
          600: "#1B355A",
          500: "#2B4B7B",
        },
        teal: {
          600: "#008B76",
          500: "#00A88F", // Secondary Healing Teal
          400: "#14CBAE",
          100: "#E0F7F4",
          50: "#F0FAF8",
        },
        gold: {
          600: "#A8831A",
          500: "#C9A227", // Muted Gold
          400: "#DFB83B",
          100: "#FBF5E2",
          50: "#FDFBF5",
        },
        market: {
          bg: "#F6F8FA",
          text: "#172033",
          muted: "#667085",
          border: "#E2E8F0",
          borderDark: "#1E2C40",
          success: "#0B9B72",
          danger: "#D64545",
          warning: "#D99A1E",
        },
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "'Inter'", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "Roboto", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
