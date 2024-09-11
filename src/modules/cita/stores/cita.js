import { defineStore } from "pinia";
import { ref } from "vue";
import axiosClient from "@/axiosClient";

export const useAppointmentStore = defineStore("appointment", () => {
  const appointments = ref([]);
  const nextAppointment = ref({});

  // Guardar la próxima cita en el estado
  function saveNextAppointment(appointment) {
    nextAppointment.value = appointment;
  }

  // Obtener la próxima cita disponible
  async function fetchNextAppointment(studentId, courseId, lastAppointmentId = null) {
    const response = await axiosClient.get("/appointments/next", {
      params: {
        studentId,
        courseId,
        lastAppointmentId,
      },
    });
    const appointment = response.data;
    saveNextAppointment(appointment);
    return appointment;
  }

  // Aceptar una cita
  async function acceptAppointment(appointmentId) {
    const response = await axiosClient.patch(`/appointments/${appointmentId}/accept`);
    const updatedAppointment = response.data;

    const index = appointments.value.findIndex(
      (appointment) => appointment.id === updatedAppointment.id
    );
    if (index !== -1) {
      appointments.value[index] = updatedAppointment;
    }

    if (nextAppointment.value.id === updatedAppointment.id) {
      saveNextAppointment(updatedAppointment);
    }

    return updatedAppointment;
  }

  return {
    appointments,
    nextAppointment,
    saveNextAppointment,
    fetchNextAppointment,
    acceptAppointment,
  };
});