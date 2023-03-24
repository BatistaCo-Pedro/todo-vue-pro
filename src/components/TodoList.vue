<script>

export default {
  name: 'TodoList',

  data() {
    return {
      screenWidth: 0,
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

    editDescription(todo) {
      this.edit_todo_id = todo.id;
      this.edited_description = todo.description;
    },

    saveDescription(todo) {
      todo.description = this.edited_description;
      this.edit_todo_id = -1;
      todo.open = false
    },

    onScreenResize() {
      window.addEventListener("resize", () => {
        this.updateScreenWidth();
      });
    },

    updateScreenWidth() {
      this.screenWidth = window.innerWidth;
    },

    descriptionToShow(todo) {
      if(this.screenWidth < 800) return todo.description.substring(0, 20) + "..."
      if(todo.description.length > 60) return todo.description.substring(0, 60) + "..."
      return todo.description
    }
  },

  mounted() {
    this.updateScreenWidth();
    this.onScreenResize();
  }
}
</script>

<template>
  <div  v-for="todo in todos" style="width: 100%;" >
  <div class="inline-flex-container" style="width: 100%;">
    <div class="check-button-container">
      <button v-if="screenWidth > 900" class="btn btn-sm btn-outline-primary m-2 m-mob" 
      style="color: white; border-color: white;"
      @click="toggle_todo_state(todo.id);">
        <h5 style="margin: 0;"><i v-if="todo.completed == false" class="bi bi-check2"></i></h5>
        <h5 style="margin: 0;"><i v-if="todo.completed" class="bi bi-x-lg"></i></h5>
      </button>
    </div>
  
  <ul class="list-group" style="width: 100%;">

    <li class="list-group-item theme" style="margin: 0.5rem 0 0 0; width: 100%;" >
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

      <div class="inline-flex-container" style="width: 100%; height: 1.3rem;">
        <p style="width: 25%;" :class="todo.completed == true ? 'done': 'open'">{{todo.completed == true ? 'Finished!' : 'Open'}}</p>
        <p v-if="!todo.open" >
        {{ descriptionToShow(todo) }}</p>
        <button v-if="!todo.open" class="button-no-style" style="display: flex;" @click="showDescription(todo)">
          <i class="bi bi-caret-down-fill" style="align-self:self-start; margin-left: 1rem;"></i>
        </button>
      </div>

      <div v-if="todo.open" class="inline-flex-container" style="width: 100%;">

        <input v-if="edit_todo_id == todo.id" 
					v-model="edited_description"
					v-on:keyup.enter="saveDescription(todo)"
					ref="edit_description_input"
					class="form-control"
          style="width: 100%;"
					>
        <p v-else>{{ todo.description }}</p>

        <button class="button-no-style" style="display: flex;" @click="editDescription(todo)">
          <i class="bi bi-pencil" style="align-self:self-start; margin-left: 1rem;"></i>
        </button>
        <button class="button-no-style" style="display: flex;" @click="showDescription(todo)">
          <i class="bi bi-caret-up-fill" style="align-self:self-start; margin-left: 1rem;"></i>
        </button>
      </div>
      <div class="inline-flex-container" style="width: 100%; height: 2.2rem;">
        <h6 style="width: 70%; align-self: center;">{{ todo.category }}</h6>
        <div class="align-right">
          <button v-if="screenWidth < 900" class="btn btn-sm btn-outline-primary m-2 m-mob" 
          style="color: var(--color-text); border-color: var(--color-text);"
          @click="toggle_todo_state(todo.id);">
          <h5 style="margin: 0;"><i v-if="todo.completed == false" class="bi bi-check2"></i></h5>
          <h5 style="margin: 0;"><i v-if="todo.completed" class="bi bi-x-lg"></i></h5>
          </button>
          <button class="btn btn-sm btn-outline-primary m-2 m-mob" 
          style="border-color: var(--color-text); color: var(--color-text);" @click="remove_todo(todo.id);"><i class="bi bi-trash3"></i> {{ screenWidth > 900 ? "Remove" : "" }}</button>
        </div>  
      </div> 
    </li>
  </ul>
  </div>
  </div>
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
  align-content: center;
}

.check-button-container {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  margin: 0 0.5rem 0 0;
}

@media (max-width: 900px) {
  .align-right {
    display: flex;
    justify-content: flex-end;
    align-content: center;
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