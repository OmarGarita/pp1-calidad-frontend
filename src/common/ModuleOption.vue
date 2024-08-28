<template>
  <VSheet class="pa-8 mx-auto" max-width="600" border >
    <div class="d-flex flex-column align-center" >
      <VImg :width="90" :src="icono"></VImg>
      <h2>{{ nombreModulo }}</h2>
      <p >{{ subtitulo }}</p>
      <VBtn  class="ma-4 pr-0"  color="grey-lighten-3" variant="flat"><a class="text-subtitle-1" :href="ruta">{{ boton }}</a></VBtn>

      
    </div>
  </VSheet>
</template>

<script setup>
import { defineProps, ref, watch } from 'vue';
const props = defineProps(["titulo", "subtitulo", "icono", "btntitle", "href"]);

const nombreModulo = ref(props.titulo);
const subtitulo = ref(props.subtitulo);
const icono = ref(props.icono);
const boton = ref(props.btntitle);
const ruta = ref(props.href)

watch(() => props.titulo, (newValue) =>{
  nombreModulo.value = newValue
});

watch(() => props.subtitulo, (newValue) =>{
  subtitulo.value = newValue
});

watch(() => props.icono, (newValue) =>{
  icono.value = newValue
});

watch(() => props.btntitle, (newValue) =>{
  boton.value = newValue
});
watch(() => props.href, (newValue) =>{
  ruta.value = newValue
});


</script>

<style scoped>
a:link, a:visited, a:active {
  text-decoration:none;
}

a{
  color: black;
  margin-right: 20px;
} 
</style>