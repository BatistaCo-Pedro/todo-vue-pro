<script>

export default {
  name: 'TodoList',

	props: {
    todos: Array,
  },

  methods: {

		toggle_todo_state(id) {
			this.$emit('toggle-todo-state', id)
		},

    edit_todo(id) {
      this.$emit("edit-todo", id)
    },

    save_todo() {
      this.$emit("save-todo")
    },

    remove_todo(id) {
      this.$emit("remove-todo", id)
    }
  },
}
</script>


<template>

  <ul class="list-group">

    <li class="list-group-item theme" v-for="todo in todos" style="margin: 0.5rem 0 0 0;" >

      <h3>{{todo.name}}</h3>
      <div class="inline-flex-container" style="width: 100%;">
        <p style="width: 20%;" :class="todo.completed == true ? 'done': 'open'">{{todo.completed == true ? 'Finished!' : 'Open'}}</p>
        <p>{{todo.description}}</p>
      </div>
      <div class="inline-flex-container" style="width: 100%;">
          <div style="width: 40%;">
          <button class="btn btn-sm btn-outline-primary m-2" @click="toggle_todo_state(todo.id);">{{ todo.completed == true ? 'Open' : 'Complete' }}</button>
          <button class="btn btn-sm btn-outline-primary m-2" @click="edit_todo(todo.id);">Edit Todo</button>
        </div>  
        <div class="align-right" style="width: 60%;">
          <button class="btn btn-sm btn-outline-primary m-2" @click="remove_todo(todo.id);">Remove </button>
        </div>
      </div> 
    </li>
  </ul>
  
</template>

<style scoped>
.done {
  color: green;
}

.open {
  color: red;
}

.inline-flex-container {
  display: inline-flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.align-right {
  display: inline-flex;
  justify-content: flex-end;
  flex-wrap: wrap;
}

@media (max-width: 1024px) {
  .align-right {
    
  }
}
</style>