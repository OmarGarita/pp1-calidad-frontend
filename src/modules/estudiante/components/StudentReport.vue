<template>
  <VContainer>
  <!-- Formulario de Filtros -->
    <VForm @submit.prevent="aplicarFiltros">
      <VRow>
        <VCol>
          <VTextField
            v-model="filtros.idCard"
            label="Carné"
            outlined
            type="number"
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
            v-model="filtros.attemptCount"
            label="Número de intentos"
            outlined
            type="number"
          ></VTextField>
        </VCol>
        <VCol>
          <VSelect
            v-model="filtros.starRating"
            :items="estrellasDisponibles"
            label="Estrellas"
            outlined
            clearable
          ></VSelect>
        </VCol>
      </VRow>
      <VRow>
        <VCol>
          <VTextField
            v-model="filtros.campus"
            label="Sede"
            outlined
          ></VTextField>
        </VCol>
      </VRow>
      <VBtn type="submit" color="primary">Aplicar Filtros</VBtn>
      <VBtn @click="onReset" class="ma-2" color="primary">Limpiar Filtros</VBtn>
    </VForm>

    <!-- Lista expandible de estudiantes -->
    <VExpansionPanels class="mt-4">
      <VExpansionPanel v-for="(reporte, index) in reportes" :key="index">
        <!-- Título del estudiante -->
        <VExpansionPanelTitle>
           Carné: {{ reporte.idCard }} - Nombre: {{ reporte.name }} - Sede: {{ reporte.campus }}
        </VExpansionPanelTitle>
          
        <!-- Cursos del estudiante al expandir -->
        <VExpansionPanelText>
          <VRow v-for="(cursoRow, rowIndex) in groupedEnrollments(reporte.enrollments)" :key="rowIndex">
            <!-- Iterar dentro de cada fila para mostrar 3 cursos -->
            <VCol v-for="(curso, indexCurso) in cursoRow" :key="indexCurso" cols="4">
              <VCard outlined class="mb-4">
                <VCardTitle>{{ curso.course.name }}</VCardTitle>
                <VCardText>
                  Número de intentos: {{ curso.attemptCount }}<br>
                  Estrellas Asignadas: {{ curso.starRating }}
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
import { ref , onMounted, watch} from 'vue';
import { useStudentStore } from '../stores/student';
import Alerta from '@/helpers/Alerta';

const studentStore = useStudentStore();

// Variables reactivas para los filtros
const filtros = ref({
  idCard: null,
  courseName: null,
  attemptCount: null,
  starRating: null,
  campus: null,
});

const estrellasDisponibles = ref([1, 2, 3]);


// Reportes originales de los estudiantes con los cursos (simulado)
const reportes = ref(studentStore.reports);


// Aplicar filtros a los reportes
const aplicarFiltros = async  () => {
  try{
    await studentStore.getStudentReports(filtros.value)
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
    await studentStore.getStudentReports(filtros.value)
  } catch(error){
    console.log("No hay reportes")
  }
};

const groupedEnrollments = (enrollments) => {
  const chunkSize = 3;
  const groups = [];
  for (let i = 0; i < enrollments.length; i += chunkSize) {
    groups.push(enrollments.slice(i, i + chunkSize));  // Agrupamos de a 3
  }
  return groups;
};

watch(()=>studentStore.reports, (newValue) =>{
  
  reportes.value = newValue;
  
})

onMounted(()=>{
  studentStore.getStudentReports(filtros.value)
})

</script>

<style scoped> 
h2{
  text-align: center;
}
p{
  color: white;
}
</style>