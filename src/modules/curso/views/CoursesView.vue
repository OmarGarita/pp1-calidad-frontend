<template>
  <CourseHeader></CourseHeader>
  <VMain>
    <h2>¿Que deseas hacer?</h2>
    <VContainer>
      <VRow>
        <VCol>
          <ModuleOption titulo="Agregar curso" subtitulo="Agrega un nuevo curso" icono="/src/assets/add-course.svg" btntitle="Registrar" href="add-course" />
           
        </VCol>
        <VCol>
          <ModuleOption titulo="Reportes" subtitulo="Genera reportes sobre tus cursos" icono="/src/assets/course-report.svg" btntitle="Consultar" href="add-student" />
        </VCol>
        
      </VRow>
    </VContainer>
  </VMain>

</template>

<script setup>
import CourseHeader from '../components/CourseHeader.vue';
import ModuleOption from '@/common/ModuleOption.vue';


</script>

<style setup>
h2{
  text-align: center;
}
</style>