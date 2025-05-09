// /** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Outfit', 'Poppins', 'Roboto', 'sans-serif'],
    },
    colors: {
      primary: '#15fa05',
      secondary: '#FBBF24',
      accent: '#F472B6',
      neutral: '#374151',
      base100: '#FFFFFF',
      info: '#3ABFF8',
      success: '#36D399',
      warning: '#FBBD23',
      error: '#F87272',
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
      }
    },
  },
  plugins: [],
}
