module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        // 48px wide 16 column grid
        8: "repeat(8, minmax(48px, 1fr))",
        // 48px wide 16 column grid
        12: "repeat(12, minmax(48px, 1fr))",
        // 48px wide 16 column grid
        16: "repeat(16, minmax(48px, 1fr))",
        // 48px wide 32 column grid
        32: "repeat(32, minmax(48px, 1fr))",
      },
    },
  },
  plugins: [],
};
