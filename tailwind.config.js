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
    },
    colors: {
      'white': '#ffffff',
      'base-1': '#0e1111',
      'background': '#ECECEC',
      'accent-blue-1': '#0000EE',
      'accent-blue-2': '#E6E6FE',
      'accent-red-1': '#F50000',
      'accent-red-2': '#FDE0E0',
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    // ...
  ],
};
