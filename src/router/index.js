import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    
    {
      path: '/',
      name: 'main',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/MainView.vue')
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
      path:'/modules/professor',
      name: 'professor-module',
      component: ()=> import('../modules/profesor/views/ProfessorView.vue')
    },
    {
      path:'/modules/professor/register',
      name: 'add-professor',
      component: ()=> import('../modules/profesor/views/AddProfessor.vue')
    },
    
  ]
})

export default router
