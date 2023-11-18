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
          "additional-hover": "var(--color-text-additional-hover)",
          mutated: "var(--color-text-mutated)",
          "mutated-hover": "var(--color-text-mutated-hover)",
          active: "var(--color-text-active)",
          inverted: "var(--color-text-inverted)",
          "button-text": "var(--color-text-button)",
        },
      },
      backgroundColor: {
        skin: {
          main: "var(--color-bg-main)",
          additional: "var(--color-bg-additional)",
          hover: "var(--color-bg-hover)",
          active: "var(--color-bg-active)",
          "bg-accent": "var(--color-bg-button)",
          "bg-accent-hover": "var(--color-bg-button-hover)",
        },
      },
      borderColor: {
        skin: {
          main: "var(--color-border-main)",
          additional: "var(--color-border-main)",
          // hover: "var(--color-bg-hover)",
          // active: "var(--color-bg-active)",
        },
      },
      ringColor: {
        skin: {
          main: "var(--color-bg-accent)",
          additional: "var(--color-border-main)",
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
      screens: {
        xs: "400px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")({ strategy: "class" })],
};
export default config;
