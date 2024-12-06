/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "white": "#ffffff",
        "base-1": "#0e1111",
        "base-2": "#6E7070",
        "background": "#ECECEC",
        "accent-blue-1": "#0000EE",
        "accent-blue-2": "#E6E6FE",
        "accent-red-1": "#F50000",
        "accent-red-2": "#FDE0E0",
      },
    },
    animation: {
      spinner: "spinner 1s linear infinite",
      marquee: "marquee 120s linear infinite",
      marquee2: "marquee2 120s linear infinite",
      marquee3: "marquee 120s linear reverse infinite",
      marquee4: "marquee2 120s linear reverse infinite",
    },
    keyframes: {
      marquee: {
        "0%": { transform: "translateX(0%)" },
        "100%": { transform: "translateX(-100%)" },
      },
      marquee2: {
        "0%": { transform: "translateX(100%)" },
        "100%": { transform: "translateX(0%)" },
      },
      spinner: {
        "0%": { transform: "rotate(0deg)" },
        "100%": {
          transform: "rotate(360deg)",
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    // ...
  ],
};
