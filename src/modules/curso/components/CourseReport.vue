<template>
  <VContainer>
     <!-- Formulario de Filtros -->
     <VForm @submit.prevent="aplicarFiltros">
      <VRow>
        <VCol>
          <VTextField
            v-model="filtros.courseName"
            label="Curso"
            outlined
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
      <VRow>
        <VCol>
          <VSelect
            v-model="filtros.consultationDay"
            :items="items.dias"
            label="Día de Consulta"
            outlined
          ></VSelect>
        </VCol>
        <VCol>
          <VTextField
            v-model="filtros.totalAppointments"
            label="Citas Totales"
            outlined
            type="number"
          ></VTextField>
        </VCol>
      </VRow>
      <VRow>
        <VCol>
          <VTextField
            v-model="filtros.acceptedAppointments"
            label="Citas Reservadas"
            outlined
            type="number"
          ></VTextField>
        </VCol>
        <VCol>
          <VTextField
            v-model="filtros.availableAppointments"
            label="Citas Disponibles"
            outlined
            type="number"
          ></VTextField>
        </VCol>
      </VRow>
      <VBtn type="submit" color="primary">Aplicar Filtros</VBtn>
      <VBtn @click="onReset" class="ma-2" color="primary">Limpiar Filtros</VBtn>
    </VForm>

    <!-- Lista expandible de cursos -->
    <VExpansionPanels class="mt-4">
      <VExpansionPanel v-for="(curso, index) in reportes" :key="index">
        <!-- Título del curso -->
        <VExpansionPanelTitle>
          Codigo: {{ curso.code }} - Nombre: {{ curso.name }}
          <VChip class="ml-2" color="green" outlined>Inicio: {{ curso.semester.startDate }}</VChip>
          <VChip class="ml-2" color="red" outlined>Fin: {{ curso.semester.endDate }}</VChip>
        </VExpansionPanelTitle>

        <!-- Profesores y días de consulta al expandir -->
        <VExpansionPanelText>
          <VRow  v-for="(profesorRow, rowIndex) in groupedProfessors( curso.professors)" :key="rowIndex">
            <VCol v-for="(profesor, indexProfesor) in profesorRow" :key="indexProfesor">
              <VCard outlined class="mb-2">
                <VCardTitle>{{ profesor.name }}</VCardTitle>
                <VCardText>
                  <h3>Días de consulta:</h3>
                  <div v-for="(dia, indexDia) in profesor.schedules" :key="indexDia">
                    <strong>{{ traducirDia(dia.dayOfWeek) }}:</strong> {{ dia.startTime }} - {{ dia.endTime }}
                  </div>
                  
                </VCardText>
              </VCard>
            </VCol>
          </VRow>
          <VRow>
            <VCol>
              <VCard outlined class="mb-4">
                <VCardTitle>Cantidad de Citas</VCardTitle>
                <VCardText>
                  <div class="mt-2">
                    <strong>Citas Totales: </strong> {{ curso.totalAppointments }}<br>
                    <strong>Citas Reservadas: </strong> {{ curso.acceptedAppointments }}<br>
                    <strong>Citas Disponibles: </strong>{{ curso.availableAppointments }}
                  </div>
                </VCardText>  
              </VCard>
            </VCol>
          </VRow>
        </VExpansionPanelText>
      </VExpansionPanel>
    </VExpansionPanels>
  </VContainer>
</template>

<script setup>
import { ref ,onMounted, watch} from 'vue';
import { items } from '../helpers/courseItems';
import { useCourseStore } from '../stores/course';
import {traducirDia} from '../helpers/formato.js'
import Alerta from '@/helpers/Alerta';

const courseStore = useCourseStore();

// Variables reactivas para los filtros
const filtros = ref({
  courseName: null,
  professorName: null,
  consultationDay: null,
  totalAppointments: null,
  acceptedAppointments: null,
  availableAppointments: null,
});

const reportes = ref(courseStore.reports);



// Aplicar filtros a los reportes
const aplicarFiltros = async () => {
  try{
    await courseStore.getCourseReports(filtros.value)
  } catch(error){
    console.log("No hay reportes")
  }
};

const onReset = async  () => {
  filtros.value = {
    idCard: null,
    courseName: null,
    attemptCount: null,
    starRating: null,
    campus: null,
  }

  try{
    await courseStore.getCourseReports(filtros.value)
  } catch(error){
    console.log("No hay reportes")
  }
};

const groupedProfessors = (professors) => {
  const chunkSize = 2;
  const groups = [];
  for (let i = 0; i < professors.length; i += chunkSize) {
    groups.push(professors.slice(i, i + chunkSize));  // Agrupamos de a 3
  }
  return groups;
};

watch(()=>courseStore.reports, (newValue) =>{
  
  reportes.value = newValue;
  
})

onMounted(()=>{
  courseStore.getCourseReports(filtros.value)
})

</script>

<style scoped>
h2 {
  text-align: center;
  margin-bottom: 20px;
}
</style>