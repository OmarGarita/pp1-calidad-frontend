<template>
  <AppointmentHeader></AppointmentHeader>
  <VMain>
    <h2>¿Que deseas hacer?</h2>
    <VContainer>
      <VRow>
        <VCol>
          <ModuleOption titulo="Agendar cita" subtitulo="Agenda una cita para un curso" icono="/src/assets/add-appointment.svg" btntitle="Agendar" href="appointments-select-verification" />
           
        </VCol>
        <VCol>
          <ModuleOption titulo="Reportes" subtitulo="Genera reportes sobre tus citas" icono="/src/assets/schedule-reports.svg" btntitle="Consultar" href="appointment-reports" />
        </VCol>
        
      </VRow>
    </VContainer>
  </VMain>

</template>

<script setup>
import AppointmentHeader from '../components/AppointmentHeader.vue';
import ModuleOption from '@/common/ModuleOption.vue';


</script>

<style setup>
h2{
  text-align: center;
}
</style>