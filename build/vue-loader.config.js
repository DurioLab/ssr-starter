const utils = require('./utils')

var isProd = process.env.NODE_ENV === 'production'

module.exports = {
  preserveWhitespace: false,
  loaders: utils.cssLoaders({
    sourceMap: isProd,
    extract: isProd 
  }),
  // loaders: {
  //   // !!!
  //   sass: isProd ? ExtractTextPlugin.extract({
  //     use:'css-loader!sass-loader',
  //     fallback: 'vue-style-loader'
  //   }) : 'vue-style-loader!css-loader!sass-loader',
  // },
  postcss: [
    require('autoprefixer')({
      browsers: ['last 3 versions']
    })
  ]
}