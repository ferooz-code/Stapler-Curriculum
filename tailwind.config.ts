import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#eef5ff",
          100: "#d9e8fb",
          600: "#173a66",
          700: "#102f55",
          800: "#0b2545",
          900: "#071a33"
        },
        safety: {
          50: "#fff1f1",
          100: "#ffe0e0",
          500: "#d62828",
          600: "#b91c1c",
          700: "#8f1212"
        },
        clinical: {
          50: "#f5fbfb",
          100: "#e4f4f2",
          500: "#1b8f87",
          700: "#0e625f"
        }
      },
      boxShadow: {
        card: "0 12px 35px rgba(15, 23, 42, 0.08)"
      }
    }
  },
  plugins: []
} satisfies Config;
