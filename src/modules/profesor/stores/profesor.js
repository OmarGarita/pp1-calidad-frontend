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
  async function fetchProfessorById(professorId) {
    const response = await axiosClient.get(`/professors/${professorId}`);
    if (!response.data) {
        throw new Error("Professor not found");
    }
    professor.value = response.data;
    return professor.value;
  }

    // Añadir un horario de consulta a un profesor
  async function addConsultationSchedule(professorId, addScheduleReq) {
    const response = await axiosClient.post(`/professors/${professorId}/schedules`, addScheduleReq);
    const createdSchedule = response.data;
        
    if (professor.value.id === professorId) {
        if (!professor.value.schedules) {
          professor.value.schedules = [];
        }
        professor.value.schedules.push(createdSchedule);
    }
    return createdSchedule;
    }

      return {
        professor,
        saveProfessor,
        fetchProfessors,
        fetchProfessorById,
        addConsultationSchedule,
      };
    });
