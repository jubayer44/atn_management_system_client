/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // primary: "rgba(101, 153, 238, 1)",
        primary: "#263d8ac5",
        // secondary: "#2b7f75",
        secondary: "#be5df7",
        tColor: "#485263",
      },
    },
  },
  plugins: [],
};
