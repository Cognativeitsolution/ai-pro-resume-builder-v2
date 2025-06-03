import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem",
      },
      screens: {
        xs: { max: "576px" },
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
        "2xl": "1400px",
      },
      width: {
        a4: '210mm',
      },
      height: {
        a4: '297mm',
      },
      fontFamily: {
        primary: ["var(--font-primary),sans-serif"],
      },
      backgroundImage: {
        primaryNew: "linear-gradient(to right, #9885FF50,#79A9FF50)",
        PrimaryDark: "radial-gradient(95.2% 351.86% at 100.99% 0%, #7D16C4 0%, #3358C3 81.2%, #3358C3 100%)",
        secondaryNew: "linear-gradient(90deg, rgba(207,199,255,0.6) 0%, rgba(211,211,211,0.1) 50%, rgba(212,228,255,1) 100%)",
        primary: "linear-gradient(to right, #F8F8F8, #E9E9E9)",
        secondary: "linear-gradient(to right, #9885FF, #79A9FF)",
        primary2: "linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.7) 100%)",
        primary3: "linear-gradient(to right, #9885FF,#79A9FF)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        hamzaPrimary: "#7f6afc",
        primaryBlue: "#0072b1",
        secondaryBlue: "#27AAE1",
        primaryGreen: "#01b2ac",
        secondaryGreen: "#01b2ac90",
        primaryBlack: "#231F20",
        primaryGray: "#a3a3a3",
        secondaryGray: "#A7A7A7",
        primaryCran: "#00caa5",
        primarySlate: "#343434",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        bounceInUp: {
          "0%": { transform: "translateY(50px)", opacity: "0" },
          "60%": { transform: "translateY(-10px)", opacity: "1" },
          "80%": { transform: "translateY(5px)" },
          "100%": { transform: "translateY(0)" },
        },
        rotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        fadeInUp: "fadeInUp 0.5s ease-out forwards",
        fadeInRight: 'fadeInRight 0.3s ease-out forwards',
        bounceInUp: "bounceInUp 0.8s ease-out forwards",
        rotate: "rotate 50s cubic-bezier(0.8, 0.2, 0.2, 0.8) infinite alternate",
      },
    },
  },
  plugins: [],
} satisfies Config;
