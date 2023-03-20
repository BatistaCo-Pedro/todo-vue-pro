<script>
export default {

  data() {
		return {
			some_key: import.meta.env.VITE_SOME_KEY,
		}
	},
}
</script>

<template>
  <main>

    <h1>Welcome</h1>
    
  </main>
</template>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style scoped>
.done {
  color: green;
}
.open {
  color: red;
}
</style>