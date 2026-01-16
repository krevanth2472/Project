
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: { 50:'#eefcf5', 100:'#dcf7ea', 600:'#2E8B57', 700:'#27744a' },
        mint: { 500:'#86D9AD', 600:'#6dc69a' },
      },
      boxShadow: {
        soft: '0 1px 2px rgba(16,24,40,0.04), 0 4px 12px rgba(16,24,40,0.08)',
        elevated: '0 8px 20px rgba(16,24,40,0.12)',
      },
      borderRadius: { xl: '0.9rem' },
    },
  },
 
  plugins: [],
}
