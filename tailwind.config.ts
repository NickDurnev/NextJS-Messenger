import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      textColor: {
        skin: {
          base: "var(--color-text-base)",
          additional: "var(--color-text-additional)",
          mutated: "var(--color-text-mutated)",
          "mutated-hover": "var(--color-text-mutated-hover)",
          active: "var(--color-text-active)",
          inverted: "var(--color-text-inverted)",
        },
      },
      backgroundColor: {
        skin: {
          main: "var(--color-bg-main)",
          additional: "var(--color-bg-additional)",
          hover: "var(--color-bg-hover)",
          active: "var(--color-bg-active)",
          "button-accent-hover": "var(--color-button-accent-hover)",
          "button-muted": "var(--color-button-muted)",
        },
      },
      borderColor: {
        skin: {
          main: "var(--color-border-main)",
          // additional: "var(--color-bg-additional)",
          // hover: "var(--color-bg-hover)",
          // active: "var(--color-bg-active)",
        },
      },
      colors: {
        blue: {
          950: "#0e0f26",
        },
        purple: {
          500: "#bbb2cf",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")({ strategy: "class" })],
};
export default config;
