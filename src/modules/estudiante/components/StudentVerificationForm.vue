<template>
  <VSheet class="mx-auto" width="300">
    <VForm ref="formRef" @submit.prevent="onSubmit">
      <h6 class="text-h6">Ingrese su número de carné:</h6>
      <VTextField
            v-model="carne"
            :rules="studentFormRules.id"
            label="Carné"
            type="number"
      ></VTextField>
      <VBtn color="#40A578" type="submit"> <p class="text-subtitle-1">Ingresar</p></VBtn>
    </VForm>
  </VSheet>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import {studentFormRules} from '../helpers/studentFormRules.js';
  import Alerta from '@/helpers/Alerta';
  
  const formRef = ref(null)

  const carne= ref("");
  
  
  const onSubmit = async () =>{
    const {valid} = await formRef.value.validate();
    if(valid){
      const texto = carne.value
      Alerta.showExitoSimple(texto)
    }
  }
  
  </script>
  
  <style scoped>
  p{
    color: white;
  }
  </style>