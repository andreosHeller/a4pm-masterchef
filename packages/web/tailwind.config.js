module.exports = {
  prefix: 'tw-',
  purge: { content: ['./public/index.html', './src/**/*.{vue,js,ts}'] },
  theme: {
    extend: {
      colors: {
        appbg: '#2C2C2C',
        brand: '#F59C00',
        apptext: '#D5D5D5',
      },
    },
  },
  variants: {},
  plugins: [],
}
