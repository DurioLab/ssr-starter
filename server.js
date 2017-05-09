'use strict'

const express	= require('express')
const fs 		= require('fs')
const path 		= require('path')
const { createBundleRenderer } = require('vue-server-renderer')


const isProd = process.env.NODE_ENV === 'production'

const app = express()
const template = fs.readFileSync(path.resolve(__dirname, './src/index.template.html'),'utf-8')

function createRenderer (bundle, options) {
  // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
  return createBundleRenderer(bundle, Object.assign(options, {
    template,
    // this is only needed when vue-server-renderer is npm-linked
    basedir: path.resolve(__dirname, './dist'),
    // recommended for performance
    runInNewContext: false
  }))
}

let renderer
let readyPromise


if (isProd) {
	// bundle.json及客户端清单文件.json 只为服务端所用
	const bundle = require('./vue-ssr-server-bundle.json')
	const clientManifest = require('../src/vue-ssr-client-manifest.json')
	renderer = createRenderer(bundle, {
		clientManifest
	})
} else {
	readyPromise = require('./build/setup-dev-server')(app, (bundle, options) => {
		renderer = createRenderer(bundle, options)
	})
}

app.use('/dist', express.static(path.resolve(__dirname, './dist')))


function render(req, res){


	const handleError = err => {
	    if (err && err.code === 404) {
	      res.status(404).end('404 | Page Not Found')
	    } else {
	      // Render Error Page or Redirect
	      res.status(500).end('500 | Internal Server Error')
	      console.error(`error during render : ${req.url}`)
	      console.error(err.stack)
	    }
	}

	const context = {
	    url: req.url,
	    title: '为啥子不行呢'
	}
	renderer.renderToString(context, (err, html)=>{
		if (err) {
			return handleError(err)
		}
		res.end(html)
	})
}




app.get('*',isProd ? render : function(req, res){
	readyPromise.then(()=> render(req, res))
})

const port = process.env.PORT || 8080
app.listen(port, ()=>{
	console.log(`server started at localhost:${port}`)
})
