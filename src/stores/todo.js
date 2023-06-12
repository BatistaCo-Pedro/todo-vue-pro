import { defineStore } from 'pinia'

//----------------------- Search ---------------------------
function filterTodos(state, todo) {
  return todo.name.toLowerCase().includes(state.search_bar_input.toLowerCase())
    || todo.description.toLowerCase().includes(state.search_bar_input.toLowerCase())
}

//----------------------------------------------------------

//#region ----------------- Filtering ----------------------

function sortTodosAfterName(state) {
  state.todos.sort((todoA, todoB) => {
    return todoA.name.localeCompare(todoB.name)
  })
}

function sortTodosAfterPriority(state) {
  state.todos.sort((todoA, todoB) => {
    return todoA.priorityNr - todoB.priorityNr
  });
}

function sortTodosAfterCategory(state) {
  state.todos.sort((todoA, todoB) => {
    return todoA.category.localeCompare(todoB.category)
  })
}

//switch to know what filter
function sorting(state) {
  if (state.isSortingPriority) {
    sortTodosAfterPriority(state)
  }

  if (state.isSortingCategory) {
    sortTodosAfterCategory(state)
  }

  if (state.isSortingName) {
    sortTodosAfterName(state)
  }
}

//#endregion ----------------------------------------------------------

export const useTodoStore = defineStore('todo', {

  state: () => ({
    show_add_button: true,
    
    //add-button dashboard
    show_dash: false,
    
    //filters
    show_filter_dash: false,
    isSortingName: false,
    isSortingPriority: false,
    isSortingCategory: false,

    //to divide between search and non search todos
    is_searching: false,

    search_bar_input: "",
    todos: [],
  }),

  persist: true,

  getters: {

    //retur an array with the filter variables to loop thorugh in TodoView
    filters: (state) => {
      return [state.isSortingName, state.isSortingPriority, state.isSortingCategory]
    },

    //favorite todos with search and filter methods
    favorite_todos: (state) => {
      if (!state.todos) return

      //filter todos 
      sorting(state)

      //search todos
      if (state.is_searching) {
        return state.todos.filter(todo => {
          return todo.isFavorite && filterTodos(state, todo)
        })
      }

      //if not filtering, order by id
      if (state.filters.every(el => el == false)) {
        state.todos.sort((todoA, todoB) => {
          return todoA.id - todoB.id
        })
      }

      //show only favorites
      //only here do we return out of the function
      return state.todos.filter(todo => {
        return todo.isFavorite
      })
    },

    //finished todos with search and filter methods
    todos_completed: (state) => {
      if (!state.todos) return

      //filter todos 
      sorting(state)

      //search todos
      if (state.is_searching) {
        return state.todos.filter(todo => {
          return todo.completed && filterTodos(state, todo)
        })
      }

      //if not filtering, order by id
      if (state.filters.every(el => el == false)) {
        state.todos.sort((todoA, todoB) => {
          return todoA.id - todoB.id
        })
      }

      //show only completed
      //only here do we return out of the function
      return state.todos.filter(todo => {
        return todo.completed == true
      });
    },

    //open todos with search and filter methods
    todos_open: (state) => {
      if (!state.todos) return

      //filter todos 
      sorting(state)

      //search todos
      if (state.is_searching) {
        return state.todos.filter(todo => {
          return todo.completed == false && filterTodos(state, todo)
        })
      }

      //if not filtering, order by id
      if (state.filters.every(el => el == false)) {
        state.todos.sort((todoA, todoB) => {
          return todoA.id - todoB.id
        })
      }

      //show only open
      //only here do we return out of the function
      return state.todos.filter(todo => {
        return todo.completed == false
      });
    },
  },

  actions: {

    //used in TodoView.vue for the v-for for the filter
    //switch to activate/deactivate the filter and deactivating all the other ones
    sortTodos(index) {
      if (index == 0) {
        this.isSortingName = !this.isSortingName
        this.isSortingCategory = false
        this.isSortingPriority = false
      }
      if (index == 1) {
        this.isSortingPriority = !this.isSortingPriority
        this.isSortingName = false
        this.isSortingCategory = false
      }
      if (index == 2) {
        this.isSortingCategory = !this.isSortingCategory
        this.isSortingName = false
        this.isSortingPriority = false
      }
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

    addTodo(new_Todo, new_description, new_category_id, new_prority) {
      let new_id;
      let new_category;
      //getting category store to connect category ids to the todos
      const catStore = useCategoryStore()

      //assign new id
      if (this.todos.length) {
        new_id = (this.todos.slice(-1)[0].id) + 1;
      }
      else {
        new_id = 1;
      }

      //Category Validation as it's not required to give a category
      if (new_category_id == -1) {
        new_category = "No Category"
      }
      else {
        new_category = catStore.categories.find(category => {
          return category.id == new_category_id
        }).name
      }

      //push new todo to the todos list
      this.todos.push({
        id: new_id,
        name: new_Todo,
        description: new_description,
        category: new_category,
        categoryId: new_category_id,
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
      this.todos = this.todos.filter(todo => {
        return todo.id != id;
      });
    },

    cloneTodo(todoData) {
      //assign new id
      let newCloneId = (this.todos.slice(-1)[0].id) + 1;

      //push new todo exactly as the given parameter todo except for the id
      this.todos.push(
        {
          id: newCloneId,
          name: todoData.name,
          description: todoData.description,
          category: todoData.category,
          categoryId: todoData.categoryId,
          completed: todoData.completed,
          isFavorite: todoData.isFavorite,
          priority: todoData.priority,
          open: false,
        }
      );
    },

    mapTodoCategories(categories) {

      this.todos.map(todo => {
        for(let i = 0; i < categories.length; i++) {
          if(todo.categoryId == categories[i].id) {
            todo.category = categories[i].name
          }
        }
      })
    }
  },
})

export const useCategoryStore = defineStore('category', {

  state: () => ({
    return: {},
    categories: [],
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

      //pushing new category
      this.categories.push(
        {
          id: new_id,
          name: new_category
        }
      );
    },

    saveCategory(data) {
      //to sync to todos
      const todosStore = useTodoStore()

      //change category
      this.categories = this.categories.filter(category => {
        if (category.id == data.id) {
          //edit category values
          category.id = data.id
          category.name = data.new_name;

          //get todos using this category
          let todos_to_change = todosStore.todos.filter(todo => {
            return todo.categoryId == category.id
          })

          //if there are todos using this category change it's name to match the edited name
          if (todos_to_change != null) {
            //go thorugh all of the todos and change the category
            todos_to_change.map(todo => {
              todo.category = category.name
            })
          }
        }
        return category;
      });

    },

    removeCategory(id) {
      const todosStore = useTodoStore()

      //remove categories that match the id
      this.categories = this.categories.filter(category => {
        return category.id != id;
      });

      //find todo co
      let todos_to_change = todosStore.todos.filter(todo => {
        return todo.categoryId == id
      })

      if (todos_to_change != null) {
        //go thorugh all of the todos and change the category to "No Category"
        todos_to_change.map(todo => {
          todo.category = "No Category"
          //adapt catagory id to make sure data is consistent
          todos_to_change.categoryId = -1
        })
      }
    }
  },
})
