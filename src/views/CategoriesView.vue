<script>
import { mapState, mapWritableState, mapActions } from 'pinia'
import { useCategoryStore } from '@/stores/categories'
import CategoryList from '@/components/CategoryList.vue'

export default {

	components: {
		CategoryList
	},

	data() {
		return {
			new_category: ''
		}
	},

	methods: {
		...mapActions(useCategoryStore, ['addCategory', 'removeCategory', "saveCategory"]),
		
	},

	computed: {
		...mapWritableState(useCategoryStore, ['categories']),
	}
}
</script>

<template>
<div class="manage_category">
	
	<h1>Manage Categories</h1>

	<ul class="list-group" v-for="category in categories" v-bind:key="category.id">
		<CategoryList
			:id="category.id"
			:name="category.name"

			@remove-category="removeCategory"
			@save-category="saveCategory"
		/>
	</ul>
	
	<div class="form-group">
		<input 
		name="add_category"
		class="form-control add-new-category"
		v-model="new_category" 
		v-on:keyup.enter="addCategory" 
		autocomplete="off"
		placeholder="Neue Kategorie hinzufügen" />
	</div>
	

</div>
</template>

<style scoped>
.list-group-item {
	text-align: left;
	margin-bottom: 5px;
	padding-bottom: 0;
}

.add-new-category {
	font-size: 1.75rem;
	font-weight: 500;
    line-height: 1.2;
}
</style>