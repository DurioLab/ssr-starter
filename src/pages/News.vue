<template>
	<div>News Content  {{age}}</div>
</template>
<script>
import one from '../components/1.js'
export default {
	data(){
		return {
			age:12
		}
	},
	asyncData(){
		return new Promise((resolve, reject) => {
			resolve()
		})
	},
	title(){
		return 'Helo world'
	}
}
</script>