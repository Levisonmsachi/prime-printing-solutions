/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E88C8",     // Brand blue
        textMain: "#111111",    // Authority text
        background: "#F6F4EE",  // Premium off-white
        accent: "#E91E78",      // Accent (rare)
        highlight: "#F4C430",   // Highlight (very rare)
      },
    },
  },
  plugins: [],
};
