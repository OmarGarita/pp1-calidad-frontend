<template>
  <VContainer>
  <!-- Formulario de Filtros -->
    <VForm @submit.prevent="aplicarFiltros">
      <VRow>
        <VCol>
          <VTextField
            v-model="filtros.carne"
            label="Carné"
            outlined
            type="number"
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
            v-model="filtros.vezRepetido"
            label="Veces repetido"
            outlined
            type="number"
          ></VTextField>
        </VCol>
        <VCol>
          <VSelect
            v-model="filtros.estrellas"
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
            v-model="filtros.sede"
            label="Sede"
            outlined
          ></VTextField>
        </VCol>
      </VRow>
      <VBtn type="submit" color="primary">Aplicar Filtros</VBtn>
    </VForm>

    <!-- Lista expandible de estudiantes -->
    <VExpansionPanels class="mt-4">
      <VExpansionPanel v-for="(reporte, index) in reportesFiltrados" :key="index">
        <!-- Título del estudiante -->
        <VExpansionPanelTitle>
          {{ reporte.nombre }} - Carné: {{ reporte.carne }} - Sede: {{ reporte.sede }}
        </VExpansionPanelTitle>
          
        <!-- Cursos del estudiante al expandir -->
        <VExpansionPanelText>
          <VRow>
            <VCol v-for="(curso, indexCurso) in reporte.cursos" :key="indexCurso">
              <VCard outlined class="mb-4">
                <VCardTitle>{{ curso.nombreCurso }}</VCardTitle>
                <VCardText>
                  Veces Repetido: {{ curso.vecesRepetido }}<br>
                  Estrellas Asignadas: {{ curso.estrellas }}
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
  carne: '',
  curso: null,
  vezRepetido: null,
  estrellas: null,
  sede: null,
});

const estrellasDisponibles = ref([1, 2, 3]);


// Reportes originales de los estudiantes con los cursos (simulado)
const reportes = ref([
  {
    nombre: 'Juan Pérez',
    carne: '123456',
    sede: 'Central',
    cursos: [
      { nombreCurso: 'Matemáticas', vecesRepetido: 1, estrellas: 2 },
      { nombreCurso: 'Física', vecesRepetido: 0, estrellas: 3 },
    ]
  },
  {
    nombre: 'Ana López',
    carne: '654321',
    sede: 'Regional',
    cursos: [
      { nombreCurso: 'Programación', vecesRepetido: 2, estrellas: 1 },
      { nombreCurso: 'Física', vecesRepetido: 1, estrellas: 2 },
    ]
  }
]);

// Reportes filtrados según los filtros aplicados
const reportesFiltrados = ref([...reportes.value]);

// Aplicar filtros a los reportes
const aplicarFiltros = () => {
  reportesFiltrados.value = reportes.value.filter((reporte) => {
    return (
      (!filtros.value.carne || reporte.carne.includes(filtros.value.carne)) &&
      (!filtros.value.sede || reporte.sede === filtros.value.sede) &&
      reporte.cursos.some(curso => (
        (!filtros.value.curso || curso.nombreCurso === filtros.value.curso) &&
        (!filtros.value.vezRepetido || curso.vecesRepetido === filtros.value.vezRepetido) &&
        (!filtros.value.estrellas || curso.estrellas === filtros.value.estrellas)
      ))
    );
  });
};


</script>

<style scoped> 
h2{
  text-align: center;
}
p{
  color: white;
}
</style>