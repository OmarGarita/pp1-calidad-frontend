<template>
  <VDialog v-model="dialog" width="auto">
    <VCard max-width="500" prepend-icon="mdi-plus" title="Agregar curso">
      <VCardText>
        <VRow>
          <VSelect
            v-model="curso"
            :items="formattedCourses"
            label="Cursos"
            clearable
            chips
          ></VSelect>
        </VRow>
        <VRow>
          <VTextField
            v-model="repetidos"
            :rules="studentFormRules.repetidos"
            label="Número de intento"
            type="number"
          ></VTextField>
        </VRow>
      </VCardText>
      <VDivider></VDivider>

      <VCardActions>
        <VSpacer></VSpacer>

        <VBtn text="Cancelar" variant="plain" @click="closeDialog"></VBtn>

        <VBtn
          color="teal-darken-3"
          text="Agregar"
          variant="tonal"
          @click="onAdd"
        ></VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script setup>
import { ref, watch, defineEmits, computed } from "vue";
import { studentFormRules } from "../helpers/studentFormRules.js";
import { useStudentStore } from '../stores/student';
import { useCourseStore } from "@/modules/curso/stores/course";
import { onMounted } from "vue";
import axiosClient from "@/axiosClient.js";
import Alerta from "@/helpers/Alerta";


const studentStore = useStudentStore();
const courseStore = useCourseStore();

const props = defineProps({
  model: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["update:model", "close-dialog"]);

const dialog = ref(props.model);
const curso = ref("");
const repetidos = ref(1);


const formattedCourses = computed(() => {
  return courseStore.courses.map((course) => ({
    title: course.name,
    value: course.id   
  }));
});

watch(
  () => props.model,
  (newValue) => {
    dialog.value = newValue;
  }
);

watch(dialog, (newValue) => {
  emit("update:model", newValue);
});

const closeDialog = () => {
  dialog.value = false;
  emit("close-dialog");
};

const onAdd = async () => {
  if (repetidos.value >= 0 && curso.value != "") {
    
    const data = {
      courseId: curso.value,
      attemptCount: repetidos.value
    }

    try{
      await studentStore.addEnrrollment(data)
      await studentStore.getStudentEnrollments()
      Alerta.showExitoSimple(`Se agregó el curso a ${studentStore.student.name}`)
    } catch (error) {
      Alerta.showError("Error al agregar curso");
    }
    dialog.value = false;
    emit("close-dialog");
  }
};

onMounted(() =>{
  courseStore.fetchCourses()
})
</script>

<style scoped></style>
