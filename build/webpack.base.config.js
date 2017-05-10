const path = require('path')
const webpack = require('webpack')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
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
		        options: {
		        	preserveWhitespace: false,
		        	extractCSS: isProd
		        }
		    },
 		    {
		        test: /\.js$/,
		        exclude: /node_modules/,
		        loader: 'babel-loader' //配置文件 .babelrc
	      	},
	      	{
	      		test: /\.(css|scss)$/,
	      		exclude: /node_modules/,
	      		use: !isProd
	      		? ['vue-style-loader','css-loader','postcss-loader'] 
	      		: ExtractTextPlugin.extract({
	      			fallback: 'vue-style-loader',
		      		use:'css-loader!postcss-loader'
	      		})

	      	}

 		]
 	},
 	plugins: isProd
 		?[
	        new webpack.optimize.UglifyJsPlugin({
	          compress: { warnings: false }
	        }),
	        new ExtractTextPlugin({
	        	filename:'css/[name].[chunkhash].css'
	        }),
	        new OptimizeCSSPlugin()
 		]
 		:[
 			new FriendlyErrorsPlugin()
 		]
}