/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        primary: '#15803d',
        secondary: '#00f6ff',
        hover: '#D4E458',
        'text-color': '#EAEAEA',
        'login-bg-color': 'rgba(20, 20, 20, 0.4)',
        buttons: {
          primary: '#D0C9A3',
          secondary: '#747373',
          'diamond-btn-bg-color': 'rgba(0, 0, 0, 0.4)',
          'diamond-btn-border-color': '#CBC5A2',
        },
      },
      fontSize: {
        title: '2.6rem;',
        paragraph: '1.2rem;',
      },
      fontFamily: {
        poppins: ['Poppins'],
        ranika: ['Ranika'],
      },
      backgroundImage: {
        'home-screen': "url('/src/assets/image/login-screen/bg-login.png')",
      },
    },
    screens: {
      xs: '480px',
      ss: '620px',
      sm: '768px',
      md: '1060px',
      lg: '1200px',
      xl: '1700px',
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('child', '& > *');
      addVariant('child-hover', '& > *:hover');
    },
  ],
};
