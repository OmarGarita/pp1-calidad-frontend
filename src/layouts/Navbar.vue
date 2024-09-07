<template>
  <VAppBar class="navbar">
    
    <VAppBarTitle> 
      <a href="/"><VIcon icon="mdi-school-outline"></VIcon> ConsultaTEC</a>
    </VAppBarTitle>

    
    <a href="/modules/student">Estudiantes</a>
    <a href="/modules/appointments">Citas</a>
    <a href="/modules/professor">Profesores</a>
    <a href="/modules/course">Cursos</a>


  </VAppBar>
</template>

<script setup>

</script>

<style scoped>
a:link, a:visited, a:active {
  text-decoration:none;
}

a{
  color: black;
  margin-right: 20px;
} 
</style>