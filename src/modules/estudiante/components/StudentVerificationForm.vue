<template>
  <VSheet class="mx-auto" width="300">
    <VForm ref="formRef" @submit.prevent="onSubmit">
      <h6 class="text-h6">Ingrese su número de carné:</h6>
      <VTextField
        v-model="carne"
        :rules="studentFormRules.id"
        label="Carné"
        type="number"
        class="custom-text-field"
      ></VTextField>
      <VBtn color="teal-darken-3" type="submit">
        <p class="text-subtitle-1">Ingresar</p>
      </VBtn>
    </VForm>
  </VSheet>
</template>

<script setup>
import { ref } from "vue";
import { studentFormRules } from "../helpers/studentFormRules.js";
import { useStudentStore } from '../stores/student';
import { useRouter } from "vue-router";
import Alerta from "@/helpers/Alerta.js";

const router = useRouter();
const formRef = ref(null);
const carne = ref("");
const studentStore = useStudentStore();

const onSubmit = async () => {
  const { valid } = await formRef.value.validate();
  if (valid) {
    try {
      await studentStore.fetchStudentById(carne.value);
      router.push({ name: "student-courses" });
    } catch (error) {
      Alerta.showError("No se encontró un estudiante con ese carné");
    }
  }
};
</script>

<style scoped>
p {
  color: white;
}
</style>
