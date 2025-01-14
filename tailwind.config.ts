import { nextui } from "@nextui-org/theme";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./services/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(button|card|date-picker|dropdown|input|navbar|progress|radio|scroll-shadow|popover|ripple|spinner|calendar|date-input|form|menu|divider).js",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            // default: "#ECEFF1",
            // foreground: "#FFFFFF",
            primary: "#FFC107",
            // secondary: "#F5F5F5",
            // success: "#122149",
            // warning: "#0D1924",
            // danger: "#1D252D",
          },
        },
      },
    }),
  ],
} satisfies Config;
