<script>

import { mapWritableState, mapActions } from 'pinia'
import { useTodoStore, useCategoryStore } from '@/stores/todo'

import TodoList from '@/components/TodoList.vue'
import AddTodoDashboard from '../components/AddTodoDashboard.vue'

export default {

  components: {
    TodoList,
    AddTodoDashboard
  },

  computed: {
    ...mapWritableState(useTodoStore, ['todos', 'todos_open', 'todos_completed', "favorite_todos", "filters", 
      "show_add_button", "show_dash", "is_searching", "search_bar_input", "show_filter_dash"]),
    ...mapWritableState(useCategoryStore, ['category_names']),
  },
  
  methods: {
   ...mapActions(useTodoStore, ['toggleTodo', "editTodo", "saveTodo", "addTodo", "removeTodo", "cloneTodo"]),

    showDash() {
      this.show_dash = true; 
      this.show_add_button= false;
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

    showFilters() {

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
      else { this.is_searching = true }
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

    <!-- searchbar -->
    <div class="searchbar" style="display: inline-flex;  width: 100%;">
      <input style="width: 100%;" class="search-input" type="text" v-model="search_bar_input" placeholder="Search Todos" />
      <button @click="show_filter_dash = !show_filter_dash" class="button-no-style" style="margin: 0 1rem;"><h3 style="margin: 0;"><i class="bi bi-funnel"></i></h3></button>
    </div>
    <div class="item error" v-if="search_bar_input && todos_open.length < 1">
        <p>No results found!</p>
    </div>

    <!-- Filter Tab-->
    <div v-if="show_filter_dash">
      <div style="display: inline-flex; justify-content: space-between; width: 100%;">
        <div v-for="filter in filters">
          <h6 style="margin: 0rem 0.5rem">{{ filter.substring(4) }}<button  class="button-no-style"><i class="bi bi-caret-down-fill" style="align-self:self-start; margin-left: 0.2rem;"></i></button></h6>
        </div>
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

    <AddTodoDashboard @submit-todo="submitTodo"></AddTodoDashboard>

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
  margin: 0.75rem auto;
  padding: 0.5rem 1rem;
  background: white no-repeat 15px center;
  background-size: 15px 15px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.search-input {
  border: none;
  background: transparent;
  border-bottom: 1px solid #fff;
  outline: none;
}

.error {
  background-color: tomato;
}
</style>