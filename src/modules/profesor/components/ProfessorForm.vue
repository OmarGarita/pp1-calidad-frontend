<template>
<VSheet class="mx-auto" width="350">
  <VForm ref="formRef" @submit.prevent="onSubmit">
        
    <VTextField
    v-model="nombre"
    :rules="professorFormRules.nombre"
    label="Nombre"
    ></VTextField>
    
    <VBtn color="teal-darken-3" type="submit"> <p class="text-subtitle-1">Registrar</p></VBtn>
  </VForm>
</VSheet>
</template>

<script setup>
import { ref } from 'vue';
import {professorFormRules} from '../helpers/professorFormRules.js';
import Alerta from "@/helpers/Alerta.js"
import axiosClient from "@/axiosClient";



const formRef = ref(null);

const nombre = ref("");


const onSubmit = async () =>{
  const {valid} = await formRef.value.validate();
  if(valid ){
    
    const data = {
      name: nombre.value 
    }
    try{
      await axiosClient.post("/professors", data)
      Alerta.showExitoSimple("Se ha agregado el profesor")
    } catch(error){
      Alerta.showError("")
    }
  }
}

</script>

<style scoped>
p{
  color: white;
}
</style>