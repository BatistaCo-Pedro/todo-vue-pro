import { defineStore } from 'pinia'

function mapTodoPriorities(todoA, todoB) {
    let todos = [todoA, todoB]
    todos.map(todo => {
      if(todo.priority == "Highest") 
        todo.priorityNr = 1
      if(todo.priority == "High") 
        todo.priorityNr = 2
      if(todo.priority == "Medium") 
        todo.priorityNr = 3
      if(todo.priority == "Low") 
        todo.priorityNr = 4  
  })
}

function filterTodos(state, todo) {
  return todo.name.toLowerCase().includes(state.search_bar_input.toLowerCase()) 
   || todo.description.toLowerCase().includes(state.search_bar_input.toLowerCase())
} 

function sortTodosAfterName(state) {

}

function sortTodosAfterPriority(state) {
  state.isSortingName = false
  state.isSortingCategory = false
  state.todos.sort((todoA, todoB) => {
    mapTodoPriorities(todoA, todoB)
    return todoA.priorityNr - todoB.priorityNr
  });
}

function sortTodosAfterCategory(state) {
  state.isSortingName = false
  state.isSortingPriority = false
  console.log(state.todos.sort((todoA, todoB) => {
    return todoA.category.localeCompare(todoB.category)
  })) 
}

export const useTodoStore = defineStore('todo',{

  state: () => ({ 
    show_add_button: true,
    show_dash: false,
    show_filter_dash: false,
    isSortingName: false,
    isSortingPriority: false,
    isSortingCategory: false,
    
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
        priorityNr: 0,
        open: false,
      }
    ],
    current_todo: Object
  }),

  persist: true,

  getters: {

    filters: (state) => {
      return [state.isSortingName, state.isSortingPriority, state.isSortingCategory]
    },

    favorite_todos: (state) => {
      if (!state.todos) return
      //filter todos on search
      if(state.is_searching) {
        return state.todos.filter(todo => {
          return todo.isFavorite && filterTodos(state, todo)
        })
      }
      return state.todos.filter(todo => {
        return todo.isFavorite
      })
    },

    todos_completed: (state) => {
      if (!state.todos) return

      

      //filter todos on search
      if(state.isSortingPriority) {
        return state.todos.filter(todo => {
          return todo.completed == true && filterTodos(state, todo)
        })
      }
      return state.todos.filter(todo => {
        return todo.completed == true
      });  
    },

    todos_open: (state) => {
      if (!state.todos) return
      if(state.isSortingPriority) {
        sortTodosAfterPriority(state)
      }

      if(state.isSortingCategory) {
        sortTodosAfterCategory(state)    
      }

      //if not sorting
      if(state.filters.every(el => el == false)) {
        state.todos.sort((todoA, todoB) => {
          return todoA.id - todoB.id
        })
      } 
      
      //filter todos on search
      if(state.is_searching) {
        return state.todos.filter(todo => {
          return todo.completed == false && filterTodos(state, todo)
        })
      }
      return state.todos.filter(todo => {
        return todo.completed == false
      });
    },
  },

  actions: {
    
    sortTodos(index) {
      if(index == 1) this.isSortingPriority = !this.isSortingPriority
      if(index == 2) this.isSortingCategory = !this.isSortingCategory
      if(index == 0) this.isSortingName = !this.isSortingName 
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
          priority: todoData.priority,
          open: false,
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
