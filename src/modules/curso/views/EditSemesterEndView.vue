<template>
  <VBtn @click="regresar" color="teal-darken-3" class="mt-4 ml-4" icon="mdi-arrow-left" ></VBtn>
  <VMain>
    
    <h1>Editar fecha de finalización del semestre</h1>
    <EditSemesterEndForm />
  </VMain>
</template>

<script setup>
import EditSemesterEndForm from '../components/EditSemesterEndForm.vue';
import { useRouter } from 'vue-router';

const router = useRouter();


const regresar = ()=>{
  router.push({name:"course-module"})
  
}

</script>

<style scoped>
h1{
  text-align: center;
}
</style>