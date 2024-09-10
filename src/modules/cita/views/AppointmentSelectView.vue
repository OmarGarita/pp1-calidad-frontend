<template>
  <VBtn @click="regresar" color="teal-darken-3" class="mt-4 ml-4" icon="mdi-arrow-left" ></VBtn>
  <VMain>
    <h2>Selección de citas</h2>
    <AppointmentSelection />
    
  </VMain>
</template>

<script setup>
import AppointmentSelection from '../components/AppointmentSelection.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const regresar = ()=>{
  router.push({name: 'appointments-module'})
  
}

</script>

<style scoped>
h2{
  text-align: center;
}
</style>