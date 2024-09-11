<template>
  <VSheet class="mx-auto" width="300">
    <VForm ref="formRef" @submit.prevent="onSubmit">

      <VSelect
            v-model="nombre"
            :items="formattedProfessors"
            label="Profesor"
            clearable
            chips
          ></VSelect>
      
      <VBtn color="#40A578" type="submit"> <p class="text-subtitle-1">Registrar</p></VBtn>
    </VForm>
  </VSheet>
</template>
  
<script setup>
import { ref, onMounted, computed  } from 'vue';
import Alerta from '@/helpers/Alerta';
import { useCourseStore } from '../stores/course.js';
import { useProfesorStore } from '@/modules/profesor/stores/profesor';

const formRef = ref(null)
const courseStore = useCourseStore();
const profesorStore = useProfesorStore();

//Atributos del estudiante
const nombre = ref("");

const formattedProfessors = computed(() => {
  return profesorStore.professors.map((profesor) => ({
    title: profesor.name,
    value: profesor.id   
  }));
});

const onSubmit = async () =>{
  const {valid} = await formRef.value.validate();
  if(valid ){  
    try{
      await profesorStore.fetchProfessorById(nombre.value);
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

onMounted(() =>{
  profesorStore.fetchProfessors()
})

</script>

<style scoped>
p{
  color: white;
}
</style>