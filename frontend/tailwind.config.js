// /** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'Poppins', 'Roboto', 'sans-serif'],
      },
      colors: {
        primary:'#4F46E5',
        secondary: '#FBBF24',
        // nav: 'red',
        nav: '#F0F8FF',
        accent: '#F472B6',
        neutral: '#374151',
        base100: '#FFFFFF',
        info: '#3ABFF8',
        success: '#36D399',
        warning: '#FBBD23',
        error: '#F87272',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      screens: {
        '3xl': '1920px',
      }
    },
  },
  plugins: [],
}
