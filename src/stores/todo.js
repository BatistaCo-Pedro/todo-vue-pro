import { defineStore } from 'pinia'
import axios from 'axios'

export const useTodoStore = defineStore('todo', {

  state: () => ({ 
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
      let check = null;
      if (state.todos) {
        check = state.todos.filter(todo => (
           todo.completed == true
        ));
      }
      console.log(check)
      return check
    },

    todos_open: (state) => {
      let check = null;
      if (state.todos) {
        console.log("if")
        check = state.todos.filter(todo => {
          console.log(todo)
          return todo.completed == false
        });
      }
      console.log(check)
      return check
    }

  },

  actions: {
    
    async fetchTodos() {
        this.todos = this.todos;
    },

    async toggleTodo(id) {

      // Change in local data
      this.todos.data = this.todos.data.map(todo => {
        if (todo.id == id) {
          todo.completed = !todo.completed;
          this.current_todo = todo;
        }
        return todo;
      });


      // PUT request to server after toggle... :-)
      await axios.put(`http://localhost:3000/todos/${id}`, {
        title: this.current_todo.title,
        completed: this.current_todo.completed
      });

    },
    

    async addTodo() {

    },

    async editTodo() {

      // TODO :-)
      // Axios PUT request

    },

    async deleteTodo() {

      // TODO :-)
      // Axios DELETE request

    }

  },

})
