<script>

// Lade Komponente CounterInput
import CounterInput from '@/components/CounterInput.vue'

export default {
  
	components: {
		CounterInput
	}

}
</script>


<template>

    <h1>Pinia Beispiel</h1>

    <p>Counter direkt (über eine Komponente) verändern:</p>

    <CounterInput />
    
</template>
