import { defineStore } from "pinia";
import { ref } from "vue";
import axiosClient from "@/axiosClient";

export const useStudentStore = defineStore("student", () => {
  const student = ref("");

  function saveStudent(pStudent) {
    student.value = pStudent;
  }

  function getStudentEnrollments() {
    return student.value.enrollments;
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
    saveStudent,
    getStudentEnrollments,
    fetchStudentById,
    updateStudentStarRating,
  };
});
