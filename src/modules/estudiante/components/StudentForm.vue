<template>
<VSheet class="mx-auto" width="300">
  <VForm ref="formRef" @submit.prevent="onSubmit">
    <VTextField
          v-model="nombre"
          :rules="studentFormRules.nombre"
          label="Nombre"
    ></VTextField>
    <VTextField
          v-model="carne"
          :rules="studentFormRules.id"
          label="Carné"
    ></VTextField>
    <VSelect
      v-model="cursosActuales"
      :items="cursos"
      label="Cursos Actuales"
      multiple
      clearable
      prepend-icon="mdi-book-open-variant"
    >
      <template v-slot:selection="{ item, index }">
        <VChip v-if="index < 4">
          <span>{{ item.title }}</span>
        </VChip>
        <span
          v-if="index === 4"
          class="text-grey text-caption align-self-center"
        >
          (+{{ cursosActuales.length - 4}} cursos más)
        </span>
      </template>
    </VSelect>
    <VBtn color="#40A578" type="submit"> <p class="text-subtitle-1">Registrar</p></VBtn>
  </VForm>
</VSheet>
</template>

<script setup>
import { ref } from 'vue';
import {studentFormRules} from '../helpers/studentFormRules.js';

const formRef = ref(null)

const nombre = ref("");
const carne= ref("");
const cursosActuales = ref([])

const cursos = ['ejemplo', 'Prueba', 'prueba1', 'prueba2', 'prueba3', 'prueba4']

const onSubmit = async () =>{
  const {valid} = await formRef.value.validate();
  if(valid){
    alert(nombre.value + " " + carne.value + " " + cursosActuales.value);
  }
}

</script>

<style scoped>
p{
  color: white;
}
</style>