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
        v-for="item in student.enrollments"
        :key="item.id"
      >
        <td class="text-center">{{ item.course.code }}</td>
        <td class="text-center">{{ item.course.name }}</td>
        <td class="text-center">{{ item.attemptCount }}</td>
        <td class="text-center">{{ item.starRating }}</td>
        <td class="text-center">
          <VBtn @click="dialog = true" color="#40A578" density="comfortable" icon="mdi-pencil-outline"></VBtn> 
          <EditStarVue 
          :model="dialog" 
          :codigoCurso="item.id" 
          @close-dialog="dialog = false" />
        </td>
      </tr>
    </tbody>
  </VTable>
</template>

<script setup>
import { ref } from 'vue';
import EditStarVue from './EditStar.vue';
import { useStudentStore } from '../stores/student';

const dialog = ref(false)
const studentStore = useStudentStore();
const student = studentStore.student;

</script>

<style>

</style>