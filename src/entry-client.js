/*
* @Author: Arno Ma
* @Date:   2017-05-08 11:16:03
* @Last Modified by:   Arno Ma
* @Last Modified time: 2017-05-08 19:05:13
*/

'use strict';

import Vue from 'vue'
import { createApp } from '@src/app'


const { app, router } = createApp()


if (window.__INITIAL_STATE__) {
	
}

router.onReady(()=>{
	app.$mount('#app')
})