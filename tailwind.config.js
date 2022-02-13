module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'baby-blue': '#ffd2c0',
        'dark-blue': '#e84855',
        'orange-supl': '#ff9b71',
        
      },
      width:{
        'custom-width': '60rem',
        'recent-width': '85rem'
      },
      height:{
        'custom-height': '27.25rem'
      },
      opacity: ['disabled'],
      backgroundImage: {'background': "url('./assets/wave.svg')", 'backgroundM': "url('./assets/wave-mobile.svg')"},
      textShadow: {
        'normal': '0px 0px 2px #3f1417',
     },
    },
  },
  plugins: [],
}
