import { defineStore } from "pinia";
import { ref } from "vue";
import axiosClient from "@/axiosClient";
import { formatData } from "../helpers/formato";

export const useAppointmentStore = defineStore("appointment", () => {

  const appointments = ref([]);
  const reports = ref([])
  const currentStudent = ref(null);

  // Guardar la próxima cita en el estado
  function saveNextAppointment(appointment) {
    nextAppointment.value = appointment;
  }
  
  const setCurrentStudent = (student) => {
    currentStudent.value = student;
  };

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

  async function getAppointmentReports(filtros) {
    const response = await axiosClient.get("/appointments/results", {
      params: filtros,
    });
    reports.value = formatData(response.data);
    return reports.value;
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
    currentStudent,
    setCurrentStudent,
    saveNextAppointment,
    getAppointmentReports,
    fetchNextAppointment,
    acceptAppointment,

  };
});
