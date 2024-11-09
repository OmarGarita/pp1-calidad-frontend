<template>
  <VSheet class="mx-auto" width="300">
    <VForm ref="formRef" @submit.prevent="onSubmit">
      <VTextField
            v-model="nombre"
            :rules="courseFormRules.nombre"
            label="Nombre"
      ></VTextField>
      <VTextField
            v-model="codigo"
            :rules="courseFormRules.codigo"
            label="Codigo"
      ></VTextField>
      
      <h4 class="text-h5">Semestre</h4>
      
      <VDateInput
        v-model="fechaInicio"
        label="Fecha de inicio"
        max-width="368"
        show-adjacent-months
        :rules="[validarFechas]"
      ></VDateInput>
     
      <VDateInput
        v-model="fechaFin"
        label="Fecha de finalización"
        max-width="368"
        show-adjacent-months
        :rules="[validarFechas]"
      ></VDateInput>
      
      <VBtn color="teal-darken-3" type="submit"> <p class="text-subtitle-1">Registrar</p></VBtn>
    </VForm>
  </VSheet>
  </template>
  
  <script setup>
  import { ref  } from 'vue';
  import {courseFormRules} from '../helpers/courseFormRules.js';
  import {formatearFecha} from '../helpers/formato.js'
  import axiosClient from "@/axiosClient.js";
  import Alerta from '@/helpers/Alerta';
  
  const formRef = ref(null)
  
  //Atributos del estudiante
  const nombre = ref("");
  const codigo= ref("");
  const fechaInicio = ref(null);
  const fechaFin = ref(null);


  // Función de validación para verificar que la fecha de inicio no sea mayor que la de finalización
  const validarFechas = (fecha) => {
    if (!fechaInicio.value || !fechaFin.value) return true;
    if (new Date(fechaInicio.value) > new Date(fechaFin.value)) {
      return 'La fecha de inicio no puede ser mayor que la fecha de finalización';
    }
    return true;
  };

  
  const onSubmit = async () =>{
    const {valid} = await formRef.value.validate();
    if(valid ){
      const fechaInicioFormateada = formatearFecha(fechaInicio.value);
      const fechaFinFormateada = formatearFecha(fechaFin.value);


      const data = {
        semester: {
          startDate: fechaInicioFormateada,
          endDate: fechaFinFormateada
        },
        courseCode: codigo.value,
        courseName: nombre.value
      };

      try{
        await axiosClient.post("/courses", data);
        
        Alerta.showExitoSimple("Se ha registrado el curso")
      } catch (error) {
      Alerta.showError("Error al registrar el curso");
      }
      
    }
  }
  
  </script>
  
  <style scoped>
  p{
    color: white;
  }
  </style>