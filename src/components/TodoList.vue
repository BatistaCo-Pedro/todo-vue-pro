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

	}

}
</script>


<template>

  <ul class="list-group">

    <li class="list-group-item" v-for="todo in todos">

      <h3>{{todo.title}}</h3>
      <p :class="todo.completed == true ? 'done': 'open'">{{todo.completed == true ? 'Erledigt!' : 'Offen'}}</p>
      <button class="btn btn-sm btn-outline-primary" @click="toggle_todo_state(todo.id);">{{ todo.completed == true ? 'Offen markieren' : 'Erledigt markieren' }}</button>
    
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
</style>