<template>
  <VSheet class="mx-auto" width="300">
    <VForm ref="formRef" @submit.prevent="onSubmit">
      <h6 class="text-h6">Ingrese su nombre:</h6>
      <VTextField
            v-model="nombre"
            :rules="professorFormRules.nombre"
            label="Nombre"
            type="text"
      ></VTextField>
      <VBtn color="#40A578" type="submit"> <p class="text-subtitle-1">Ingresar</p></VBtn>
    </VForm>
  </VSheet>
</template>
  
<script setup>
import { ref } from 'vue';
import {professorFormRules} from '../helpers/professorFormRules.js';
import {useNombreStore} from '../stores/nombreProfesorStore.js'
import { useRouter } from 'vue-router';
 
const router = useRouter();
const formRef = ref(null)
const nombreStore = useNombreStore();

const nombre= ref("");


const onSubmit = async () =>{
  const {valid} = await formRef.value.validate();
  if(valid){
    
    nombreStore.guardarNombre(nombre)
    router.push({name:"professor-schedule"})
    
  }
}

</script>

<style scoped>
p{
  color: white;
}
</style>