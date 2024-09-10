<template>
  <VSheet class="mx-auto" width="300">
    <VForm ref="formRef" @submit.prevent="onSubmit">
      <h6 class="text-h6">Ingrese su número de carné:</h6>
      <VTextField
            v-model="carne"
            :rules="studentFormRules.id"
            label="Carné"
            type="number"
      ></VTextField>
      <VBtn color="#40A578" type="submit"> <p class="text-subtitle-1">Ingresar</p></VBtn>
    </VForm>
  </VSheet>
</template>
  
<script setup>
import { ref } from 'vue';
import {studentFormRules} from '@/modules/estudiante/helpers/studentFormRules.js';
import {useCitaStore} from '../stores/citaStore.js'
import { useRouter } from 'vue-router';
import Alerta from '@/helpers/Alerta';
 
const router = useRouter();
const formRef = ref(null)
const citaStore = useCitaStore();

const carne= ref("");


const onSubmit = async () =>{
  const {valid} = await formRef.value.validate();
  if(valid){
    
    //cambiar por student store
    citaStore.guardarCarne(carne)

    Alerta.showExitoSimple(citaStore.carne.value)
    
    router.push({name:"appointment-select"})
    
  }
}

</script>

<style scoped>
p{
  color: white;
}
</style>