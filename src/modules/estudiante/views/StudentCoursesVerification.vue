<template>
  <VBtn @click="regresar" color="teal-darken-3" class="mt-4 ml-4" icon="mdi-arrow-left" ></VBtn>
  <VMain>
    
    <h1>Consultar Cursos</h1>
    <StudentVerificationForm />
  </VMain>
</template>

<script setup>
import StudentVerificationForm from '../components/StudentVerificationForm.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const regresar = ()=>{
  router.go(-1)
}

</script>

<style scoped>
h1{
  text-align: center;
}

</style>