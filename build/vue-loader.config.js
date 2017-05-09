module.exports = {
  extractCSS: process.env.NODE_ENV === 'production',
  preserveWhitespace: false,
  loaders: {
  	scss: 'vue-style-loader!css-loader!sass-loader', // <style lang="scss">
  }
}