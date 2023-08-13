import { createRouter, createWebHistory } from 'vue-router'

import Login from '../views/authentification/Login.vue';
import Register from '../views/authentification/Register.vue';
import TaskManager from '../components/TaskManager.vue';
const routes = [
  {
    path: '/',
    redirect: '/login', // Redirection vers la page de connexion
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/tasks',
    name: 'TaskManager',
    component: TaskManager,
    meta: { requiresAuth: true }, // Marque la route nécessitant une authentification
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
