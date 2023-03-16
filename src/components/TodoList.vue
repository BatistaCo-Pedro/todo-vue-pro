<script>

export default {
  name: 'TodoList',

  data() {
    return {
      show_add_button: true,
      show_dash: false,
    }
  },

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

    add_todo() {
      this.$emit("add-todo")
    },

    save_todo() {
      this.$emit("save-todo")
    },

    showDash() {
      this.show_dash = true; 
      this.show_add_button= false; 

      this.$nextTick(() => {
        this.$refs.edit_todo_input.focus();
      })
    }
  },
}
</script>


<template>

  <ul class="list-group">

    <li class="list-group-item" v-for="todo in todos">

      <h3>{{todo.title}}</h3>
      <p :class="todo.completed == true ? 'done': 'open'">{{todo.completed == true ? 'Erledigt!' : 'Offen'}}</p>
      <button class="btn btn-sm btn-outline-primary" @click="toggle_todo_state(todo.id);">{{ todo.completed == true ? 'Offen markieren' : 'Erledigt markieren' }}</button>
      <button class="btn btn-sm btn-outline-primary" @click="edit_todo(todo.id);">Edit Todo</button>
    </li>
  </ul>
  <button v-if="show_add_button" class="btn btn-sm btn-outline-secondary margins" @click="showDash()">Add Todo</button>

  <div v-if="show_dash" class="container-flex">
    <form>
      <input type="text" class="margins" id="todoNameInput"
      v-model="edit_category"
      v-on:keyup.enter="save_todo(id)"
      ref="edit_todo_input"
      placeholder="Name">
      <textarea id="todoDescriptionId" class="margins justify-right" placeholder="Description" cols="25"></textarea>
    </form>
  </div>
  
</template>

<style scoped>
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