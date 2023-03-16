import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', {

  state: () => ({ 
    return: {
      edit_todo_id: 0,
			edit_todo: ''
    },
    todos: [
      {
        id: 1,
        name: "test",
        completed: false,
      }
    ],
    current_todo: Object
  }),

  getters: {

    todos_completed: (state) => {
      if (state.todos) {
        return state.todos.filter(todo => {
          return todo.completed == true
      });
      }
    },

    todos_open: (state) => {
      if (state.todos) {
        console.log("if")
        return state.todos.filter(todo => {
          return todo.completed == false
        });
      }
    }
  },

  actions: {
    
    async fetchTodos() {
        this.todos = this.todos;
    },

    async toggleTodo(id) {

      // Change in local data
      this.todos = this.todos.map(todo => {
        if (todo.id == id) {
          todo.completed = !todo.completed;
          this.current_todo = todo;
        }
        return todo;
      });
    },

    addTodo(new_Todo) {
			let new_id;
      console.log("adding new todo")

			if (this.todos.length) {
				new_id = (this.todos.slice(-1)[0].id) + 1;
			}
			else {
				new_id = 1;
			}

			this.todos.push(
				{
					id: new_id, 
					name: new_Todo,
          completed: false,
        }
			);
		},

		removeTodo(id) {

			// Emit event
			this.$emit('remove-category', id, this.edit_todo);
		},

    editTodo(id) {
      state.todos.map(todo => {
        if (todo.id == id) {
          this.edit_todo_id = todo.id;
          this.edit_todo = todo.name;
        }
      });
  
    },
  
    saveTodo(id) {

      this.state.todos = this.state.todos.filter(todo => {
				if (todo.id == id) {
					todo.name = new_name;
				}
				return category;
			});

      // Clear edit category
      this.edit_todo_id = 0;
    },
  },
})
