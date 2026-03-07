module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0dccf2', // Custom cyan color from Stitch
        dark: '#121212',
        light: '#f3f4f6',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'round-eight': '0.5rem', // Round Eight from Stitch
      },
    },
  },
  plugins: [],
}