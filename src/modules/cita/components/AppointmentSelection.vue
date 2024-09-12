<template>
  <VContainer>
    <VExpansionPanels v-if="enrollments.length" class="mt-4">
      <VExpansionPanel
        v-for="enrollment in enrollments"
        :key="enrollment.course.id"
      >
        <VExpansionPanelTitle>
          {{ enrollment.course.code }} - {{ enrollment.course.name }}
        </VExpansionPanelTitle>
        <VExpansionPanelText>
          <VCard outlined>
            <VCardText>
              <!-- Información general de las citas del curso -->
              <h4>Citas del curso:</h4>
              <VRow>
                <VCol>
                  <p>
                    Total de citas: {{ enrollment.course.totalAppointments }}
                  </p>
                  <p>
                    Citas asignadas:
                    {{ enrollment.course.acceptedAppointments }}
                  </p>
                  <p>
                    Citas disponibles:
                    {{ enrollment.course.availableAppointments }}
                  </p>
                </VCol>
              </VRow>

              <!-- Listado de profesores y horarios -->
              <h4>Profesores y horarios:</h4>
              <VExpansionPanels>
                <VExpansionPanel
                  v-for="(professor, pIndex) in enrollment.course.professors"
                  :key="pIndex"
                >
                  <VExpansionPanelTitle>
                    Profesor: {{ professor.name }}
                  </VExpansionPanelTitle>
                  <VExpansionPanelText>
                    <!-- Información de horarios de consulta -->
                    <div class="mb-4">
                      <VChip
                        v-for="schedule in professor.schedules"
                        :key="schedule.id"
                        class="mr-2"
                      >
                        {{ schedule.dayOfWeek }}:
                        {{ formatTime(schedule.startTime) }} -
                        {{ formatTime(schedule.endTime) }}
                      </VChip>
                    </div>

                    <VBtn @click="openDialog(enrollment, professor)" color="success">
                      Solicitar Cita
                    </VBtn>
                  </VExpansionPanelText>
                </VExpansionPanel>
              </VExpansionPanels>
              <!-- Botón para seleccionar cita -->
            </VCardText>
          </VCard>
        </VExpansionPanelText>
      </VExpansionPanel>
    </VExpansionPanels>

    <!-- Dialog para mostrar las citas -->
    <VDialog v-model="dialog" persistent max-width="500">
      <VCard>
        <VCardTitle class="headline">Cita Disponible</VCardTitle>
        <VCardText>
          <div v-if="currentAppointment">
            <span> Cita disponible: </span>
            <br />
            <p>Fecha: {{ currentAppointment.start }}</p>
            <p>Duración: {{ currentAppointment.durationInMinutes }} minutos</p>
            <p>Estado: {{ currentAppointment.status }}</p>
            <br />
          </div>
        </VCardText>

        <VCardActions>
          <VBtn color="green" @click="acceptAppointment">Aceptar</VBtn>
          <VBtn color="red" @click="rejectAppointment">Siguiente</VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </VContainer>
</template>

<script setup>
import Alerta from "@/helpers/Alerta";
import { useAppointmentStore } from "../stores/cita.js";
import axiosClient from "@/axiosClient.js";
import { ref } from "vue";
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

// Stores
const appointmentStore = useAppointmentStore();

// Reactive variables
const enrollments = ref([]);
const currentAppointment = ref(null);
const selectedProfessor = ref(null);
const selectedCourse = ref(null);
const dialog = ref(false);

const fetchStudentEnrollments = async () => {
  try {
    const response = await axiosClient.get(
      `/students/${appointmentStore.currentStudent.id}/enrollments`
    );
    enrollments.value = response.data;
    console.log(enrollments.value);
  } catch (error) {
    Alerta.showError("Error al obtener los cursos del estudiante");
  }
};

const fetchAppointment = async (from = null) => {
  try {
    const params = {
      studentId: appointmentStore.currentStudent.id,
      courseId: selectedCourse.value.id,
      professorId: selectedProfessor.value.id,
    };
    if (from) {
      params.from = from;
    }
    const response = await axiosClient.get("/appointments/next", { params });
    currentAppointment.value = response.data;
  } catch (error) {
    Alerta.showError("Error al obtener las citas del curso");
  }
};

// Function to format time
const formatTime = (time) => {
  if (!time) {
    return "Hora no disponible";
  }
  const [hours, minutes] = time.split(":");
  return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
};

const openDialog = async (enrollment, professor) => {
  selectedCourse.value = enrollment.course;
  selectedProfessor.value = professor;
  try {
    await fetchAppointment();
    dialog.value = true;
  } catch (error) {
    Alerta.showError("Error al obtener la cita", "No se pudo obtener la cita");
  }
};

// Accept the appointment
const acceptAppointment = async () => {
  try {
    const response = await axiosClient.patch(
      `/appointments/${currentAppointment.value.id}/accept`
    );
    if (response.status === 200) {
      Alerta.showExito(
        "Cita aceptada",
        "La cita ha sido aceptada exitosamente"
      );
      currentAppointment.value = null;
      dialog.value = false;
    } else {
      Alerta.showError(
        "Error al aceptar la cita",
        "No se pudo aceptar la cita"
      );
    }
  } catch (error) {
    Alerta.showError("Error al aceptar la cita", "No se pudo aceptar la cita");
    dialog.value = false;
  }
};

const rejectAppointment = async () => {
  try {
    await fetchAppointment(currentAppointment.value.end);
  } catch (error) {
    Alerta.showError(
      "Error al pasar a la siguiente cita",
      "No se pudo pasar a la siguiente cita"
    );
    dialog.value = false;
  }
};

onMounted(async () => {
  if (!appointmentStore.currentStudent) {
    router.push("/");
    return;
  }
  await fetchStudentEnrollments();
});
</script>

<style scoped>
h2 {
  text-align: center;
  margin-bottom: 20px;
}
</style>