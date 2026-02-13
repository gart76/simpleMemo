/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#13111C',
        surface: '#1E1B2E',
        primary: '#7F56D9', // Lighter purple for better contrast
        secondary: '#2A2640',
        accent: '#6C63FF',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
