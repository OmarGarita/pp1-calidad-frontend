<template>
  <VSheet class="mx-auto" width="300">
    <VForm ref="formRef" @submit.prevent="onSubmit">

      <VTextField
          v-model="nombre"
          :rules="courseFormRules.nombre"
          label="Nombre"
      ></VTextField>
      
      <VBtn color="#40A578" type="submit"> <p class="text-subtitle-1">Registrar</p></VBtn>
    </VForm>
  </VSheet>
</template>
  
<script setup>
import { ref  } from 'vue';
import Alerta from '@/helpers/Alerta';
import { useCourseStore } from '../stores/course.js';
import { useProfesorStore } from '@/modules/profesor/stores/profesor';
import {courseFormRules} from '../helpers/courseFormRules.js'

const formRef = ref(null)
const courseStore = useCourseStore();
const profesorStore = useProfesorStore();

//Atributos del estudiante
const nombre = ref("");

const onSubmit = async () =>{
  const {valid} = await formRef.value.validate();
  if(valid ){  
    try{
      await profesorStore.fetchProfessorByName(nombre.value);
      const data = {
        professorId: profesorStore.professor.id
      }

      await courseStore.addProfessorToCourse(data)
      Alerta.showExitoSimple(`Profesor asignado al curso ${courseStore.course.name}`)

      nombre.value = '';
    } catch(error){
      Alerta.showError("No se encontro al profesor")
    }

  }
}

</script>

<style scoped>
p{
  color: white;
}
</style>