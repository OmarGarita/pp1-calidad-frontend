import { defineStore } from "pinia";
import { ref } from "vue";
import axiosClient from "@/axiosClient";

export const useCourseStore = defineStore("course", () => {
  const professor = ref("");

  function saveCourse(pCourse) {
    course.value = pCourse;
  }

  // Obtener todos los cursos
  async function fetchCourses() {
      const response = await axiosClient.get("/courses");
      courses.value = response.data;
      return courses.value;
  }

    // Obtener un curso por ID
  async function fetchCourseById(courseId) {
      const response = await axiosClient.get(`/courses/${courseId}`);
      if (!response.data) {
        throw new Error("Course not found");
      }
      course.value = response.data;
      return course.value;
  }

  // Actualizar la fecha de fin de semestre de un curso
  async function updateCourseEndSemester(courseId, endDate) {
    const response = await axiosClient.patch(
      `/courses/${courseId}/semester-end`,
      { endDate }
    );
    const updatedCourse = response.data;
    saveCourse(updatedCourse);
    return updatedCourse;
  }

  // Añadir un profesor a un curso
  async function addProfessorToCourse(courseId, professorId) {
    const response = await axiosClient.patch(
      `/courses/${courseId}/professors`,
      { professorId }
    );
    const updatedCourse = response.data;
    saveCourse(updatedCourse);
    return updatedCourse;
  }

  return {
    course,
    saveCourse,
    fetchCourses,
    fetchCourseById,
    updateCourseEndSemester,
    addProfessorToCourse,
  };
});
