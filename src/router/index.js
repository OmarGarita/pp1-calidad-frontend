import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      name: 'main',
      component: () => import('../views/MainView.vue')
    },
    {
      path:'/modules/appointments',
      name: 'appointments-module',
      component: ()=> import('../modules/cita/views/AppointmentsView.vue')
    },
    {
      path:'/modules/appointments/select/verification',
      name: 'appointments-select-verification',
      component: ()=> import('../modules/cita/views/AppointmentsValidation.vue')
    },

    {
      path:'/modules/course',
      name: 'course-module',
      component: ()=> import('../modules/curso/views/CoursesView.vue')
    },
    {
      path:'/modules/course/add',
      name: 'add-course',
      component: ()=> import('../modules/curso/views/AddCourseView.vue')
    },
    {
      path:'/modules/course/validation',
      name: 'course-semester-end-validation',
      component: ()=> import('../modules/curso/views/CourseValidationView.vue'),
    },
    {
      path:'/modules/course/semester-end',
      name: 'course-semester-end',
      component: ()=> import('../modules/curso/views/EditSemesterEndView.vue'),
    },
    {
      path:'/modules/course/professor/validation',
      name: 'course-professor-validation',
      component: ()=> import('../modules/curso/views/CourseValidationProfessor.vue'),
    },
    {
      path:'/modules/course/professor',
      name: 'course-professor',
      component: ()=> import('../modules/curso/views/CourseAddProfessorView.vue'),
    },

    {
      path: '/modules/student',
      name: 'student-module',
      component: () => import('../modules/estudiante/views/StudentView.vue')
    },
    {
      path:'/modules/student/register',
      name: 'add-student',
      component: ()=> import('../modules/estudiante/views/AddStudentView.vue')
    },
    {
      path:'/modules/student/courses/verification',
      name: 'student-course-validation',
      component: ()=> import('../modules/estudiante/views/StudentCoursesVerification.vue')
    },
    {
      path:'/modules/student/courses',
      name: 'student-courses',
      component: ()=> import('../modules/estudiante/views/StudentCoursesView.vue')
    },
    {
      path:'/modules/professor',
      name: 'professor-module',
      component: ()=> import('../modules/profesor/views/ProfessorView.vue')
    },
    {
      path:'/modules/professor/register',
      name: 'add-professor',
      component: ()=> import('../modules/profesor/views/AddProfessor.vue')
    },
    {
      path:'/modules/professor/schedule/validation',
      name: 'professor-schedule-validation',
      component: ()=> import('../modules/profesor/views/ProfessorValidation.vue')
    },
    
    {
      path:'/modules/professor/schedule',
      name: 'professor-schedule',
      component: ()=> import('../modules/profesor/views/ProfessorScheduleView.vue')
    },
    
    
  ]
})

export default router
