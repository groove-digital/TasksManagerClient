<template>
  <div class="mb-6">
    <h2 class="text-xl font-semibold mb-2">Add New Task</h2>
    <input class="w-full px-3 py-2 border rounded" v-model="mytask.title" placeholder="Title" />
    <span v-if="errors.title" class="text-red-500">{{ errors.title[0] }}</span>

    <input class="w-full mt-2 px-3 py-2 border rounded" v-model="mytask.description" placeholder="Description" />
    <span v-if="errors.description" class="text-red-500">{{ errors.description[0] }}</span>

    <button
      class="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex"
      @click="submitTask"
      :disabled="isLoading"
    >
      {{ isLoading ? loadingText : actionText }}
    </button>
  </div>
</template>

<script>
import axios from 'axios';
import { useToast } from 'vue-toastification';

export default {  
  props: {
    task: Object, // Task data if editing
    loadingAddTask: Boolean, // Loading state for addTask
    loadingUpdateTask: Boolean, // Loading state for updateTask
    errors: Object, // Validation errors
  },

  data() {
   return {
      errors: {},
      token : localStorage.getItem('token'),
    };
  },

  computed: {
   actionText() {
      return (this.task && Object.keys(this.task).length) ? 'Update Task' : 'Add Task';
    },
    loadingText() {
      return (this.task && Object.keys(this.task).length) ? 'Updating...' : 'Adding...';
    },
    isLoading() {
      return (this.task && Object.keys(this.task).length) ? this.loadingUpdateTask : this.loadingAddTask;
    },
    mytask() {
      return  (this.task && Object.keys(this.task).length) ? {...(this.task)} : {};
    },
   
  },

  methods: {
    async submitTask() {
      const taskData = {
        title: this.mytask.title,
        description: this.mytask.description,
      };
      const toast = useToast();
      // Réinitialiser les erreurs avant d'envoyer la requête
      this.errors = {
        title: [],
        description: [],
      };

      try {
      
        if (this.task && Object.keys(this.task).length) {
          await axios.put(`/api/tasks/${this.task._id}`, taskData, {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          });
          this.$emit('task-updated');
        } else {
          await axios.post('/api/tasks', taskData, {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          });
          this.$emit('task-added');
        }
        // Affichage du toast de succès
        toast.success('Task operation successful');
        
      } catch (error) {
        console.error('Erreur lors de la soumission de la tâche', error);
        toast.error('Error operation');
        if (error.response && error.response.data && error.response.data.errors) {
          this.errors = error.response.data.errors;
        }
      }
    },
  },
};
</script>

<style>
/* Styles spécifiques à ce composant */
</style>
