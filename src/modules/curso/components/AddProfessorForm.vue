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
import {useCodigoStore} from '../stores/codigoCursoStore.js'
import {courseFormRules} from '../helpers/courseFormRules.js'

const formRef = ref(null)
const codigoStore = useCodigoStore();

//Atributos del estudiante
const nombre = ref("");

const onSubmit = async () =>{
  const {valid} = await formRef.value.validate();
  if(valid ){  
    const texto = nombre.value + " " + codigoStore.codigo.value
    Alerta.showExitoSimple(texto)
  }
}

</script>

<style scoped>
p{
  color: white;
}
</style>