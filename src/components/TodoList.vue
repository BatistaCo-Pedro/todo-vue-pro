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
    },

    clone_todo(todoData) {
      console.log("clicked clone " + todoData.id)
      this.$emit("clone-todo", todoData)
    },

    addToFavorites(todoData) {
      if(todoData.isFavorite == false)
        todoData.isFavorite = true
    },
    removeFromFavorites(todoData) {
      if(todoData.isFavorite == true)
        todoData.isFavorite = false
    }
  },
}
</script>


<template>

  <ul class="list-group">

    <li class="list-group-item theme" v-for="todo in todos" style="margin: 0.5rem 0 0 0;" >
      <div class="inline-flex-container-space">
        <h3>{{todo.name}}</h3>
        <div class="inline-flex-container">
          <button @click="clone_todo(todo)" class="button-no-style" style="margin-right: 1rem"><h5 style="margin-right: 0;"><i class="bi bi-clipboard-plus"></i></h5></button>
          <button v-if="todo.isFavorite == false" @click="addToFavorites(todo)" class="button-no-style"><h5 style="margin-right: 0;"><i class="bi bi-star"></i></h5></button>
          <button v-if="todo.isFavorite" @click="removeFromFavorites(todo)" class="button-no-style"><h5 style="margin-right: 0;"><i class="bi bi-star-fill"></i></h5></button>
        </div>
      </div>
      <div class="inline-flex-container" style="width: 100%;">
        <p style="width: 20%;" :class="todo.completed == true ? 'done': 'open'">{{todo.completed == true ? 'Finished!' : 'Open'}}</p>
        <p>{{todo.description.length > 30 ? todo.description.substring(0, 30) + "..." : todo.description}}</p>
      </div>
      <div>
        <p>{{ todo.category }}</p>
      </div>
      <div class="inline-flex-container" style="width: 100%;">
        <button class="btn btn-sm btn-outline-primary m-2 m-mob" @click="toggle_todo_state(todo.id);">{{ todo.completed == true ? ' Open' : ' Complete' }}</button>
        <button class="btn btn-sm btn-outline-primary m-2 m-mob" @click="edit_todo(todo.id);"><i class="bi bi-pen"></i> Edit Todo</button>
        <div class="align-right">
          <button class="btn btn-sm btn-outline-primary m-2 m-mob" style="" @click="remove_todo(todo.id);"><i class="bi bi-trash3"></i> Remove</button>
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
}

.inline-flex-container-space {
  width: 100%;
  display: inline-flex;
  justify-content: space-between;
}

.align-right {
  width: 82%;
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
}

@media (max-width: 1224px) {
  .align-right {
    width: 33%;
    display: flex;
    justify-content: flex-start;
  }

  .m-mob {
    margin: 0.2rem!important;
    font-size: 0.75rem!important;
  }
}
</style>