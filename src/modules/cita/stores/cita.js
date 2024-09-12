import { defineStore } from "pinia";
import { ref } from "vue";
import axiosClient from "@/axiosClient";
import { formatData } from "../helpers/formato";

export const useAppointmentStore = defineStore("appointment", () => {
  const currentStudent = ref(null);

  const setCurrentStudent = (student) => {
    currentStudent.value = student;
  };

  return {
    currentStudent,
    setCurrentStudent,
  };

  const reports = ref([])

  async function getAppointmentReports(filtros) {
    const response = await axiosClient.get("/appointments/results", {
      params: filtros,
    });
    reports.value = formatData(response.data);
    return reports.value;
  }

  return {
    currentStudent,
    setCurrentStudent,
    saveNextAppointment,
    getAppointmentReports,
    reports,
  };
});
