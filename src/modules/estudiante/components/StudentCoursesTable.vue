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
        v-for="item in items"
        :key="item.codigo"
      >
        <td class="text-center">{{ item.codigo }}</td>
        <td class="text-center">{{ item.nombre }}</td>
        <td class="text-center">{{ item.repetidos }}</td>
        <td class="text-center">{{ item.estrellas }}</td>
        <td class="text-center">
          <VBtn @click="dialog = true" color="#40A578" density="comfortable" icon="mdi-pencil-outline"></VBtn> 
          <EditStarVue :model="dialog" :codigoCurso="item.codigo" @close-dialog="dialog = false" />
        </td>

      </tr>
    </tbody>
  </VTable>
</template>

<script setup>
import { ref } from 'vue';
import EditStarVue from './EditStar.vue';

const dialog = ref(false)

//Cursos de ejemplo 
const items = [{
  codigo: 'TI000',
  nombre: "Curso",
  repetidos: 5,
  estrellas: 1,
},

{
  codigo: 'TI001',
  nombre: "Curso1",
  repetidos: 0,
  estrellas: 3,
},
]

</script>

<style>

</style>