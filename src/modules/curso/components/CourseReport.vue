<template>
  <VContainer>
     <!-- Formulario de Filtros -->
     <VForm @submit.prevent="aplicarFiltros">
      <VRow>
        <VCol>
          <VTextField
            v-model="filtros.curso"
            label="Curso"
            outlined
          ></VTextField>
        </VCol>
        <VCol>
          <VTextField
            v-model="filtros.profesor"
            label="Profesor"
            outlined
          ></VTextField>
        </VCol>
      </VRow>
      <VRow>
        <VCol>
          <VSelect
            v-model="filtros.diaConsulta"
            :items="diasDisponibles"
            label="Día de Consulta"
            outlined
          ></VSelect>
        </VCol>
        <VCol>
          <VTextField
            v-model="filtros.citasTotales"
            label="Citas Totales"
            outlined
            type="number"
          ></VTextField>
        </VCol>
      </VRow>
      <VRow>
        <VCol>
          <VTextField
            v-model="filtros.citasReservadas"
            label="Citas Reservadas"
            outlined
            type="number"
          ></VTextField>
        </VCol>
        <VCol>
          <VTextField
            v-model="filtros.citasNoReservadas"
            label="Citas No Reservadas"
            outlined
            type="number"
          ></VTextField>
        </VCol>
      </VRow>
      <VBtn type="submit" color="primary">Aplicar Filtros</VBtn>
    </VForm>

    <!-- Lista expandible de cursos -->
    <VExpansionPanels class="mt-4">
      <VExpansionPanel v-for="(curso, index) in reportesFiltrados" :key="index">
        <!-- Título del curso -->
        <VExpansionPanelTitle>
          {{ curso.codigo }} - {{ curso.nombre }}
          <VChip class="ml-2" color="green" outlined>Inicio: {{ curso.fechaInicio }}</VChip>
          <VChip class="ml-2" color="red" outlined>Fin: {{ curso.fechaFin }}</VChip>
        </VExpansionPanelTitle>

        <!-- Profesores y días de consulta al expandir -->
        <VExpansionPanelText>
          <VRow>
            <VCol v-for="(profesor, indexProfesor) in curso.profesores" :key="indexProfesor">
              <VCard outlined class="mb-4">
                <VCardTitle>{{ profesor.nombre }}</VCardTitle>
                <VCardText>
                  <div v-for="(dia, indexDia) in profesor.diasConsulta" :key="indexDia">
                    <strong>{{ dia.diaSemana }}:</strong> {{ dia.horaInicio }} - {{ dia.horaFin }}
                  </div>
                  <div class="mt-2">
                    Citas Totales: {{ profesor.citasTotales }}<br>
                    Citas Reservadas: {{ profesor.citasReservadas }}<br>
                    Citas No Reservadas: {{ profesor.citasNoReservadas }}
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
import { ref } from 'vue';

// Variables reactivas para los filtros
const filtros = ref({
  curso: null,
  profesor: null,
  diaConsulta: null,
  citasTotales: null,
  citasReservadas: null,
  citasNoReservadas: null,
});

const diasDisponibles = ref(['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']);

// Reportes originales de los cursos y profesores (simulado)
const reportes = ref([
  {
    codigo: 'CS101',
    nombre: 'Programación Avanzada',
    fechaInicio: '2024-09-01',
    fechaFin: '2024-12-15',
    profesores: [
      {
        nombre: 'Dr. Juan Pérez',
        diasConsulta: [
          { diaSemana: 'Lunes', horaInicio: '10:00', horaFin: '11:00' },
          { diaSemana: 'Miércoles', horaInicio: '14:00', horaFin: '15:00' }
        ],
        citasTotales: 20,
        citasReservadas: 10,
        citasNoReservadas: 10
      },
      {
        nombre: 'Dra. María García',
        diasConsulta: [
          { diaSemana: 'Martes', horaInicio: '12:00', horaFin: '13:00' },
          { diaSemana: 'Jueves', horaInicio: '09:00', horaFin: '10:00' }
        ],
        citasTotales: 15,
        citasReservadas: 5,
        citasNoReservadas: 10
      }
    ]
  },
  {
    codigo: 'CS102',
    nombre: 'Estructura de Datos',
    fechaInicio: '2024-09-01',
    fechaFin: '2024-12-15',
    profesores: [
      {
        nombre: 'Dr. Carlos López',
        diasConsulta: [
          { diaSemana: 'Lunes', horaInicio: '09:00', horaFin: '10:00' },
          { diaSemana: 'Viernes', horaInicio: '11:00', horaFin: '12:00' }
        ],
        citasTotales: 25,
        citasReservadas: 15,
        citasNoReservadas: 10
      }
    ]
  }
]);

// Reportes filtrados según los filtros aplicados
const reportesFiltrados = ref([...reportes.value]);

// Aplicar filtros a los reportes
const aplicarFiltros = () => {
  reportesFiltrados.value = reportes.value.filter((curso) => {
    return (
      (!filtros.value.curso || curso.codigo === filtros.value.curso) &&
      curso.profesores.some(profesor => (
        (!filtros.value.profesor || profesor.nombre === filtros.value.profesor) &&
        profesor.diasConsulta.some(dia => (
          (!filtros.value.diaConsulta || dia.diaSemana === filtros.value.diaConsulta)
        )) &&
        (!filtros.value.citasTotales || profesor.citasTotales === parseInt(filtros.value.citasTotales)) &&
        (!filtros.value.citasReservadas || profesor.citasReservadas === parseInt(filtros.value.citasReservadas)) &&
        (!filtros.value.citasNoReservadas || profesor.citasNoReservadas === parseInt(filtros.value.citasNoReservadas))
      ))
    );
  });
};
</script>

<style scoped>
h2 {
  text-align: center;
  margin-bottom: 20px;
}
</style>