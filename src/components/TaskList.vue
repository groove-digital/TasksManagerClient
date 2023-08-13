<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4">Task List</h2>
    <div class="overflow-x-auto">
      <table class="min-w-full table-auto border rounded-lg overflow-hidden">
        <thead>
          <tr class="bg-gray-200">
            <th class="px-4 py-2 text-left">Title</th>
            <th class="px-4 py-2 text-left">Description</th>
            <th class="px-4 py-2 text-left">Completed</th>
            <th class="px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in tasks" :key="task._id" class="odd:bg-gray-100 even:bg-white">
            <td class="px-4 py-2">{{ task.title }}</td>
            <td class="px-4 py-2">{{ task.description }}</td>
            <td class="px-4 py-2">
              <input type="checkbox" v-model="task.completed" @change="updateTask(task)" />
            </td>
            <td class="px-4 py-2">
              <button @click="$emit('edit-task',task)" class="text-blue-600 hover:text-blue-800 px-3 ">Edit</button>
              <button class="text-red-600 hover:text-red-800" @click="deleteTask(task)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useToast } from 'vue-toastification';

export default {
  props: ['tasks'],
  methods: {
    editTask(task) {
      this.$emit('edit-task', task);
    },

    async updateTask(task) {
      const toast = useToast();
      try {
        const token = localStorage.getItem('token');
        await axios.put(`/api/tasks/${task._id}`, task, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success('Task updated successfully');
      } catch (error) {
        console.error(error);
        toast.error('Error updating task');
      }
    },
    async deleteTask(task) {
      const toast = useToast();
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`/api/tasks/${task._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.$emit('task-updated');
        toast.success('Task deleted successfully');
      } catch (error) {
        console.error(error);
        toast.error('Error deleting task');
      }
    },
  },
};
</script>

<style>
/* Styles spécifiques à ce composant */
</style>
