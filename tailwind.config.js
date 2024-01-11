/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "450px",
        xxs: "412px",
        xxxs: "360px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
