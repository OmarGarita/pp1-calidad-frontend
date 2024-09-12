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
import {useAppointmentStore} from '../stores/cita.js'
import { useRouter } from 'vue-router';
import axiosClient from '@/axiosClient.js';
import Alerta from '@/helpers/Alerta';

const router = useRouter();
const formRef = ref(null)
const citaStore = useAppointmentStore();

const carne= ref("");

const fetchStudent = async () => {
  try {
    const response = await axiosClient.get("/students/results",
    {
      params:{
        idCard: carne.value
      }
    })
    if (response.data.length === 0) {
      Alerta.showError("No se encontraron citas para el carné ingresado")
      return
    }
    citaStore.setCurrentStudent(response.data[0])
    router.push({name:"appointment-select"})
  } catch (error) {
    Alerta.showError("No se encontraron citas para el carné ingresado")
  }
}


const onSubmit = async () =>{
  const {valid} = await formRef.value.validate();
  if(valid){
    fetchStudent()
  }
}

</script>

<style scoped>
p{
  color: white;
}
</style>