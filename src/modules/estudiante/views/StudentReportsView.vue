<template>
  <VBtn @click="regresar" color="teal-darken-3" class="mt-4 ml-4" icon="mdi-arrow-left" ></VBtn>
  <VMain>
    <h2>Reportes de estudiantes</h2>

    <StudentReport />
  </VMain>
  
</template>

<script setup>
import { useRouter } from 'vue-router';
import StudentReport from '../components/StudentReport.vue'

const router = useRouter();

const regresar = ()=>{
  router.push({name:"student-module"})
  
}



</script>

<style scoped> 
h2{
  text-align: center;
}
p{
  color: white;
}
</style>