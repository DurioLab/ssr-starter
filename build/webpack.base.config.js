const path = require('path')
const webpack = require('webpack')
const vueConfig = require('./vue-loader.config')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')


const isProd = process.env.NODE_ENV === 'production'

module.exports = {
	devtool: isProd ? false : '#cheap-module-source-map',
	output: {		
		publicPath: '/client/'
 	},
 	resolve: {
 		alias: {
 			'@client':path.resolve(__dirname, '../client'),
 			'@pages':path.resolve(__dirname, '../client/pages'),
 			'@componets':path.resolve(__dirname, '../client/components')
 		}
 	},
 	module: {
 		rules: [
		    {
		        test: /\.vue$/,
		        loader: 'vue-loader',
		        options: vueConfig
		    },
 		    {
		        test: /\.js$/,
		        loader: 'babel-loader',
		        exclude: /node_modules/
	      	}
 		]
 	},
 	plugins: isProd
 		?[
	        new webpack.optimize.UglifyJsPlugin({
	          compress: { warnings: false }
	        }),
	        new ExtractTextPlugin({
	          filename: 'common.[chunkhash].css'
	        })
 		]
 		:[
 			new FriendlyErrorsPlugin()
 		]
}