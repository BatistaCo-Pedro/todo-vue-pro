<template>
	<li class="list-group-item">

		<div class="row">

			<div class="col-8">

				<input v-if="edit_category_id==id" 
					v-model="edit_category"
					v-on:keyup.enter="saveCategory(id)"
					ref="edit_category_input"
					class="edit-category"
					>
					
				<h3 v-else>{{ name }}</h3>

			</div>
			

			<div class="col-4">

				<a 
				class="btn btn-xs float-end" 
				@click="removeCategory(id)"><i class="bi bi-trash"></i></a>

				<a 
				class="btn btn-xs float-end" 
				@click="editCategory(id)"><i class="bi bi-pencil"></i></a>

			</div>

		</div>

	</li>
</template>

<script>
export default {
	name: 'TodoCategoryList',

	data() {
		return {
			edit_category_id: 0,
			edit_category: ''
		}
	},

	props: {
		id: {
			type: Number,
			required: true
		},
		name: {
			type: String,
			required: true
		},
	},

	methods: {

		editCategory(id) {

			// Set edit category
			this.edit_category_id = id;
			this.edit_category = this.name;

			// Set focus after next tick
			// See https://vuejs.org/api/general.html#nexttick
			// See https://vuejs.org/guide/essentials/template-refs.html
			this.$nextTick(() => {
          this.$refs.edit_category_input.focus();
      })

		},
		
		saveCategory(id) {

			// Emit event
			this.$emit('save-category', {
				'id': id, 
				'new_name': this.edit_category
			});
			
			// Clear edit category
			this.edit_category_id = 0;

		},

		removeCategory(id) {

			// Emit event
			this.$emit('remove-category', id, this.edit_category);

		}
	}
}
</script>

<style scoped>
.edit-category {
	font-size: 1.75rem;
	font-weight: 500;
	line-height: 1.2;
	margin-bottom: 6px;
	background: #eee;
	border: 1px solid #ddd;
	border-radius: 5px;
}
</style>