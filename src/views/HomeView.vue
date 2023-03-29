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
    <br>
    <br>
    <br>
    <h6>Welcome to this humble page, click on Todo's in the navegation-bar to see your Todo's!</h6>
    <p>You can also create and edit categories for your Todo's under Manage Categories</p>
    
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