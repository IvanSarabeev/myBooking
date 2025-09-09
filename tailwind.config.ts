import type { Config } from "tailwindcss";

// @ts-ignore
export default {
  darkMode: ["class", "media"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "ibm-plex-sans": ["IBM Plex Sans", "sans-serif"],
        "bebas-neue": ["var(--bebas-neue)"],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        // primary: {
        //   DEFAULT: "hsl(var(--primary))",
        //   foreground: "hsl(var(--primary-foreground))",
        // },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        primary: {
          DEFAULT: "#E7C9A5",
          admin: "#25388C",
        },
        green: {
          DEFAULT: "#027A48",
          100: "#ECFDF3",
          400: "#4C7B62",
          500: "#2CC171",
          800: "#027A48",
        },
        red: {
          DEFAULT: "#EF3A4B",
          400: "#F46F70",
          500: "#E27233",
          800: "#EF3A4B",
        },
        blue: {
          100: "#0089F1",
        },
        light: {
          100: "hsl(var(--light-100))",
          300: "hsl(var(--light-300))",
          400: "hsl(var(--light-400))",
          500: "hsl(var(--light-500))",
          600: "#F9FAFB",
          700: "#E2E8F0",
          800: "#F8FAFC",
        },
        dark: {
          100: "hsl(var(--dark-100))",
          200: "hsl(var(--dark-200))",
          300: "hsl(var(--dark-300))",
          400: "hsl(var(--dark-400))",
          500: "hsl(var(--dark-500))",
          600: "hsl(var(--dark-600))",
          700: "hsl(var(--dark-700))",
          800: "hsl(var(--dark-800))",
        },
        gray: {
          100: "#CBD5E1",
        },
      },
      screens: {
        xs: "480px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        pattern: "url('/images/pattern.webp')",
        "gradient-vertical":
          "linear-gradient(180deg, #12141d 0%, #12151f 100%)",
        "gradient-gray": "linear-gradient(270deg, #37363a 0%, #353637 100%)",
        "gradient-blue": "linear-gradient(180deg, #232839 0%, #12141d 100%)",
      },
    },
  },
} satisfies Config;
