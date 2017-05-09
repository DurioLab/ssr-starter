/*
* @Author: Arno Ma
* @Date:   2017-05-08 11:14:27
* @Last Modified by:   Arno Ma
* @Last Modified time: 2017-05-08 16:13:18
*/

'use strict'


import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'

export function createApp(){

	const router = createRouter()

	const app = new Vue({
		router,
		render: h=> h(App)
	})

	return {app, router}
}