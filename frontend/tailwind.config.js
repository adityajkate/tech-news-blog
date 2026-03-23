/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light mode
        light: {
          bg: '#FAFAFA',
          surface: '#FFFFFF',
          text: {
            primary: '#171717',
            secondary: '#737373',
          },
          border: '#E5E5E5',
          accent: '#0070F3',
        },
        // Dark mode
        dark: {
          bg: '#0A0A0A',
          surface: '#171717',
          text: {
            primary: '#EDEDED',
            secondary: '#A3A3A3',
          },
          border: '#262626',
          accent: '#3291FF',
        },
      },
      fontFamily: {
        sans: ['Geist', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        base: ['0.875rem', { lineHeight: '1.5' }],
      },
      maxWidth: {
        'container': '1200px',
        'content': '720px',
      },
      spacing: {
        'section': '3rem',
        'section-mobile': '1.5rem',
      },
    },
  },
  plugins: [],
}
