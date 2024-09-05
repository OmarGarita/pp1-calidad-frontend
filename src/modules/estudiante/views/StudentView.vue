<template>
  <StudentHeader></StudentHeader>
  <VMain>
    <h2>¿Que deseas hacer?</h2>
    <VContainer>
      <VRow>
        <VCol>
          <ModuleOption titulo="Registrar estudiante" subtitulo="Registra un nuevo estudiante" icono="/src/assets/registrar-persona.svg" btntitle="Registrar" href="add-student" />
           
        </VCol>
        <VCol>
          <ModuleOption titulo="Consultar mis cursos" subtitulo="Consulta tus cursos asignados" icono="/src/assets/consultarcursos.svg" btntitle="Consultar" href="add-student" />
        </VCol>
      </VRow>
        
    </VContainer>
  </VMain>
</template>

<script setup>
import StudentHeader from '../components/StudentHeader.vue';
import ModuleOption from '@/common/ModuleOption.vue';

</script>

<style scoped> 
h2{
  text-align: center;
}
</style>