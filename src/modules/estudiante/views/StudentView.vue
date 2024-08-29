<template>
  <StudentHeader></StudentHeader>
  <VMain>
    <h2>¿Que deseas hacer?</h2>
    <VContainer>
      <VRow>
        <VCol>
          <ModuleOption titulo="Registrar estudiante" subtitulo="registra un nuevo estudiante" icono="/src/assets/registrar-persona.svg" btntitle="Registrar" href="/modules/student/register" />
  
        </VCol>
        <VCol>
          <ModuleOption titulo="Consultar mis cursos" subtitulo="Consulta tus cursos asignador " icono="/src/assets/consultarcursos.svg" btntitle="Consultar" href="/modules/student/courses" />
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