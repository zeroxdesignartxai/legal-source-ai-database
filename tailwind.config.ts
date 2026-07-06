import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#16201d",
        field: "#f6f3ec",
        paper: "#fffdf7",
        line: "#d9d1c2",
        pine: "#1f5f4a",
        clay: "#9a4f37",
        gold: "#b7832f"
      },
      boxShadow: {
        soft: "0 18px 48px rgba(22,32,29,0.10)"
      }
    }
  },
  plugins: []
};

export default config;
