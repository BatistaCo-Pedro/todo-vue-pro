<script>

import { mapState, mapWritableState, mapActions } from 'pinia'
import { useTodoStore } from '@/stores/todo'

import TodoList from '@/components/TodoList.vue'

export default {

  data() {
    return {
      new_todo: "",
      new_description: "",
      new_category: "",
    }
  },

  components: {
    TodoList
  },

  computed: {
    ...mapWritableState(useTodoStore, ['todos', 'todos_open', 'todos_completed', "show_add_button", "show_dash"]),

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
        console.log(addTodoDescription)
        this.new_description = addTodoDescription
        if(this.new_description === null) {
          this.new_description = "no description given";
        }
      }
    },

    addTodoCategory: {
      get() {
        return this.new_category
      },
      set(addTodoCategory) {
        this.new_category = addTodoCategory
        if(this.new_category === null) {
          this.new_category = "no description given";
        }
      }
    },
  },
  
  methods: {
   ...mapActions(useTodoStore, ['fetchTodos', 'toggleTodo', "editTodo", "saveTodo", "addTodo", "removeTodo"]),

   showDash() {
      this.show_dash = true; 
      this.show_add_button= false; 

      this.$nextTick(() => {
        this.$refs.edit_todo_input.focus();
      })
    }
  },
  
  
  mounted() {
		//something
	}
  

}
</script>


<template>
  <main>

    <h1>TODO's</h1>

    <!-- Tab navigatioon -->
    <ul class="nav nav-tabs" id="myTab" role="tablist">

      <li class="nav-item" role="presentation">
        <button class="nav-link active" id="open-todos-tab" data-bs-toggle="tab" data-bs-target="#open-todos" type="button" role="tab">Open ({{ todos_open != undefined ? todos_open.length : 0 }})</button>
      </li>

      <li class="nav-item" role="presentation">
        <button class="nav-link" id="closed-todos-tab" data-bs-toggle="tab" data-bs-target="#closed-todos" type="button" role="tab">Completed ({{ todos_completed != undefined ? todos_completed.length : 0 }})</button>
      </li>

    </ul>


    <!-- Tab content -->
    <div class="tab-content" id="todos">

      <div class="tab-pane fade show active" id="open-todos" role="tabpanel">
        <TodoList :todos="todos_open"
        @toggle-todo-state="toggleTodo" 
        @edit-todo="editTodo" 
        @save-todo="saveTodo"
        @remove-todo="removeTodo"/>
      </div>

      <div class="tab-pane fade" id="closed-todos" role="tabpanel">
        <TodoList :todos="todos_completed" 
        @toggle-todo-state="toggleTodo" 
        @edit-todo="editTodo" 
        @save-todo="saveTodo"
        @remove-todo="removeTodo"/>
      </div>

    </div>
    <button v-if="show_add_button" class="btn btn-sm btn-outline-secondary margins" @click="showDash()">Add Todo</button>

    <div v-if="show_dash" class="container-flex form-group">
      <input type="text" class="margins form-control theme-softer" id="todoNameInput"
        name="addTodoInput"
        v-model="addTodoText"
        v-on:keyup.enter="addTodo(new_todo, new_description, new_category)"
        ref="edit_todo_input"
        placeholder="Name">
      <textarea id="todoDescriptionId" class="margins justify-right theme-softer" placeholder="Description" cols="25"
        v-model="addTodoDescription"
        v-on:keyup.enter="addTodo(new_todo, new_description, new_category)"
      ></textarea>
      <button class="btn btn-sm btn-outline-secondary" style="width: 15%; margin-top: 1rem; color: white;"
        @click="addTodo(new_todo, new_description, new_category)"
      >Add</button>
    </div>
    <hr />

  </main>
</template>

<style scoped>

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
</style>