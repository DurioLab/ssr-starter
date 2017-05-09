### Vue2.x + Express4.x + Webpack2.x 服务器渲染脚手架


原始目录

	|-- build 自动化构建脚本
		|--
		|--

	|-- client
		|-- pages
		|-- components
		|-- router
			|-- index.js
		|-- store
		|-- app.js
		|-- App.vue
		|-- index.template.html

	|-- server
		|-- controllers
			|--
		|-- models
			|--
		|-- api
			|--
		|-- entry-server.js
		|-- server.js

	|-- gulp.babel.js // TODO 使用gulp自动化构建
	|-- .gitignore  
	|-- .babelrc     // server端babel配置使用, client端babel配置位于webpack配置文件内部
	|-- package.json
	|-- README.md




最终打包目录结构
	---- dist

		-- client
			|-- 0.xxxx.js
			|-- 1.xxxx.js
			|-- index.html
			|-- app.xxx.js
			|-- vendor.xxx.js
			|-- favicon.ico
			|-- vue-ssr-client-manifest.json

		-- server
			|-- controllers
				|--
				|--
			|-- models
				|--
				|--
			|-- api
				|--
				|--
			|-- server.js
			
			|-- vue-ssr-server.bundle.json


npm run dev 开发
npm run build 打包

pm2 server/server.js 生产环境运行
