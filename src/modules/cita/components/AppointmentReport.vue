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
            :items="items.dias"
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
import { ref } from 'vue';
import { items } from '../helpers/apointmentReportItems';
// Variables reactivas para los filtros
const filtros = ref({
  carne: null,
  curso: null,
  profesor: null,
  dia: null,
  hora: null,
});

//TODO: Obtener los reportes desde el api
// Ejemplo de reportes
const reportes = ref([
  { curso: 'Matemáticas', profesor: 'Dr. Juan Pérez', dia: 'Lunes', hora: '10:00' },
  { curso: 'Física', profesor: 'Dra. María García', dia: 'Martes', hora: '12:00' },
  { curso: 'Química', profesor: 'Dr. Carlos López', dia: 'Jueves', hora: '09:00' },
]);


// Columnas de la tabla
const headers = ref([
  
  { title: 'Curso', key: 'curso' },
  { title: 'Profesor', key: 'profesor' },
  { title: 'Día', key: 'dia' },
  { title: 'Hora', key: 'hora' }
]);

// Buscar reportes con filtros aplicados
const aplicarFiltros = () => {
  //TODO
};


const onReset = () => {

  //TODO
};
</script>

<style scoped>
h2 {
  text-align: center;
  margin-bottom: 20px;
}
</style>