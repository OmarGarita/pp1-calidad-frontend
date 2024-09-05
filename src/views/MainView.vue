<template>
  <Header></Header>
  <VMain>
    
    <h1>Nuestros modulos</h1>
    <VContainer>
      <VRow>
        <VCol>
          <ModuleOption titulo="Estudiantes" subtitulo="Gestiona información de estudiantes" icono="src/assets/modestudiante.svg" btntitle="Acceder" href="student-module"/>
        </VCol>
        <VCol>
          <ModuleOption titulo="Citas" subtitulo="Reserva y administra tus citas de consulta" icono="src/assets/modcitas.svg" btntitle="Reservar" href="schedule-module" />
        </VCol>
      </VRow>
      <VRow>
        <VCol>
          <ModuleOption titulo="Profesores" subtitulo="Gestiona información de profesores" icono="src/assets/modprofesor.svg" btntitle="Acceder" href="professor-module"/>
        </VCol>
        <VCol>
          <ModuleOption titulo="Cursos" subtitulo="Explora los cursos y sus horarios de consulta" icono="src/assets/modcursos.svg" btntitle="Ver cursos" href="course-module"/>
        </VCol>
      </VRow>
      
    </VContainer>
    
    
  </VMain>
</template>

<script setup>
import Header from '@/views/Header.vue';
import ModuleOption from '@/common/ModuleOption.vue';
</script>

<style scoped>
h1{
  text-align: center;
}

</style>