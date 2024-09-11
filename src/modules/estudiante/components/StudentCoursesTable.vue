<template>
  <VTable>
    <thead>
      <tr>
        <th class="text-center">
          Codigo
        </th>
        <th class="text-center">
          Nombre
        </th>
        <th class="text-center">
          Veces llevado
        </th>
        <th class="text-center">
          Estrellas
        </th>
        <th class="text-center">
          
        </th>
      </tr>
    </thead>
    <tbody>
      <tr 
        v-for="item in enrollments"
        :key="item.id"
      >
        <td class="text-center">{{ item.course.code }}</td>
        <td class="text-center">{{ item.course.name }}</td>
        <td class="text-center">{{ item.attemptCount }}</td>
        <td class="text-center">{{ item.starRating }}</td>
        <td class="text-center">
          <VBtn @click="openEditDialog(item.id)" color="#40A578" density="comfortable" icon="mdi-pencil-outline"></VBtn> 
          <EditStar
          :model="dialog" 
          :codigoCurso="selectedCursoId" 
          @close-dialog="dialog = false" />
        </td>
      </tr>
    </tbody>
  </VTable>
</template>

<script setup>
import { ref, watch} from 'vue';
import EditStar from './EditStar.vue';
import { useStudentStore } from '../stores/student';
import { onMounted } from "vue";

const selectedCursoId = ref(""); 
const dialog = ref(false)
const studentStore = useStudentStore();
const enrollments = ref(studentStore.enrrollments)


watch(()=>studentStore.enrrollments, (newValue)=>{
  enrollments.value = newValue;
})


onMounted(() =>{
  studentStore.getStudentEnrollments()
})

const openEditDialog = (id) => {
  selectedCursoId.value = id;  // Establecer el ID del curso seleccionado
  dialog.value = true;         // Abrir el diálogo
};
</script>

<style>

</style>