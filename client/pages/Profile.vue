<template>
	<div>Profile Content {{}}</div>
</template>
<script>
import one from '../components/1.js'

export default {
	asyncData(){
		return new Promise((resolve, reject) => {
			resolve()
		})
	},
	title(){
		return 'Helo world 文件内容改变啦，哈哈哈'
	}
}
</script>