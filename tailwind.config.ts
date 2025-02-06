import { heroui } from "@heroui/theme";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./services/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/components/(accordion|avatar|button|card|checkbox|date-picker|dropdown|form|input|navbar|popover|progress|radio|scroll-shadow|select|divider|ripple|spinner|calendar|date-input|menu|listbox).js",
  ],
  theme: {
    extend: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1440px",
        "2xl": "1536px",
        "2xxl": "1952px",
        "3xl": "3840px",
      },
      fontFamily: {
        Archivo: ["var(--font-archivo)"],
        Lorin: ["var(--font-lorin)"],
        Inter: ["var(--font-inter)"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            default: "#FFFBEE",
            background: "#FFFBEE",
            primary: "#1E318D",
            secondary: "#4D4D4D", //main title color
            // success: "#4D4D4D",
            warning: "#FFC107",
            // danger: "#1D252D",
          },
        },
      },
    }),
  ],
} satisfies Config;
