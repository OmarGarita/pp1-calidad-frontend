<template>
  <VContainer>
      <!-- Formulario de Filtros -->
      <VForm @submit.prevent="aplicarFiltros">
      <VRow>
        <VCol>
          <VTextField
            v-model="filtros.studentIdCard"
            label="Carné del Estudiante"
            outlined
          ></VTextField>
        </VCol>
        <VCol>
          <VTextField
            v-model="filtros.courseName"
            label="Curso"
            outlined
          ></VTextField>
        </VCol>
      </VRow>
      <VRow>
        <VCol>
          <VTextField
            v-model="filtros.startDateTime"
        
            label="Dia"
            outlined
            clearable
            type="datetime-local"
          ></VTextField>
        </VCol>
        <VCol>
          <VTextField
            v-model="filtros.professorName"
            label="Profesor"
            outlined
          ></VTextField>
        </VCol>
      </VRow>

      <VBtn type="submit" color="primary">Aplicar Filtros</VBtn>
      <VBtn @click="onReset" class="ma-2" color="primary">Limpiar Filtros</VBtn>
    </VForm>

    <!-- Tabla de reportes -->
    <VDataTable
      :headers="headers"
      :items="reportes"
      :search="busqueda"
      :items-per-page="5"
      class="mt-4"
    >
     
      <template v-slot:item.curso="{ item }">
        {{ item.curso }}
      </template>
      <template v-slot:item.profesor="{ item }">
        {{ item.profesor }}
      </template>
      <template v-slot:item.dia="{ item }">
        {{ item.dia }}
      </template>
      <template v-slot:item.hora="{ item }">
        {{ item.hora }}
      </template>
      <template v-slot:item.tipo="{ item }">
        {{ item.tipo }}
      </template>
    </VDataTable>
  </VContainer>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';

import { useAppointmentStore } from '../stores/cita';

const citaStore = useAppointmentStore();

// Variables reactivas para los filtros
const filtros = ref({
  studentIdCard: null,
  courseName: null,
  professorName: null,
  startDateTime: null,
});


//TODO: Obtener los reportes desde el api
// Ejemplo de reportes
const reportes = ref(citaStore.reports);


// Columnas de la tabla
const headers = ref([
  
  { title: 'Curso', key: 'curso' },
  { title: 'Profesor', key: 'profesor' },
  { title: 'Día', key: 'dia' },
  { title: 'Hora', key: 'hora' }
]);


// Buscar reportes con filtros aplicados
const aplicarFiltros = async () => {
  try{
    await citaStore.getAppointmentReports(filtros.value)
  } catch(error){
    console.log("No hay reportes")
  }
};


const onReset = async () => {
  filtros.value = {
    idCard: null,
    courseName: null,
    attemptCount: null,
    starRating: null,
    campus: null,
  }

  try{
    await citaStore.getAppointmentReports(filtros.value)
  } catch(error){
    console.log("No hay reportes")
  }
};

watch(()=>citaStore.reports, (newValue) =>{
  
  reportes.value = newValue;
  
})

onMounted(()=>{
  citaStore.getAppointmentReports(filtros.value)
})
</script>

<style scoped>
h2 {
  text-align: center;
  margin-bottom: 20px;
}
</style>