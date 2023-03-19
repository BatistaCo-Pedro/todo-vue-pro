import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', {

  state: () => ({ 
    return: {
      edit_todo_id: 0,
			edit_todo: '',
    },
    show_add_button: true,
    show_dash: false,
    todos: [
      {
        id: 1,
        name: "test",
        description: "asssssssssssssd ad asdada dasdad adasd",
        category: "",
        completed: false,
      }
    ],
    current_todo: Object
  }),

  persist: true,

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

    addTodo(new_Todo, new_description, new_category) {
			let new_id;
      console.log(`new todo: ${new_Todo} --- ${new_description} --- ${new_category} --- `)

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
          description: new_description,
          category: new_category,
          completed: false,
        }
			);
      this.show_add_button = true;
      this.show_dash = false;
		},

		removeTodo(id) {
      console.log("removing todo")
      this.todos = this.todos.filter(todo => {
        return todo.id != id;
      });
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
      console.log("third step")
      this.todos = this.todos.filter(todo => {
				if (todo.id == id) {
					todo.name = new_name;
				}
				return todo;
			});

      this.edit_todo_id = 0;
    },
  },
})
