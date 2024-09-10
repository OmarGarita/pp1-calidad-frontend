<template>
  <VContainer>
      <!-- Formulario de Filtros -->
      <VForm @submit.prevent="aplicarFiltros">
      <VRow>
        <VCol>
          <VTextField
            v-model="filtros.carne"
            label="Carné del Estudiante"
            outlined
          ></VTextField>
        </VCol>
        <VCol>
          <VTextField
            v-model="filtros.curso"
            label="Curso"
            outlined
          ></VTextField>
        </VCol>
      </VRow>
      <VRow>
        <VCol>
          <VTextField
            v-model="filtros.hora"
            label="Hora"
            outlined
            type="time"
          ></VTextField>
        </VCol>
        <VCol>
          <VSelect
            v-model="filtros.dia"
            :items="dias"
            label="Dia"
            outlined
            clearable
          ></VSelect>
        </VCol>
      </VRow>
      <VRow>
        <VCol>
          <VTextField
            v-model="filtros.profesor"
            label="Profesor"
            outlined
          ></VTextField>
        </VCol>
      </VRow>
      <VBtn type="submit" color="primary">Aplicar Filtros</VBtn>
    </VForm>

    <!-- Tabla de reportes -->
    <VDataTable
      :headers="headers"
      :items="reportesFiltrados"
      :search="busqueda"
      :items-per-page="5"
      class="mt-4"
    >
      <!-- Template para renderizar las filas -->
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
import { ref } from 'vue';

// Variables reactivas para los filtros
const filtros = ref({
  carne: '',
  curso: null,
  profesor: null,
  dia: null,
  hora: '',
});

const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

// Reportes originales de citas asignadas (simulado)
const reportes = ref([
  { curso: 'Matemáticas', profesor: 'Dr. Juan Pérez', dia: 'Lunes', hora: '10:00' },
  { curso: 'Física', profesor: 'Dra. María García', dia: 'Martes', hora: '12:00' },
  { curso: 'Química', profesor: 'Dr. Carlos López', dia: 'Jueves', hora: '09:00' },
]);

// Reportes filtrados según los filtros aplicados
const reportesFiltrados = ref([...reportes.value]);

// Columnas de la tabla
const headers = ref([
  
  { title: 'Curso', key: 'curso' },
  { title: 'Profesor', key: 'profesor' },
  { title: 'Día', key: 'dia' },
  { title: 'Hora', key: 'hora' }
]);

// Buscar reportes con filtros aplicados
const aplicarFiltros = () => {
  reportesFiltrados.value = reportes.value.filter((reporte) => {
    return (
      (!filtros.value.carne || reporte.carne?.includes(filtros.value.carne)) &&
      (!filtros.value.curso || reporte.curso === filtros.value.curso) &&
      (!filtros.value.profesor || reporte.profesor === filtros.value.profesor) &&
      (!filtros.value.dia || reporte.dia === filtros.value.dia) &&
      (!filtros.value.hora || reporte.hora === filtros.value.hora) &&
      (!filtros.value.tipo || reporte.tipo === filtros.value.tipo)
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