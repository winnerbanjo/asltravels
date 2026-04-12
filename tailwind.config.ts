import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        container: "1200px",
      },
      boxShadow: {
        subtle: "0 1px 2px rgba(10, 10, 10, 0.04)",
      },
    },
  },
  plugins: [],
};

export default config;
