<script>

// Lade nötige Komponenten für Pinia
import { mapState, mapWritableState, mapActions } from 'pinia'

// Lade Store
import { useCounterStore } from '@/stores/counter'
import { useTodoStore } from '@/stores/todo'

export default {

  data() {
		return {
			some_key: import.meta.env.VITE_SOME_KEY
		}
	},
  
  computed: {
    ...mapWritableState(useCounterStore, ['count']),
    ...mapState(useCounterStore, ['doubleCount'])
  },
  
  methods: {
   ...mapActions(useCounterStore, ['increment', 'reset'])
  }

}
</script>


<template>
  <main>

    <h1>Counter</h1>

    <p>Der Counter ist derzeit {{ count }}</p>
    <p>Das doppelte ist {{ doubleCount }}</p>

    <button class="btn btn-primary me-2" @click="increment()">+1</button>
    <button class="btn btn-outline-primary" @click="reset()">Reset</button>

  </main>
</template>

<style scoped>
.done {
  color: green;
}
.open {
  color: red;
}
</style>