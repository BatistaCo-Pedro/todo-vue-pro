<script>

// Lade nötige Komponenten für Pinia
import { mapWritableState } from 'pinia'

// Lade Store
import { useCounterStore } from '@/stores/counter'

export default {
	name: 'CounterInput',

  data() {
		return {
			// No local data
		}
	},
  
  computed: {
    ...mapWritableState(useCounterStore, ['count']),
  }

}

</script>

<template>
	
	<input v-model="count">
	
</template>
