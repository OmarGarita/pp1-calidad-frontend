<template>
<VSheet class="mx-auto" width="350">
  <VForm ref="formRef" @submit.prevent="onSubmit">
        
    <VTextField
    v-model="nombre"
    :rules="professorFormRules.nombre"
    label="Nombre"
    ></VTextField>
    
    <VBtn color="#40A578" type="submit"> <p class="text-subtitle-1">Registrar</p></VBtn>
  </VForm>
</VSheet>
</template>

<script setup>
import { ref } from 'vue';
import {professorFormRules} from '../helpers/professorFormRules.js';
import Alerta from "@/helpers/Alerta.js"


const formRef = ref(null);

const nombre = ref("");


const onSubmit = async () =>{
  const {valid} = await formRef.value.validate();
  if(valid ){
    const texto = nombre.value;
    Alerta.showExitoSimple(texto)
  }
}

</script>

<style scoped>
p{
  color: white;
}
</style>