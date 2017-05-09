module.exports = {
  extractCSS: process.env.NODE_ENV === 'production',
  preserveWhitespace: false,
  loaders: {
  	scss: 'vue-style-loader!css-loader!sass-loader', // <style lang="scss">
  },
  postcss: [
    require('autoprefixer')({
      browsers: ['last 3 versions']
    })
  ]
}