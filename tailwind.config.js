import { heroui } from "@heroui/theme";

module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        dark: {
          colors: {
            background: "#1a1b1e", // softer dark (main page)
            content1: "#242529",   // card bg (slightly lighter)
            content2: "#2f3034",   // inner elements / hover bg
            foreground: "#ffffff",
          },
        },
        light: {
          colors: {
            background: "#f3f4f6",
            content1: "#ffffff",
            content2: "#f9fafb",
            foreground: "#111111",
          },
        },
      },
    }),
  ],
};
