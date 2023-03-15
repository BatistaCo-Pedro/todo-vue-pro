import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {

  state: () => ({ 
    count: 1
  }),

  getters: {

    doubleCount: (state) => state.count * 2

  },

  actions: {
    
    increment() {
      this.count++
    },

    reset() {
      this.count = 0;
    },

  },

  // Save in browser localStorage, that simple with pinia-plugin-persistedstate :-)
  persist: true,

})
