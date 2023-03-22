<script>
import VueMultiselect from 'vue-multiselect'
import { mapState, mapWritableState, mapActions } from 'pinia'
import { useTodoStore, useCategoryStore } from '@/stores/todo'

import TodoList from '@/components/TodoList.vue'

export default {

  data() {
    return {
      new_todo: "",
      new_description: "",
      new_category: "",
      new_priority: "Low",
    }
  },

  components: {
    TodoList,
    VueMultiselect
  },

  computed: {
    ...mapWritableState(useTodoStore, ['todos', 'todos_open', 'todos_completed', "favorite_todos", "show_add_button", "show_dash", "is_searching", "search_bar_input"]),
    ...mapWritableState(useCategoryStore, ['category_names']),

    addTodoText: {
      get() {
        return this.new_todo
      },
      set(addTodoText) {
        this.new_todo = addTodoText
      }
    },

    addTodoDescription: {
      get() {
        return this.new_description
      },
      set(addTodoDescription) {
        this.new_description = addTodoDescription
      }
    },

    addTodoCategory: {
      get() {
        return this.new_category
      },
      set(addTodoCategory) {
        this.new_category = addTodoCategory
      }
    },
  },
  
  methods: {
   ...mapActions(useTodoStore, ['fetchTodos', 'toggleTodo', "editTodo", "saveTodo", "addTodo", "removeTodo", "cloneTodo", "searchTodos"]),

    showDash() {
      this.show_dash = true; 
      this.show_add_button= false; 

      this.$nextTick(() => {
        this.$refs.edit_todo_input.focus();
      })
    },

    closeDash() {
      this.show_dash = false; 
      this.show_add_button = true; 
    },

    submitTodo(new_Todo, new_description, new_category, new_priority) {
      this.addTodo(new_Todo, new_description, new_category, new_priority);
      //reset values
      this.new_todo = "";
      this.new_description = "";
      this.new_category = "";
      this.new_priority = "";
    },
  },
  
  watch: {
    new_category(value) {
      if(value === null || value == "" || value == undefined) {
        this.new_category = "No Category Given";
        return;
      }
      this.new_category = value;
    },

    //make sure to show all todos when not searching again
    search_bar_input() {
      if(this.search_bar_input == "") { this.is_searching = false }
    },
  },
}
</script>


<template>
  <main>

    <h1>TODO's</h1>

    <!-- Tab navigatioon -->
    <ul class="nav nav-tabs" id="myTab" role="tablist">

      <li class="nav-item" role="presentation">
        <button class="nav-link active" id="open-todos-tab" data-bs-toggle="tab" data-bs-target="#open-todos" type="button" role="tab" @click="show_add_button = true">Open ({{ todos_open != undefined ? todos_open.length : 0 }})</button>
      </li>

      <li class="nav-item" role="presentation">
        <button class="nav-link" id="closed-todos-tab" data-bs-toggle="tab" data-bs-target="#closed-todos" type="button" role="tab" @click="show_add_button = false">Completed ({{ todos_completed != undefined ? todos_completed.length : 0 }})</button>
      </li>
      
      <li class="nav-item" role="presentation">
        <button class="nav-link" id="favorite-todos-tab" data-bs-toggle="tab" data-bs-target="#favorite-todos" type="button" role="tab" @click="show_add_button = false">Favorites ({{ favorite_todos != undefined ? favorite_todos.length : 0 }})</button>
      </li>

    </ul>

    <div style="width: 100%;">
      <input style="width: 100%;" class="searchbar" type="text" v-model="search_bar_input" placeholder="Search Todos" />
      <div class="item error" v-if="search_bar_input&&!searchTodos().length">
        <p>No results found!</p>
      </div>
    </div>

    <!-- Tab content -->
    <div class="tab-content" id="todos">

      <div class="tab-pane fade show active" id="open-todos" role="tabpanel">
        <TodoList :todos="todos_open"
        @toggle-todo-state="toggleTodo" 
        @edit-todo="editTodo" 
        @save-todo="saveTodo"
        @remove-todo="removeTodo"
        @clone-todo="cloneTodo"/>
      </div>

      <div class="tab-pane fade" id="closed-todos" role="tabpanel">
        <TodoList :todos="todos_completed" 
        @toggle-todo-state="toggleTodo" 
        @edit-todo="editTodo" 
        @save-todo="saveTodo"
        @remove-todo="removeTodo"/>
      </div>

      <div class="tab-pane fade" id="favorite-todos" role="tabpanel">
        <TodoList :todos="favorite_todos" 
        @toggle-todo-state="toggleTodo" 
        @edit-todo="editTodo" 
        @save-todo="saveTodo"
        @remove-todo="removeTodo"/>
      </div>

    </div>

    <button v-if="show_add_button" class="btn btn-sm btn-outline-secondary margins" @click="showDash()">Add Todo</button>
    <div v-if="show_dash" style="margin: 0.5rem 0.25rem 0.05rem 0; display: flex; justify-content: flex-end;">
      <h3><button class="button-no-style" @click="closeDash"><i class="bi bi-x-lg"></i></button></h3>
    </div>

    <div v-if="show_dash" class="container-flex form-group">
      <form class="needs-validation" @submit="submitTodo(new_todo, new_description, new_category, new_priority)">
        <input type="text" class="margins form-control theme-softer" id="todoNameInput" style="margin-top: 0.1rem!important;"
          name="addTodoInput"
          v-model="addTodoText"
          ref="edit_todo_input"
          placeholder="Name"
          required>

        <textarea id="todoDescriptionId" class="margins justify-right form-control theme-softer" placeholder="Description" cols="25"
          v-model="addTodoDescription"
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

        <VueMultiselect v-model="addTodoCategory" :options="category_names" 
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
    <hr />

  </main>
</template>

<style scoped>

@import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");

li {
  list-style-type: none;
}

.done {
  color: green;
}

.open {
  color: red;
}

.margins {
  margin: 1rem 0 0 0;
  padding: 0.5rem, 3rem;
}

.container-flex {
  display: flex;
  flex-direction: column;
}

.searchbar {
  display: block;
  width: 350px;
  margin: 20px auto;
  padding: 10px 45px;
  background: white no-repeat 15px center;
  background-size: 15px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.error {
  background-color: tomato;
}
</style>