/*
* @Author: Arno Ma
* @Date:   2017-05-08 10:29:44
* @Last Modified by:   Arno Ma
* @Last Modified time: 2017-05-08 17:58:59
*/

'use strict';

import { createApp } from '@client/app'

const isDev = process.env.NODE_ENV !== 'production'

export default context => {

	return new Promise((resolve, reject)=>{

		const s = isDev && Date.now()
		const {app, router} = createApp()

		router.push(context.url)
		router.onReady(()=>{

			const matchedComponents = router.getMatchedComponents()

			if (!matchedComponents.length) {
				reject({code: 404})
			}

			// 加载数据
			Promise.all(matchedComponents.map(component => {
				return component.asyncData && component.asyncData({
					route: router.currentRoute
				})
			})).then(()=>{
				isDev && console.log(`data pre-fetch: ${Date.now() - s}ms`)
				resolve(app)
			}).catch(reject)
		},reject)
	})
}


