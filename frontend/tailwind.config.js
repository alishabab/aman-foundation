module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#c1de91",
          200: "#b4d77b",
          300: "#a8d165",
          400: "#9bca4f",
          500: "#8fc439",
          600: "#82bd23",
          700: "#75aa20",
          800: "#68971c",
          900: "#5b8419",
        },
        secondary: {
          100: "#f1ba89",
          200: "#eeac71",
          300: "#eb9e5a",
          400: "#e89042",
          500: "#e5822b",
          600: "#e27413",
          700: "#cb6811",
          800: "#b55d0f",
          900: "#9e510d",
        },
      },
      backgroundImage: {
        "smiling-children": "url('/assets/images/media_1.jpg')",
      },
    },
  },
  plugins: [],
};
