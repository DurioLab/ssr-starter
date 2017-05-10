const glob = require('glob')
const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const base = require('./webpack.base.config')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const isProd = process.env.NODE_ENV === 'production'

module.exports = merge(base, {
	devtool: isProd ? false : '#cheap-module-source-map',
	entry: {
		app: './client/entry.js'
	},
	output: {
		path: path.resolve(__dirname, '../dist/client'),
		filename: 'js/[name].[chunkhash].js', // chunkhash 根据文件内容生成hash值
		chunkFilename: 'js/[name].[chunkhash].js'
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

	    /**
	     * extract webpack runtime & manifest to avoid vendor chunk hash changing
	     * on every build.
	     * 启用后 webpack模块加载器单独生成一个文件 
	     * 否则的话，该文件中的代码会自动追加至vendor.xxx.js中
	     * 此段代码会根据项目内容变化而变动，因此vendor.xxx.js的内容也会变化，导致[xxx] hash值变化，浏览器缓存失效
	     * 而vendor不经常变动，所以将该段代码单独拿出来
	     */
	    new webpack.optimize.CommonsChunkPlugin({
	      name: 'manifest',
	      minChunks: Infinity
	    }),
	    
	    new VueSSRClientPlugin({}),
     	new CopyWebpackPlugin([
			{from:path.resolve(__dirname, '../client/index.template.html'), to:path.resolve(__dirname, '../dist/client/index.template.html')},
		]),
     	new CopyWebpackPlugin([
			{from:path.resolve(__dirname, '../public/**'), to:path.resolve(__dirname, '../dist')},
		])
	]
})