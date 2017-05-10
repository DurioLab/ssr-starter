'use strict'

const express = require('express')
const fs = require('fs')
const path = require('path')
const favicon = require('serve-favicon')
const { createBundleRenderer } = require('vue-server-renderer')

// import fs from 'fs'
// import path from 'path'
// import favicon from 'serve-favicon'
// import { createBundleRenderer } from 'vue-server-renderer'

const isProd = process.env.NODE_ENV === 'production'

const app = express()
const template = fs.readFileSync(path.resolve(__dirname, '../client/index.template.html'),'utf-8')

function createRenderer (bundle, options) {
  return createBundleRenderer(bundle, Object.assign(options, {
    template,
    runInNewContext: false,
   	// basedir: path.resolve(__dirname, '')
  }))
}

let renderer
let readyPromise


if (isProd) {

	const bundle = require('./vue-ssr-server-bundle.json')
	const clientManifest = require('../client/vue-ssr-client-manifest.json')
	renderer = createRenderer(bundle, {
		clientManifest
	})

} else {

	readyPromise = require('../build/setup-dev-server')(app, (bundle, options) => {
		renderer = createRenderer(bundle, options)
	})

}

const serve = (p, cache) => express.static(path.resolve(__dirname,p), {
  maxAge: cache && isProd ? 60 * 60 * 24 * 30 : 0
})

app.use(favicon(path.resolve(__dirname,'../public/favicon.ico')))
app.use('/client', serve(isProd ? '../client' : '../dist/client'))
app.use('/public', serve('../public',true))

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
	    title: '服务器渲染脚手架'
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
