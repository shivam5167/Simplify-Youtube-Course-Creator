import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "creative-ai-gradient":
          "var(--Project-Color-Styles-CreativeAI-Gradient, #F55C7A)",
        background: {
          "20": "hsl(var(--background-20))",
          "25": "hsla(var(--background-25))",
          "70": "hsl(var(--background-70))",
          "80": "hsl(var(--background-80))",
          "90": "hsl(var(--background-90))",
          DEFAULT: "hsl(var(--background))",
          primary: "hsl(var(--background-primary))",
        },
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
          "primary-80": "hsl(var(--primary-80))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          "10": "hsl(var(--primary-10))",
          "20": "hsl(var(--primary-20))",
          "80": "hsl(var(--primary-80))",
          "90": "hsl(var(--primary-90))",
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          "90": "hsl(var(--secondary-90))",
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      backgroundImage: {
        "vivid-gradient": "var( --creative-ai-gradient)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        "geist-sana": ["var(--font-geist-sans)", ...fontFamily.sans],
        "geist-mono": ["var(--font-geist-mono)", ...fontFamily.mono],
        "rubik-gemstone": ["var(--font-rubik-gemstone)", ...fontFamily.sans],
        "sour-gummy": ["var(--font-sour-gummy)", ...fontFamily.sans],
      },
      animation: {
        rainbow: "rainbow var(--speed, 2s) infinite linear",
        spotlight: "spotlight 2s ease .75s 1 forwards",
        "loading-wave":
          "loading-wave var(--wave-speed, 1s) infinite ease-in-out",
        videoInline: "videoInline 300ms ease-in-out forwards",
        videoSticky: "videoSticky 300ms ease-in-out forwards",
        move: "move 3s ease-in-out infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        move: {
          "0%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(10px)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
        rainbow: {
          "0%": {
            "background-position": "0%",
          },
          "100%": {
            "background-position": "200%",
          },
        },
        spotlight: {
          "0%": {
            opacity: "0",
            transform: "translate(-72%, -62%) scale(0.5)",
          },
          "100%": {
            opacity: "1",
            transform: "translate(-50%,-40%) scale(1)",
          },
        },
        "loading-wave": {
          "0%, 100%": {
            height: "10%",
          },
          "50%": {
            height: "100%",
          },
          "80%": {
            height: "40%",
          },
        },
        videoInline: {
          from: {
            opacity: "0",
          },
          to: {
            opacity: "1",
          },
        },
        videoSticky: {
          from: {
            transform: "translateX(50px)",
            opacity: "0",
          },
          to: {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
    },
  },
  plugins: [tailwindAnimate],
} satisfies Config;
