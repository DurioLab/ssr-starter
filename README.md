### Vue2.x + Express4.x + Webpack2.x 服务器渲染脚手架


同构应用目录结构

---- dist

	-- client 客户端
		|-- 0.xxxx.js
		|-- 1.xxxx.js
		|-- index.html
		|-- app.xxx.js
		|-- vendor.xxx.js
		|-- favicon.ico
		|-- vue-ssr-client-manifest.json
		|-- service-worker.js

	-- static 资源文件
		|--0.png
		|--2.png
		|--3.png

	-- server 后端
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
