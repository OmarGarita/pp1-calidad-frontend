<template>
  <VSheet class="mx-auto" width="300">
    <VForm ref="formRef" @submit.prevent="onSubmit">
      <h6 class="text-h6">Ingrese el codigo del curso:</h6>
      <VTextField
            v-model="codigo"
            :rules="courseFormRules.codigo"
            label="Codigo"
      ></VTextField>
      <VBtn color="teal-darken-3" type="submit"> <p class="text-subtitle-1">Ingresar</p></VBtn>
    </VForm>
  </VSheet>
</template>
  
<script setup>
import { ref } from 'vue';
import {courseFormRules} from '../helpers/courseFormRules.js';
import { useCourseStore } from '../stores/course.js';
import { useRouter } from 'vue-router';
import Alerta from '@/helpers/Alerta';
 
const router = useRouter();
const formRef = ref(null)
const cursoStore = useCourseStore();


const codigo= ref("");


const onSubmit = async () =>{
  const {valid} = await formRef.value.validate();
  if(valid){
    try {
      await cursoStore.fetchCourseByCode(codigo.value)
      router.push({name:"course-semester-end"})
    } catch (error) {
      Alerta.showError("Curso no encontrado")
    }
  }
}

</script>

<style scoped>
p{
  color: white;
}
</style>