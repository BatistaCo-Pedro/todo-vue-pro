<script>

export default {
  name: 'TodoList',

  data() {
    return {
      descriptionOpen: false,
      edited_description: "",
      edit_todo_id: -1,
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
    },

    showDescription(todo) {
      todo.open = !todo.open;
    },

    edit_description(todo) {
      this.edit_todo_id = todo.id;
      this.edited_description = todo.description;

      console.log(this.$refs)

      this.$nextTick(() => {
        this.$refs.edit_description_input.focus()
      })
    },

    save_description(todo) {
      todo.description = this.edited_description;
      this.edit_todo_id = -1;

    },
  },
}
</script>

<template>

  <ul class="list-group">

    <li class="list-group-item theme" v-for="todo in todos" style="margin: 0.5rem 0 0 0;" >
      <div class="inline-flex-container-space">
        <h3>{{todo.name}}</h3>
        <div class="inline-flex-container">
          <div v-if="todo.priority == 'Low'" class="priorities"><h5 style="color: green;"><i class="bi bi-4-circle-fill"></i></h5></div>
          <div v-if="todo.priority == 'Medium'" class="priorities"><h5 style="color: darkgoldenrod;"><i class="bi bi-3-circle-fill"></i></h5></div>
          <div v-if="todo.priority == 'High'" class="priorities"><h5 style="color: orangered;"><i class="bi bi-2-circle-fill"></i></h5></div>
          <div v-if="todo.priority == 'Highest'" class="priorities"><h5 style="color: red;"><i class="bi bi-1-circle-fill"></i></h5></div>

          <button @click="clone_todo(todo)" class="button-no-style" style="margin-right: 1rem"><h5 style="margin-right: 0;"><i class="bi bi-clipboard-plus"></i></h5></button>
          <button v-if="todo.isFavorite == false" @click="addToFavorites(todo)" class="button-no-style"><h5 style="margin-right: 0;"><i class="bi bi-star"></i></h5></button>
          <button v-if="todo.isFavorite" @click="removeFromFavorites(todo)" class="button-no-style"><h5 style="margin-right: 0;"><i class="bi bi-star-fill"></i></h5></button>
        </div>
      </div>

      <div class="inline-flex-container" style="width: 100%;">
        <p style="width: 20%;" :class="todo.completed == true ? 'done': 'open'">{{todo.completed == true ? 'Finished!' : 'Open'}}</p>
        <p v-if="!todo.open" >{{todo.description.length > 25 ? todo.description.substring(0, 25) + "..." : todo.description}}</p>
        <button v-if="!todo.open" class="button-no-style" style="display: flex;" @click="showDescription(todo)">
          <i class="bi bi-caret-down-fill" style="align-self:self-start; margin-left: 1rem;"></i>
        </button>
      </div>

      <div v-if="todo.open" class="inline-flex-container" style="width: 100%;">

        <input v-if="edit_todo_id == todo.id" 
					v-model="edited_description"
					v-on:keyup.enter="save_description(todo)"
					ref="edit_description_input"
					class="form-control"
          style="width: 100%;"
					>
        <p v-else>{{ todo.description }}</p>

        <button class="button-no-style" style="display: flex;" @click="edit_description(todo)">
          <i class="bi bi-pencil" style="align-self:self-start; margin-left: 1rem;"></i>
        </button>
        <button class="button-no-style" style="display: flex;" @click="showDescription(todo)">
          <i class="bi bi-caret-up-fill" style="align-self:self-start; margin-left: 1rem;"></i>
        </button>
      </div>

      <div>
        <h6>{{ todo.category }}</h6>
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

.priorities {
  margin: 0.3rem 1rem 0 0
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

  .priorities {
    margin: 0.125rem 1rem 0 0!important
  }
}
</style>