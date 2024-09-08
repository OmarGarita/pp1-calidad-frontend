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
          <ModuleOption titulo="Modificar fin de semestre" subtitulo="Modifica la fecha de fin de semestre" icono="/src/assets/semester-end.svg" btntitle="Editar" href="course-semester-end-validation"/>
        </VCol>
        
      </VRow>
      <VRow>
        <VCol>
          <ModuleOption titulo="Asignar Profesor" subtitulo="Asigna profesores a cursos" icono="/src/assets/course-professor.svg" btntitle="Asignar" href="course-professor-validation" />
        </VCol>
        <VCol>
          <ModuleOption titulo="Reportes" subtitulo="Genera reportes sobre tus cursos" icono="/src/assets/course-report.svg" btntitle="Consultar" href="course-reports" />
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