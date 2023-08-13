<template>
  <div class="bg-gray-100 min-h-screen py-8">
    <div class="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow w-90">
     <div class="flex justify-between items-center">
        <div class="text-gray-600">{{ welcomeMessage }}</div>
        <button @click="logout" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
          Logout
        </button>
       </div>
      <h1 class="text-2xl font-semibold mb-4">Task Management Panel</h1>
      <TaskForm :task="selectedTask" @task-added="loadTasks" @task-updated="loadTasks" />
      <TaskList :tasks="tasks" @edit-task="editTask" @task-updated="loadTasks" />
  
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import TaskForm from '@/components/TaskForm.vue';
import TaskList from '@/components/TaskList.vue';

export default {
  components: {
    TaskForm,
    TaskList,
  },

  data() {
    return {
      tasks: [],
      selectedTask: null,
      token : localStorage.getItem('token'),

    };
  },

  computed: {
    welcomeMessage() {
      return `Welcome to Your Task Management Panel. Take charge of your tasks and stay organized like never before !`;
    },
  },

  mounted() {
    this.loadTasks();
    if (!this.token) {
      this.$router.push({ name: 'Login' }); // Rediriger vers la page de connexion
    }
  
  },

  methods: {
    async loadTasks() {
      this.selectedTask= {};
      try {
        const response = await axios.get('/api/tasks', {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });

        this.tasks = response.data;
      } catch (error) {
        console.error(error);
      }
    },


    editTask(task) {
      this.selectedTask = task;
    },


     async logout() {
      try {
        const response = await axios.post('/api/logout', {}, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          }
        });

        console.log(response.data.message); // Afficher le message de succès
        localStorage.removeItem('token'); // Supprimer le token du local storage
        // Rediriger l'utilisateur vers la page de connexion
        this.$router.push('/');
      } catch (error) {
        console.error(error);
      }
    },

  },
};
</script>

<style>
/* Styles spécifiques à ce composant */
</style>
