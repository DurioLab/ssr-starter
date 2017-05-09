const path = require('path')
const webpack = require('webpack')
const vueConfig = require('./vue-loader.config')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')


const isProd = process.env.NODE_ENV === 'production'

module.exports = {
	devtool: isProd ? false : '#cheap-module-source-map',
	output: {		
		path: path.resolve(__dirname, '../dist'),
		filename: '[name].[chunkhash].js',
		publicPath: '/dist/'
 	},
 	resolve: {
 		alias: {
 			'@src':path.resolve(__dirname, '../src')
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
 			// new CopyWebpackPlugin([
 			// 	{from:path.resolve(__dirname, '../client/index.html'), to:path.resolve(__dirname, '../dist/client/index.html')},
 			// 	{from:path.resolve(__dirname, '../server/server.js'), to:path.resolve(__dirname, '../dist/server/server.js')}
 			// ]),
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