<template>
  <VSheet class="mx-auto" width="300">
    <VForm ref="formRef" @submit.prevent="onSubmit">
      <h6 class="text-h6">Ingrese su nombre:</h6>
      <VTextField
            v-model="nombre"
            :rules="professorFormRules.nombre"
            label="Nombre"
            type="text"
      ></VTextField>
      <VBtn color="#40A578" type="submit"> <p class="text-subtitle-1">Ingresar</p></VBtn>
    </VForm>
  </VSheet>
</template>
  
<script setup>
import { ref } from 'vue';
import {professorFormRules} from '../helpers/professorFormRules.js';
import { useProfesorStore } from '../stores/profesor';
import { useRouter } from 'vue-router';
import Alerta from '@/helpers/Alerta';
 
const profesorStore = useProfesorStore();
const router = useRouter();
const formRef = ref(null);

const nombre= ref("");


const onSubmit = async () =>{
  const {valid} = await formRef.value.validate();
  if(valid){
    try{
      await profesorStore.fetchProfessorByName(nombre.value)
      
      router.push({name:"professor-schedule"})
    } catch(error){
      Alerta.showError("No se encontro al profesor")
    }
    
  }
}

</script>

<style scoped>
p{
  color: white;
}
</style>