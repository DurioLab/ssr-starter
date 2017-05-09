/*
* @Author: Arno Ma
* @Date:   2017-05-08 11:23:18
* @Last Modified by:   Arno Ma
* @Last Modified time: 2017-05-08 18:02:15
*/

'use strict';

import Vue from 'vue'
import Router from 'vue-router'

// 代码分离 System.import  News.vue  Profile.vue被分离成两个文件
const NewsPage = () => System.import('@src/pages/News.vue')
const ProfilePage = () => System.import('@src/pages/Profile.vue')

Vue.use(Router)

export function createRouter(){
	return new Router({
		mode: 'history',
		scrollBehavior: () => ({ y: 0 }),
		routes: [
			{
				path: '/profile',
				component:ProfilePage
			},
			{
				path: '/',
				component:NewsPage
			}
		]
	})
}