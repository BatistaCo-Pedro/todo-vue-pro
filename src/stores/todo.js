import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo',{

  state: () => ({ 
    return: {
      edit_todo_id: 0,
			edit_todo: '',
    },
    show_add_button: true,
    show_dash: false,
    //to divide between search and non search todos
    is_searching: false,
    search_bar_input: "",
    todos: [
      {
        id: 1,
        name: "test",
        description: "This is a simple test!",
        category: "No Category",
        completed: false,
        isFavorite: false,
        priority: "Low",
        open: false,
      }
    ],
    current_todo: Object
  }),

  persist: true,

  getters: {

    favorite_todos: (state) => {
      if (!state.todos) return
      //filter todos on search
      if(state.is_searching) {
        return state.todos.filter(todo => {
            return todo.isFavorite && todo.name.toLowerCase().includes(state.search_bar_input.toLowerCase())
        })
      }
      return state.todos.filter(todo => {
        return todo.isFavorite
      })
    },

    todos_completed: (state) => {
      if (!state.todos) return
      //filter todos on search
      if(state.is_searching) {
        return state.todos.filter(todo => {
            return todo.completed && todo.name.toLowerCase().includes(state.search_bar_input.toLowerCase())
        })
      }
      return state.todos.filter(todo => {
        return todo.completed == true
      });  
    },

    todos_open: (state) => {
      if (!state.todos) return
      //filter todos on search
      if(state.is_searching) {
        return state.todos.filter(todo => {
            return todo.completed == false && todo.name.toLowerCase().includes(state.search_bar_input.toLowerCase())
        })
      }
      return state.todos.filter(todo => {
        return todo.completed == false
      });
    },
  },

  actions: {
    
    searchTodos() {
      this.is_searching = true
      return this.todos.filter(todo => {
          return todo.name.toLowerCase().includes(this.search_bar_input.toLowerCase())
      })
    },

    toggleTodo(id) {

      //Change to completed or open
      this.todos = this.todos.map(todo => {
        if (todo.id == id) {
          todo.completed = !todo.completed;
          this.current_todo = todo;
        }
        return todo;
      })
    },

    addTodo(new_Todo, new_description, new_category, new_prority) {
			let new_id;
      console.log(`new todo: ${new_Todo} - ${new_description} - ${new_category}!`)

      //assign new id
			if (this.todos.length) {
				new_id = (this.todos.slice(-1)[0].id) + 1;
			}
			else {
				new_id = 1;
			}

      //Category Validation as it's not required to give a category
      if(new_category == "") {
        new_category = "No Category"
      }

      this.todos.push({
        id: new_id, 
        name: new_Todo,
        description: new_description,
        category: new_category,
        completed: false,
        isFavorite: false,
        priority: new_prority,
        open: false
      });

      //hide dahsboard and show "add todo" button again
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

    cloneTodo(todoData) {
      console.log("cloning todo: " + todoData.id)
      let newCloneId = (this.todos.slice(-1)[0].id) + 1;
      
      this.todos.push(
				{
					id: newCloneId, 
					name: todoData.name,
          description: todoData.description,
          category: todoData.category,
          completed: todoData.completed,
          isFavorite: todoData.isFavorite,
          priority: todoData.priority
        }
			);
    }
  },
})

export const useCategoryStore = defineStore('category', {

  state: () => ({ 
    return: {},
    categories: [
      {
        id: 1,
        name: 'Schule'
      },
      {
        id: 2,
        name: 'Privat'
      }
    ]
  }),

  persist: true,

  getters: {
    //get the names only -> shown in the multiselect when adding a new todo
    category_names: (state) => {
      let categoryNames = []
      if (state.categories) {
        state.categories.map(category => {
          categoryNames.push(category.name)
        })
      }
      return categoryNames;
    }
  },

  actions: {
    
    addCategory(new_category) {
      let new_id;

      //assigning new id
      if (this.categories.length) {
        new_id = (this.categories.slice(-1)[0].id) + 1;
      }
      else {
        new_id = 1;
      }

      this.categories.push(
        {
          id: new_id, 
          name: new_category
        }
      );
    },

    saveCategory(data) {
      this.categories = this.categories.filter(category => {
        if (category.id == data.id) {
          category.name = data.new_name;
        }
        return category;
      });

    },

    removeCategory(id) {
      this.categories = this.categories.filter(category => {
        return category.id != id;
      });
    }
  },
})
