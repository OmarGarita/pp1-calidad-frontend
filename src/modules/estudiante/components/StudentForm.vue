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
        type="number"
      ></VTextField>

      <VTextField
        v-model="sede"
        :rules="studentFormRules.sede"
        label="Sede"
      ></VTextField>

      <VBtn color="#40A578" type="submit">
        <p class="text-subtitle-1">Registrar</p></VBtn
      >
    </VForm>
  </VSheet>
</template>

<script setup>
import { ref } from "vue";
import { studentFormRules } from "../helpers/studentFormRules.js";
import Alerta from "@/helpers/Alerta";
import axiosClient from "@/axiosClient.js";

const formRef = ref(null);

//Atributos del estudiante
const nombre = ref("");
const carne = ref("");
const sede = ref("");

const onSubmit = async () => {
  const { valid } = await formRef.value.validate();
  if (valid) {
    //Enviar los datos al backend
    const data = {
      name: nombre.value,
      idCard: carne.value,
      campus: sede.value,
    };

    try {
      await axiosClient.post("/students", data);
      
      Alerta.showExitoSimple("Estudiante registrado");
    } catch (error) {
      Alerta.showError("Error al registrar el estudiante");
    }
  }
};
</script>

<style scoped>
p {
  color: white;
}
</style>
