<template>
  <VContainer>
    <VExpansionPanels v-if="cursos.length" class="mt-4">
      <VExpansionPanel v-for="(curso, index) in cursos" :key="index">
        <VExpansionPanelTitle>
          {{ curso.codigo }} - {{ curso.nombre }}
        </VExpansionPanelTitle>
        <VExpansionPanelText>
          <VCard outlined>
            <VCardText>
              <!-- Información general de las citas del curso -->
              <h4>Citas del curso:</h4>
              <VRow>
                <VCol>
                  <p>Total de citas: {{ curso.citasTotales }}</p>
                  <p>Citas asignadas: {{ curso.citasAsignadas }}</p>
                  <p>Citas disponibles: {{ curso.citasDisponibles }}</p>
                </VCol>
              </VRow>

              <!-- Listado de profesores y horarios -->
              <h4>Profesores y horarios:</h4>
              <VExpansionPanels>
                <VExpansionPanel v-for="(profesor, pIndex) in curso.profesores" :key="pIndex">
                  <VExpansionPanelTitle>
                    Profesor: {{ profesor.nombre }}
                  </VExpansionPanelTitle>
                  <VExpansionPanelText>
                    <!-- Información de horarios de consulta -->
                    <div class="mb-2">
                      <VChip
                        v-for="(schedule, hIndex) in profesor.schedules"
                        :key="hIndex"
                        class="mr-2"
                      >
                        {{ schedule.dayOfWeek }}: {{ formatTime(schedule.startTime) }} - {{ formatTime(schedule.endTime) }}
                      </VChip>
                    </div>
                    
                  </VExpansionPanelText>

                  
                </VExpansionPanel>
                
              </VExpansionPanels>
              <!-- Botón para seleccionar cita -->
              <VBtn @click="abrirDialogo(curso)" class="mt-4" color="success">
                      Solicitar Cita
                    </VBtn>
            </VCardText>
          </VCard>
        </VExpansionPanelText>
      </VExpansionPanel>
    </VExpansionPanels>

     <!-- Dialog para mostrar las citas -->
     <VDialog v-model="dialog" persistent max-width="500">
      <VCard>
        <VCardTitle class="headline">Seleccionar Cita</VCardTitle>
        <VCardText>
          <p v-if="citaActual">
            Cita disponible: <br>
            Día: {{ citaActual.dayOfWeek }} <br>
            Hora: {{ formatTime(citaActual.startTime) }} - {{ formatTime(citaActual.endTime) }} <br>
            Duración: {{ citaActual.duration }} minutos <br>
            Espacios disponibles: {{ citaActual.availableSlots }}
          </p>
        </VCardText>

        <VCardActions>
          <VBtn color="green" @click="aceptarCita">Aceptar</VBtn>
          <VBtn color="red" @click="rechazarCita">Rechazar</VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

  </VContainer>
</template>

<script setup>
import Alerta from '@/helpers/Alerta';
import { useAppointmentStore } from '../stores/cita.js';
import { ref } from 'vue';

//Stores
const citaStore = useAppointmentStore();

// Variables reactivas
const cursos = ref([]);
const dialog = ref(false);
const cursoSeleccionado = ref(null);
const citaActual = ref({});
let indiceCita = 0


//TODO: Obtener los cursos del estudiante
//cursos de ejemplo
cursos.value = [
  {
    codigo: 'CS101',
    nombre: 'Programación Básica',
    profesores: [
      {
        nombre: 'Dr. Juan Pérez',
        schedules: [
          {
            id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            professor: 'Dr. Juan Pérez',
            dayOfWeek: 'Lunes',
            startTime: { hour: 10, minute: 0, second: 0, nano: 0 },
            endTime: { hour: 11, minute: 0, second: 0, nano: 0 },
            availableSlots: 3,
            duration: 15
          },
          {
            id: '4b85e64-5717-4562-b3fc-2c963f66afa6',
            professor: 'Dr. Juan Pérez',
            dayOfWeek: 'Miercoles',
            startTime: { hour: 14, minute: 0, second: 0, nano: 0 },
            endTime: { hour: 15, minute: 0, second: 0, nano: 0 },
            availableSlots: 2,
            duration: 15
          }
        ]
      },
      {
        nombre: 'Dr. Marco Polo',
        schedules: [
          {
            id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            professor: 'Dr. Marco Polo',
            dayOfWeek: 'Lunes',
            startTime: { hour: 10, minute: 0, second: 0, nano: 0 },
            endTime: { hour: 11, minute: 0, second: 0, nano: 0 },
            availableSlots: 3,
            duration: 15
          },
          {
            id: '4b85e64-5717-4562-b3fc-2c963f66afa6',
            professor: 'Dr. Juan Pérez',
            dayOfWeek: 'Miercoles',
            startTime: { hour: 14, minute: 0, second: 0, nano: 0 },
            endTime: { hour: 15, minute: 0, second: 0, nano: 0 },
            availableSlots: 2,
            duration: 15
          }
        ]
      }
    ],
    citasTotales: 35,
    citasAsignadas: 20,
    citasDisponibles: 15
  },
  {
    codigo: 'CS102',
    nombre: 'Algoritmos y estructuras de datos',
    profesores: [
      {
        nombre: 'Luis Pablo',
        schedules: [
          {
            id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            professor: 'Luis Pablo',
            dayOfWeek: 'Martes',
            startTime: { hour: 10, minute: 0, second: 0, nano: 0 },
            endTime: { hour: 11, minute: 0, second: 0, nano: 0 },
            availableSlots: 3,
            duration: 15
          },
          {
            id: '4b85e64-5717-4562-b3fc-2c963f66afa6',
            professor: 'Luis Pablo',
            dayOfWeek: 'Jueves',
            startTime: { hour: 14, minute: 0, second: 0, nano: 0 },
            endTime: { hour: 15, minute: 0, second: 0, nano: 0 },
            availableSlots: 2,
            duration: 15
          }
        ]
      }
    ],
    citasTotales: 10,
    citasAsignadas: 5,
    citasDisponibles: 5
  },
  {
    codigo: 'CS102',
    nombre: 'Administración de Proyectos I',
    profesores: [
      {
        nombre: 'Sonia Mora',
        schedules: [
          
        ]
      }
    ],
    citasTotales: 10,
    citasAsignadas: 10,
    citasDisponibles: 0
  },
];



// Función para formatear la hora
const formatTime = (time) => {
  const hours = time.hour.toString().padStart(2, '0');
  const minutes = time.minute.toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

// Abrir el diálogo con la primera cita disponible
const abrirDialogo = (curso) => {
  

  //ejemplo con la lista de prueba
  cursoSeleccionado.value = curso;
  indiceCita = 0;
  if (curso.schedules && curso.schedules.length > 0) {
    citaActual.value = curso.professors[0].schedules[indiceCita];
    dialog.value = true;
  } else {
    Alerta.showWarning("Citas agotadas","No hay citas disponibles.");
  }
  
  //TODO


};

// Aceptar la cita
const aceptarCita = () => {

  //TODO

  dialog.value = false;
};

const rechazarCita = () => {
  //ejemplo con la lista de prueba
  indiceCita++;
  if (indiceCita < profesorSeleccionado.value.schedules.length) {
    citaActual.value = profesorSeleccionado.value.schedules[indiceCita];
  } else {
    Alerta.showWarning("Citas agotadas","No hay más citas disponibles.");
    dialog.value = false;
  }


  //TODO

};

</script>

<style scoped>
h2 {
  text-align: center;
  margin-bottom: 20px;
}
</style> 