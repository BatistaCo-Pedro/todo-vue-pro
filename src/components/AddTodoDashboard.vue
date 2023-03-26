<script>
import { useTodoStore, useCategoryStore } from '@/stores/todo'
import { mapWritableState } from 'pinia'

import VueMultiselect from 'vue-multiselect'

export default {
    data() {
        return {
            new_todo: "",
            new_description: "",
            new_category: "",
            new_priority: "Low",
            categoryId: -1,
        }
    },

    components: {
        VueMultiselect,
    },

    computed: {
        ...mapWritableState(useTodoStore, ["show_add_button", "show_dash"]),
        ...mapWritableState(useCategoryStore, ['category_names', 'categories']),
    },

    methods: {
        submit_todo(new_todo, new_description, new_category, new_priority) {
            this.$emit('submit-todo', new_todo, new_description, new_category, new_priority)
            this.new_todo = "";
            this.new_category = "";
            this.new_description = "";
            this.new_priority = "Low"
        }
    },

    watch: {
        show_dash() {
          this.$nextTick(() => {
              this.$refs.edit_todo_input.focus();
          })
        },
        new_description() {
          if(this.new_description.toLocaleLowerCase() === "li()") {
            this.new_description = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed" +
            "diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." + 
            "At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata" + 
            "sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed " + 
            "diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. " + 
            "At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata" + 
            "sanctus est Lorem ipsum dolor sit amet."
          }
        },
        new_category() {
          this.categories.map(category => {
            category.name == this.new_category ? this.categoryId = category.id : this.categoryId = -1
          })
        }
    }
}
</script>

<template>
    <div v-if="show_dash" class="container-flex form-group">
    <form class="needs-validation" @submit="submit_todo(new_todo, new_description, categoryId, new_priority)">
      <input type="text" class="margins form-control theme-softer" id="todoNameInput" style="margin-top: 0.1rem!important;"
        name="addTodoInput"
        v-model="new_todo"
        ref="edit_todo_input"
        placeholder="Name"
        required>

      <textarea id="todoDescriptionId" class="margins justify-right form-control theme-softer" placeholder="Description" cols="25"
        v-model="new_description"
        required
      ></textarea>
      <br>

      <div>Priority: {{ new_priority }}</div>
      <div style="display: inline-flex; width: 30%; justify-content: space-between;">
        <div>
          <input required type="radio" id="priorityLow" value="Low" v-model="new_priority" style="margin: 0 0.2rem;"/>
          <label for="priorityLow">Low</label>
        </div>

        <div>
          <input required type="radio" id="priorityMedium" value="Medium" v-model="new_priority" style="margin: 0 0.2rem;"/>
          <label for="priorityMedium">Medium</label>
        </div>

        <div>
          <input required type="radio" id="priorityHigh" value="High" v-model="new_priority" style="margin: 0 0.2rem;"/>
          <label for="priorityHigh">High</label>
        </div>

        <div>
          <input required type="radio" id="priorityHighest" value="Highest" v-model="new_priority" style="margin: 0 0.2rem;"/>
          <label for="priorityHighest">Highest</label>
        </div>
      </div>

      <VueMultiselect v-model="new_category" :options="category_names" 
      :searchable="true" 
      :close-on-select="true" 
      :show-labels="false" 
      placeholder="Pick a value"></VueMultiselect>

      <button class="btn btn-sm btn-outline-secondary" style="width: 15%; margin-top: 1rem; color: var(--color-text);"
        type="submit"
      >
      Add</button>
    </form>
  </div>
</template>