<template>
  <VSheet class="mx-auto" width="350">
    <VForm ref="formRef" @submit.prevent="onSubmit">
      
      <VSelect
        v-model="diaConsulta"
        :items="items.dias"
        label="Dia de consulta"
        clearable
        prepend-icon="mdi-calendar-range"
        chips
      ></VSelect>
      
      <VTextField
        v-model="horaInicio"
        :active="menu1"
        :focus="menu1"
        label="Hora de inicio"
        prepend-icon="mdi-clock-time-four-outline"
      >
        <VMenu
          v-model="menu1"
          :close-on-content-click="false"
          activator="parent"
          transition="scale-transition"
        >
          <VTimePicker
            v-if="menu1"
            v-model="horaInicio"
            full-width
            format="24hr"
          ></VTimePicker>
        </VMenu>
      </VTextField>
      <VTextField
        v-model="horaFin"
        :active="menu2"
        :focus="menu2"
        :rules="horaFinRules"
        label="Hora de fin"
        prepend-icon="mdi-clock-time-four-outline"
      >
        <VMenu
          v-model="menu2"
          :close-on-content-click="false"
          activator="parent"
          transition="scale-transition"
        >
          <VTimePicker
            v-if="menu2"
            v-model="horaFin"
            full-width
            format="24hr"
          ></VTimePicker>
        </VMenu>
      </VTextField>
  
      <VTextField
      v-model="cantCitas"
      :rules="professorFormRules.cantCitas"
      label="cantidad citas"
      type="number"
      ></VTextField>
          
      
      <VBtn color="#40A578" type="submit"> <p class="text-subtitle-1">Registrar</p></VBtn>
    </VForm>
  </VSheet>
</template>
  
<script setup>
import { ref } from 'vue';
import {professorFormRules} from '../helpers/professorFormRules.js';
import { useProfesorStore } from '../stores/profesor';
import {items} from '../helpers/professorFormItems.js'
import { compararHoras } from "../helpers/Formato"
import Alerta from "@/helpers/Alerta.js"

const formRef = ref(null);
const menu1 = ref(false);
const menu2= ref(false);
const profesorStore = useProfesorStore();


//Modelos de las entradas de cada entrada del formulario
const diaConsulta = ref(null);
const horaInicio = ref("");
const horaFin = ref("");
const cantCitas = ref(0);


//Regla para evitar que la hora de fin sea menor a la hora de inicio
const horaFinRules=  [
  
  () => {
    if (compararHoras(horaFin.value, horaInicio.value)){
      return true
    } 

    return 'Debe ingresar una hora válida'
  },
]





const onSubmit = async () =>{
  const {valid} = await formRef.value.validate();
  if(valid ){

    const data = {
      dayOfWeek: diaConsulta.value,
      startTime: horaInicio.value,
      endTime: horaFin.value,
      availableSlots: cantCitas.value
    }
    
    try {
      await profesorStore.addConsultationSchedule(data)
      Alerta.showExitoSimple("Se ha agregado el horario de consulta")
    } catch (error) {
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