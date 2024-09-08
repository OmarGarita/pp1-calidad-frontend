<template>
<VDialog
  v-model="dialog"
  width="auto"
>
  <VCard
    max-width="500"
    prepend-icon="mdi-plus"
    title="Agregar curso"
  >
    <VCardText>
      <VRow>
        <VSelect
        v-model="curso"
        :items="cursosItems"
        label="Cursos"
        clearable
        chips
        ></VSelect>
      </VRow>
      <VRow>
        <VTextField
          v-model="repetidos"
          :rules="studentFormRules.repetidos"
          label="Cantidad de veces llevado"
          type="number"
        ></VTextField>
      </VRow>
    </VCardText>
    <VDivider></VDivider>

    <VCardActions>
      <VSpacer></VSpacer>

      <VBtn
        text="Cancelar"
        variant="plain"
        @click="closeDialog"
      ></VBtn>

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
import { defineProps, ref, watch, defineEmits} from 'vue'; 
import {studentFormRules} from '../helpers/studentFormRules.js'
import { useCarneStore } from '../stores/carneStore';

const carneStore = useCarneStore()
const props = defineProps({
  model: {
    type: Boolean,
    default: false,
  }
});
const emit = defineEmits(['update:model', 'close-dialog']);
const cursosItems = ['prueba', 'prueba2'] //Cursos de prueba

const dialog = ref(props.model)
const curso = ref(cursosItems[0])
const repetidos = ref(0);



watch(() => props.model, (newValue) =>{
  dialog.value = newValue
});

watch(dialog, (newValue) => {
  emit('update:model', newValue);
});

const closeDialog = () => {
  dialog.value = false;
  emit('close-dialog');
};

const onAdd = () => {
  if(repetidos.value >= 0 && curso.value != ""){
    
    //Aqui va la logica para guardar el curso

    

    dialog.value = false;
    emit('close-dialog');
  }
}

</script>

<style scoped>

</style>