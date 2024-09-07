<template>
  <ProfessorHeader></ProfessorHeader>
  <VMain>
    <h2>¿Que deseas hacer?</h2>
    <VContainer>
      <VRow>
        <VCol>
          <ModuleOption titulo="Registrar profesor" subtitulo="Registra un nuevo profesor" icono="/src/assets/registrar-profesor.svg" btntitle="Registrar" href="add-professor" />
           
        </VCol>
        <VCol>
          <ModuleOption titulo="Gestionar estudiantes" subtitulo="Gestiona las estrellas de tus estudiantes" icono="/src/assets/student-star.svg" btntitle="Consultar" href="add-student" />
        </VCol>
        <VCol>
          <ModuleOption titulo="Reportes" subtitulo="Genera reportes sobre profesores" icono="/src/assets/professor-reports.svg" btntitle="Consultar" href="add-student" />
        </VCol>
      </VRow>
    </VContainer>
  </VMain>

</template>

<script setup>
import ProfessorHeader from '../components/ProfessorHeader.vue';
import ModuleOption from '@/common/ModuleOption.vue';


</script>

<style setup>
h2{
  text-align: center;
}
</style>