const glob = require('glob')
const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const base = require('./webpack.base.config')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = merge(base, {
	entry: {
		app: './client/entry.js'
	},
	output: {
		path: path.resolve(__dirname, '../dist/client'),
		filename: '[name].[chunkhash].js'
	},
	resolve: {},
	plugins: [
	    new webpack.DefinePlugin({
	      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
	      'process.env.VUE_ENV': '"client"'
	    }),
	    // extract vendor chunks for better caching
	    new webpack.optimize.CommonsChunkPlugin({
	      name: 'vendor',
	      minChunks: function (module) {
	        // a module is extracted into the vendor chunk if...
	        return (
	          // it's inside node_modules
	          /node_modules/.test(module.context) &&
	          // and not a CSS file (due to extract-text-webpack-plugin limitation)
	          !/\.css$/.test(module.request)
	        )
	      }
	    }),

	    // extract webpack runtime & manifest to avoid vendor chunk hash changing
	    // on every build.
	    new webpack.optimize.CommonsChunkPlugin({
	      name: 'manifest'
	    }),
	    new VueSSRClientPlugin({}),
     	new CopyWebpackPlugin([
			{from:path.resolve(__dirname, '../client/index.template.html'), to:path.resolve(__dirname, '../dist/client/index.template.html')},
		])
	]
})