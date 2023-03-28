<script>

import VueMultiselect from 'vue-multiselect'
import { useTextareaAutosize } from '@vueuse/core'

export default {
  name: 'TodoList',

  setup() {
    const { textarea } = useTextareaAutosize()
  },

  data() {
    return {
      screenWidth: 0,
      descriptionOpen: false,
      inputHeight: 0,
      descriptionValue: "",
    }

  },

	props: {
    todos: Array,
  },

  components: {
    VueMultiselect,
  },

  methods: {

		toggle_todo_state(id) {
			this.$emit('toggle-todo-state', id)
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
      this.descriptionValue = todo.description
      todo.open = !todo.open;
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
    },

    adaptDescription(el) {
      console.log("el")
      this.descriptionValue = el.target.innerText
    },

    adaptTodoDescription(todo) {
      console.log(todo)
      todo.description = this.descriptionValue
    },
  },

  mounted() {
    this.updateScreenWidth();
    this.onScreenResize();
  }
}
</script>

<template>
  <div v-for="todo in todos" style="width: 100%;">
    <div class="inline-flex-container" style="width: 100%;">
      <div class="check-button-container">
        <button v-if="screenWidth > 900" class="btn btn-sm btn-outline-secondary m-2 m-mob"
          style="color: var(--color-text); border-color: var(--color-text);" 
          @click="toggle_todo_state(todo.id);">
          <h5 style="margin: 0;"><i v-if="todo.completed == false" class="bi bi-check2"></i></h5>
          <h5 style="margin: 0;"><i v-if="todo.completed" class="bi bi-x-lg"></i></h5>
        </button>
      </div>

      <ul class="list-group" style="width: 100%;">

        <li class="list-group-item theme" style="margin: 0.5rem 0 0 0; width: 100%;">

          <!-- Top third of the todo -->
          <div class="inline-flex-container-space">

            <h3>{{ todo.name }}</h3>

            <!-- Priorities -->
            <div class="inline-flex-container">
              <div v-if="todo.priority == 'Low'" class="priorities">
                <h5 style="color: green;"><i class="bi bi-4-circle-fill"></i></h5>
              </div>
              <div v-if="todo.priority == 'Medium'" class="priorities">
                <h5 style="color: darkgoldenrod;"><i class="bi bi-3-circle-fill"></i></h5>
              </div>
              <div v-if="todo.priority == 'High'" class="priorities">
                <h5 style="color: orangered;"><i class="bi bi-2-circle-fill"></i></h5>
              </div>
              <div v-if="todo.priority == 'Highest'" class="priorities">
                <h5 style="color: red;"><i class="bi bi-1-circle-fill"></i></h5>
              </div>

              <!-- Copy Button -->
              <button v-if="!todo.completed" @click="clone_todo(todo)" class="button-no-style" style="margin-right: 1rem">
                <h5 style="margin-right: 0;"><i class="bi bi-clipboard-plus"></i></h5>
              </button>

              <!-- Favorite -->
              <button v-if="todo.isFavorite == false" @click="addToFavorites(todo)" class="button-no-style">
                <h5 style="margin-right: 0;"><i class="bi bi-star"></i></h5>
              </button>
              <button v-if="todo.isFavorite" @click="removeFromFavorites(todo)" class="button-no-style">
                <h5 style="margin-right: 0;"><i class="bi bi-star-fill"></i></h5>
              </button>
            </div>
          </div>

          <!-- Second part of the todo-->
          <div class="inline-flex-container" style="width: 100%; height: 1.3rem;">

            <!-- Completion status -->
            <p style="width: 25%;" :class="todo.completed == true ? 'done' : 'open'">{{ todo.completed == true ? 'Finished!' : 'Open' }}</p>

            <!-- Description -->
            <input class="input-no-style theme" v-if="!todo.open && todo.description.length < 60" 
            v-model="todo.description" :on-change="ajustSize"
            style="width: 75%;">
            <p style="width: ;" v-else v-if="!todo.open">{{ descriptionToShow(todo) }}</p>
            <button v-if="!todo.open && todo.description.length > 60" class="button-no-style" style="display: flex;" @click="showDescription(todo)">
              <i class="bi bi-caret-down-fill" style="align-self:self-start; margin-left: 1rem;"></i>
            </button>
          </div>

          <div v-if="todo.open" class="inline-flex-container" style="width: 100%;">

            <p class="theme" style="width: 80%;" contenteditable 
            @input="adaptDescription" :on-keyup="adaptTodoDescription(todo)"
            ref="description"> 
              {{ todo.description }} 
            </p>

            <button v-if="edit_todo_id != todo.id" class="button-no-style" style="display: flex;" @click="showDescription(todo)">
              <i class="bi bi-caret-up-fill" style="align-self:self-start; margin-left: 1rem;"></i>
            </button>
          </div>

          <div class="inline-flex-container" style="width: 100%; height: 2.2rem;">
            <h6 style="align-self: center; margin: 0; width: 70%;">{{ todo.category }}</h6>
            <div class="align-right">
              <button v-if="screenWidth < 900" class="btn btn-sm m-2 m-mob"
                style="border: none;" @click="toggle_todo_state(todo.id);">
                <h3 style="margin: 0;"><i v-if="todo.completed == false" class="bi bi-check2"></i></h3>
                <h3 style="margin: 0;"><i v-if="todo.completed" class="bi bi-x-lg"></i></h3>
              </button>
              <button v-if="screenWidth < 900" class="btn btn-sm m-2 m-mob" style="border: none;"
               @click="remove_todo(todo.id);"><h5><i class="bi bi-trash3"></i></h5></button>
              <button v-else class="btn btn-sm m-2 m-mob" style="border-color: var(--color-text); color: var(--color-text);"
               @click="remove_todo(todo.id);"><i class="bi bi-trash3"></i>{{ " Remove" }}</button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</div></template>

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

.input-no-style {
  border: none;
  color: var(--color-text);
}

.textarea-no-style {
  border: none;
  color: var(--color-text);
  resize: none;
  overflow: hidden;
  outline: none;
  padding: 0;
  box-shadow: none;
  height: 0;
  word-wrap: break-word
}

textarea:focus {
  outline: none;
}

input:focus {
  outline: none;
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