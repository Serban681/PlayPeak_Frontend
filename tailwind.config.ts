import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      title: ['var(--font-righteous)', "sans-serif"],
      main: ['var(--font-josefin)', "sans-serif"]
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'pink': '#F8B8ED',
        'black': '#313131',
        'light-gray': '#D0D0D0',
        'dark-gray': '#585858',
        'turqoise': '#79EBD1'
      },
      boxShadow: {
        'big': '0.5rem 0.5rem 0 0 black'
      }
    },
  },
  plugins: [],
};
export default config;
