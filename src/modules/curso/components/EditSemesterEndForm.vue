<template>
  <VSheet class="mx-auto" width="300">
    <VForm ref="formRef" @submit.prevent="onSubmit">

      <VDateInput
        v-model="fechaFin"
        label="Fecha de finalización"
        max-width="368"
        show-adjacent-months
      ></VDateInput>
      
      <VBtn color="#40A578" type="submit"> <p class="text-subtitle-1">Registrar</p></VBtn>
    </VForm>
  </VSheet>
  </template>
  
  <script setup>
  import { ref  } from 'vue';
  import {formatearFecha} from '../helpers/formato.js'
  import Alerta from '@/helpers/Alerta';
  import {useCodigoStore} from '../stores/codigoCursoStore.js'
  
  const formRef = ref(null)
  const codigoStore = useCodigoStore();
  
  //Atributos del estudiante
  const fechaFin = ref(null);

  
  const onSubmit = async () =>{
    const {valid} = await formRef.value.validate();
    if(valid ){
      const fechaFinFormateada = formatearFecha(fechaFin.value);
      const texto = fechaFinFormateada + " " + codigoStore.codigo.value
      Alerta.showExitoSimple(texto)
    }
  }
  
  </script>
  
  <style scoped>
  p{
    color: white;
  }
  </style>