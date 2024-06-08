import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "gray-30" : "#808897",
        "white-80": "#FFFBFB",
        primary: "#253C95",
        background: "#F5F5F5",
        secondary: "#F20A14",
        // accent: "#FCB920",
        gray_80: "#808897", //(for gray text)
        gray_30: "#F8F9FB", //for gray stroke color
        white_80: "#FFFBFB", // for text color
        success: "#008000",
        // "accent-10": "#FFDE00",
        error: "#F73030",
        black_90: "#000000",
        foreground: "hsl(var(--foreground))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
      },
      inset: {
        "1/5": "10%",
        "1/6": "5%",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
