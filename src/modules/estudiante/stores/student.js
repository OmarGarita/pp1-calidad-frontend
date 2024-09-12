import { defineStore } from "pinia";
import { ref } from "vue";
import axiosClient from "@/axiosClient";

export const useStudentStore = defineStore("student", () => {
  const student = ref("");
  const enrrollments = ref([]);
  const reports = ref([]);

  function saveStudent(pStudent) {
    student.value = pStudent;
  }

  async function getStudentEnrollments() {
    const response = await axiosClient.get(`/students/${student.value.id}/enrollments`);
    if(response.status < 400){
      enrrollments.value = response.data;
      return enrrollments.value;
    }
    
  }

  async function addEnrrollment(data){
    const response = await axiosClient.post(`/students/${student.value.id}/enrollments`, data);
    if(response.status >= 400){
      throw new Error("Student not found");
    }
    
  }

  async function fetchStudentById(studentId) {
    const response = await axiosClient.get("/students/results", {
      params: {
        idCard: studentId,
      },
    });
    if (response.data.length === 0) {
      throw new Error("Student not found");
    }
    student.value = response.data[0];
    return student.value;
  }

  async function getStudentReports(filtros) {
    const response = await axiosClient.get("/students/results", {
      params: filtros,
    });
    reports.value = response.data;
    return reports.value;
  }

  async function updateStudentStarRating(enrollmentId, starRating) {
    const response = await axiosClient.patch(
      `/students/${student.value.id}/enrollments/${enrollmentId}/star-rating`,
      {
        starRating,
      }
    );
    const updatedEnrollment = response.data;
    const index = student.value.enrollments.findIndex(
      (enrollment) => enrollment.id === updatedEnrollment.id
    );
  }

  return {
    student,
    enrrollments,
    reports,
    saveStudent,
    getStudentEnrollments,
    addEnrrollment,
    fetchStudentById,
    getStudentReports,
    updateStudentStarRating,
  };
});
