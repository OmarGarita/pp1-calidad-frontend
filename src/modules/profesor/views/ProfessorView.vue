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
          <ModuleOption titulo="Asignar horario" subtitulo="Gestiona tus horas de consulta" icono="/src/assets/professor-schedule.svg" btntitle="Consultar" href="professor-schedule-validation" />
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