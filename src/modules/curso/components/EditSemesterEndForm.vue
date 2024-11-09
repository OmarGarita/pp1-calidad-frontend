<template>
  <VSheet class="mx-auto" width="300">
    <VForm ref="formRef" @submit.prevent="onSubmit">

      <VDateInput
        v-model="fechaFin"
        label="Fecha de finalización"
        max-width="368"
        show-adjacent-months
      ></VDateInput>
      
      <VBtn color="teal-darken-3" type="submit"> <p class="text-subtitle-1">Registrar</p></VBtn>
    </VForm>
  </VSheet>
  </template>
  
<script setup>
import { ref  } from 'vue';
import {formatearFecha} from '../helpers/formato.js'
import Alerta from '@/helpers/Alerta';
import { useCourseStore } from '../stores/course.js';

const formRef = ref(null)
const courseStore = useCourseStore();

//Atributos del estudiante
const fechaFin = ref(null);


const onSubmit = async () =>{
  const {valid} = await formRef.value.validate();
  if(valid ){
    const fechaFinFormateada = formatearFecha(fechaFin.value);

    const data = {
      endDate: fechaFinFormateada
    }

    try {
      await courseStore.updateCourseEndSemester(data)
      Alerta.showExitoSimple("Fecha de fin actualizada")
    } catch (error) {
      Alerta.showError('Fecha no válida')
    }

  }
}

</script>

<style scoped>
p{
  color: white;
}
</style>