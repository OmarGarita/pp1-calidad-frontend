import { defineStore } from "pinia";
import { ref } from "vue";
import axiosClient from "@/axiosClient";

export const useProfesorStore = defineStore("professor", () => {
  const professor = ref("");
  
  function saveProfessor(pProfessor) {
    professor.value = pProfessor;
  }

  // Obtener todos los profesores
  async function fetchProfessors() {
    const response = await axiosClient.get("/professors");
    professors.value = response.data;
    return professors.value;
  }

  // Obtener un profesor por ID
  async function fetchProfessorByName(nombre) {
    const response = await axiosClient.get("/professors");
    
    const index = response.data.findIndex((item) => item.name === nombre);
    if(index != -1){
      professor.value = response.data[index];
      return professor.value;
    }
    else{
      throw new Error("Professor not found");
    }
  }

  // Añadir un horario de consulta a un profesor
  async function addConsultationSchedule(addScheduleReq) {
    console.log(addScheduleReq)
    const response = await axiosClient.post(`/professors/${professor.value.id}/schedules`, addScheduleReq);
    const createdSchedule = response.data;
        
    if (response.status <400) {
      professor.value.schedules.push(createdSchedule);
    }
    return createdSchedule;
  }

  return {
    professor,
    saveProfessor,
    fetchProfessors,
    fetchProfessorByName,
    addConsultationSchedule,
  };
});
