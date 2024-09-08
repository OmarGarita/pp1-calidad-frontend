<template>
  <VBtn @click="regresar" color="teal-darken-3" class="mt-4 ml-4" icon="mdi-arrow-left" ></VBtn>
  <VMain>
    <h2>Gestion de cursos</h2>
    <VContainer>
      <VRow>
        <VCol >
          <VBtn color="#40A578" @click="dialog = true"><p class="text-subtitle-1">Agregar curso</p></VBtn>
        </VCol>
        <AddStudentCourse :model="dialog" @close-dialog="dialog = false"  />
        
      </VRow>
      <VRow>
        <VCol>
          <StudentCoursesTable />
        </VCol>
      </VRow>
    </VContainer>

    
  </VMain>
</template>

<script setup>
import { useStudentStore } from '../stores/student.js';
import StudentCoursesTable from "../components/StudentCoursesTable.vue"
import AddStudentCourse from '../components/AddStudentCourse.vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
 
const router = useRouter();

const studentStore = useStudentStore()
const dialog = ref(false)


const regresar = ()=>{
  router.push({name:"student-module"})
}

</script>

<style scoped> 
h2{
  text-align: center;
}
p{
  color: white;
}
</style>