import { defineStore } from "pinia";
import { ref } from "vue";
import axiosClient from "@/axiosClient";

export const useCourseStore = defineStore("course", () => {
  const course = ref("");
  const courses = ref([])
  const reports = ref([])

  function saveCourse(pCourse) {
    course.value = pCourse;
  }

  // Obtener todos los cursos
  async function fetchCourses() {
    try {
      const response = await axiosClient.get("/courses");
      courses.value = response.data
      
      return courses.value;
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  }

  // Obtener un curso por ID
  async function fetchCourseByCode(courseCod) {
      const response = await axiosClient.get('/courses');
      const index = response.data.findIndex((item) => item.code === courseCod);
      if(index != -1){
        course.value = response.data[index];
        return course.value;
      }
      else{
        throw new Error("Course not found");
      }
  }

  async function getCourseReports(filtros) {
    const response = await axiosClient.get("/courses/results", {
      params: filtros,
    });
    
    reports.value = response.data;
    return reports.value;
  }

  // Actualizar la fecha de fin de semestre de un curso
  async function updateCourseEndSemester(endDate) {
    const response = await axiosClient.patch(
      `/courses/${course.value.id}/semester-end`,endDate );
    if(response.status <400){
      const updatedCourse = response.data;
      saveCourse(updatedCourse);
      return updatedCourse;
    }
    throw new Error("Invalid Date")
  }

  // Añadir un profesor a un curso
  async function addProfessorToCourse(professorId) {
    const response = await axiosClient.patch(
      `/courses/${course.value.id}/professors`, professorId );
    if(response.status < 400){
      const updatedCourse = response.data;
      saveCourse(updatedCourse);
      return updatedCourse;
    }
    throw new Error("Professor not found")
  }

  return {
    course,
    courses,
    reports,
    saveCourse,
    fetchCourses,
    fetchCourseByCode,
    getCourseReports,
    updateCourseEndSemester,
    addProfessorToCourse,
  };
});
