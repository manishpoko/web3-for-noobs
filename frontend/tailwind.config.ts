import typography from '@tailwindcss/typography'


export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#050505", // Pure Black
        surface: "#111111",    // Nearly black for cards
        
        // THE STAR OF THE SHOW: Toxic Acid Green
        acid: "#CCFF00",       
        acidHover: "#b3e600",
        
        textMain: "#ffffff",
        textMuted: "#888888",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        // We use this for headers to give it that 'Coding' vibe
        mono: ["Space Mono", "monospace"], 
      },
    },
  },
  plugins: [
    typography

  ],
};