<template>
  <VSheet class="mx-auto" width="300">
    <VForm ref="formRef" @submit.prevent="onSubmit">
      <h6 class="text-h6">Ingrese su nombre:</h6>
      <VSelect
            v-model="id"
            :items="formattedProfessors"
            label="Profesor"
            clearable
            chips
          ></VSelect>
      <VBtn color="teal-darken-3" type="submit"> <p class="text-subtitle-1">Ingresar</p></VBtn>
    </VForm>
  </VSheet>
</template>
  
<script setup>
import { ref, onMounted, computed } from 'vue';
import { useProfesorStore } from '../stores/profesor';
import { useRouter } from 'vue-router';
import Alerta from '@/helpers/Alerta';
 
const profesorStore = useProfesorStore();
const router = useRouter();
const formRef = ref(null);

const id= ref("");

const formattedProfessors = computed(() => {
  return profesorStore.professors.map((profesor) => ({
    title: profesor.name,
    value: profesor.id   
  }));
});

const onSubmit = async () =>{
  const {valid} = await formRef.value.validate();
  if(valid){
    try{
      
      await profesorStore.fetchProfessorById(id.value)
      
      router.push({name:"professor-schedule"})
    } catch(error){
      Alerta.showError(`No se encontro al profesor ${id.value}`)
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