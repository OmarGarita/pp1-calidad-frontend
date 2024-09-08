<template>
  <VBtn @click="regresar" color="teal-darken-3" class="mt-4 ml-4" icon="mdi-arrow-left" ></VBtn>
  <VMain>
    
    <h1>Agregar hora de consulta</h1>
    <ProfessorScheduleForm />
  </VMain>
</template>

<script setup>
import ProfessorScheduleForm from '../components/ProfessorScheduleForm.vue';
import { useRouter } from 'vue-router';

const router = useRouter();


const regresar = ()=>{
  router.push({name:"professor-module"})
  
}

</script>

<style scoped>
h1{
  text-align: center;
}
</style>