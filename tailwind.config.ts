import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Al Mows Blocks brand palette — extracted from the supplied
        // trailer, business card, Facebook banner and logo artwork.
        brand: {
          orange: "#E85A00", // Primary orange
          bright: "#FF7200", // Bright orange accent
          black: "#090909", // Near-black
          charcoal: "#171717", // Charcoal panels
          cream: "#FFF7E8", // Warm cream backgrounds
          sand: "#E8C78F", // Light sand
          brown: "#6F6456", // Muted brown-grey
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Oswald", "Impact", "sans-serif"],
        body: ["var(--font-body)", "Inter", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1200px",
      },
      boxShadow: {
        card: "0 2px 8px rgba(9, 9, 9, 0.08)",
        "card-hover": "0 12px 28px rgba(9, 9, 9, 0.16)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
