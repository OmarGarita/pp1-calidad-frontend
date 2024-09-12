<template>
  <VBtn @click="regresar" color="teal-darken-3" class="mt-4 ml-4" icon="mdi-arrow-left" ></VBtn>
  <VMain>
    <h2>Selección de citas</h2>
    <Suspense>
      <AppointmentSelection />
    </Suspense>
    
  </VMain>
</template>

<script setup>
import AppointmentSelection from '../components/AppointmentSelection.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const regresar = () => {
  router.push("/");
}

</script>

<style scoped>
h2{
  text-align: center;
}
</style>