<template>
  <VSheet class="pa-8 mx-auto" max-width="600" border >
    <div class="d-flex flex-column align-center" >
      <VImg :width="90" :src="icono"></VImg>
      <h2>{{ titulo }}</h2>
      <p >{{ subtitulo }}</p>
      <VBtn @click="navegar" class="ma-4"  color="grey-lighten-3 text-subtitle-1" variant="flat">{{ btntitle }}</VBtn>

      
    </div>
  </VSheet>
</template>

<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  titulo: String,
  subtitulo: String,
  icono: String,
  btntitle: String,
  href: String,   // Nombre de la ruta
});

const router = useRouter();

const navegar = () => {
 
  router.push({ name: props.href });
};  
</script>

<style scoped>

</style>