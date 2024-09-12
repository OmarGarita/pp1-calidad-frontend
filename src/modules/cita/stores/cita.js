import { defineStore } from "pinia";
import { ref } from "vue";
import axiosClient from "@/axiosClient";

export const useAppointmentStore = defineStore("appointment", () => {
  const currentStudent = ref(null);

  const setCurrentStudent = (student) => {
    currentStudent.value = student;
  };

  return {
    currentStudent,
    setCurrentStudent,
  };
});
