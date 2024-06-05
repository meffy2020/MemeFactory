// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans KR', 'sans-serif'],
        myeongjo: ['Nanum Myeongjo', 'serif'],
      },
      colors: {
        primary: '#0f4c81',
      },
    },
  },
  plugins: [],
};
