module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
      colors: {
        background: "#232946",
        primary: "#FFFFFE",
        secondary: "#b8c1ec",
        btnbg: "#eebbc3",
        transBg: "rgba(0, 0, 0, 0.65)",
      },
      tableLayout: ["hover", "focus"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
