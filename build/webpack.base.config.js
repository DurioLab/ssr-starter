const path = require('path')
const webpack = require('webpack')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const isProd = process.env.NODE_ENV === 'production'


function addOptions(loaders){
	return loaders.split('!').map(function(loader){
		var options = {
			sourceMap: !isProd
		}
		if (loader === 'css-loader') {
			options.importLoaders = 1
		}
		return {
			loader: loader,
			options: options
		}
	})
}

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
		        	extractCSS: isProd,
		        	loaders: {
		        		scss: addOptions('vue-style-loader!css-loader!sass-loader') 
		        	}
		        	//已经默认添加了postcss-loader
		        }
		    },
 		    {
		        test: /\.js$/,
		        exclude: /node_modules/,
		        loader: 'babel-loader' //配置文件 .babelrc
	      	},

	      	{
	      		test: /\.scss$/,
	      		exclude: /node_modules/,
	      		loader: !isProd 
	      			? addOptions('vue-style-loader!css-loader!postcss-loader!sass-loader')
	      			: ExtractTextPlugin.extract({
	      				use: addOptions('css-loader!postcss-loader!sass-loader'),
	      				fallback:'vue-style-loader'
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




