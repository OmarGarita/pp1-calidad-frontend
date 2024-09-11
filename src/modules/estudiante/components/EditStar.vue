<template>
  <VDialog v-model="dialog" width="auto">
    <VCard max-width="500" prepend-icon="mdi-plus" title="Asignar Estrellas">
      <VCardText>
        <VRow>
          <VSelect
            v-model="estrellas"
            :items="estrellasItems"
            label="Estrellas"
            chips
          ></VSelect>
        </VRow>
      </VCardText>
      <VDivider></VDivider>

      <VCardActions>
        <VSpacer></VSpacer>
        <VBtn text="Cancelar" variant="plain" @click="closeDialog"></VBtn>

        <VBtn
          color="#40A578"
          text="Agregar"
          variant="tonal"
          @click="onAdd"
        ></VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script setup>
import { defineProps, ref, watch, defineEmits } from "vue";
import { useStudentStore } from '../stores/student';
import Alerta from "@/helpers/Alerta";

const studentStore = useStudentStore();

const props = defineProps({
  model: {
    type: Boolean,
    default: false,
  },
  codigoCurso: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:model", "close-dialog"]);
const estrellasItems = [1, 2, 3];

const dialog = ref(props.model);
const cursoCodigo = ref(props.codigoCurso);

const estrellas = ref(estrellasItems[0]);

watch(
  () => props.model,
  (newValue) => {
    dialog.value = newValue;
  }
);

watch(
  () => props.codigoCurso,
  (newValue) => {
    cursoCodigo.value = newValue;
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
  try {
    await studentStore.updateStudentStarRating(cursoCodigo.value, estrellas.value);
    await studentStore.getStudentEnrollments();
    Alerta.showExitoSimple("Estrellas asignadas correctamente");
  } catch (error) {
    Alerta.showError("Error al asignar estrellas");
  } finally {
    dialog.value = false;
    emit("close-dialog");
  }
};
</script>

<style scoped></style>
