import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "bgPrimary": "var(--bgPrimary)",
        "bgSecondary": "var(--bgSecondary)",
        "bgTertiary": "var(--bgTertiary)",
        "bgGradient": "var(--bgGradient)",
        "primary": "var(--primary)",
        "secondary": "var(--secondary)",
        "tertiary": "var(--tertiary)",
        "shadow":"var(--shadow)"
      },
      spacing: {
        "navbar": "var(--navHeight)"
      },
      fontFamily: {
        "header": ["var(--font-exo)"]
      }
    },
  },
  plugins: [],
}

export default config
