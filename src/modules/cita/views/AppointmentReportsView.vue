<template>
  <VBtn @click="regresar" color="teal-darken-3" class="mt-4 ml-4" icon="mdi-arrow-left" ></VBtn>
  <VMain>
    <h2>Reportes de Citas</h2>
    <AppointmentReport />
  </VMain>
  
</template>

<script setup>
import { useRouter } from 'vue-router';
import AppointmentReport from '../components/AppointmentReport.vue';


const router = useRouter();

const regresar = ()=>{
  router.go(-1)
  
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