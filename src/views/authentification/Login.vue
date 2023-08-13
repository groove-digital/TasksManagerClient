<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 class="text-3xl font-semibold text-center mb-6">Log In</h2>
      <form @submit.prevent="login" class="space-y-4">
        <div class="form-spacing">
          <input v-model="email" type="email" class="form-input w-full rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Email Address" required />
        </div>
        <div class="form-spacing">
          <input v-model="password" type="password" class="form-input w-full rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Password" required />
        </div>
        <button type="submit" class="btn w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          Log In
        </button>
      </form>
      <div v-if="errorMessage" class="text-red-500 mt-4 text-center">{{ errorMessage }}</div>
      <p class="mt-6 text-center text-gray-600">
        Don't have an account? <router-link to="/register" class="text-blue-500">Register</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('/api/login', {
          email: this.email,
          password: this.password,
        });

        // Stocker le token JWT dans le local storage
        const token = response.data.token;
        localStorage.setItem('token', token);

        // Rediriger vers la liste des tâches
        this.$router.push({ name: 'TaskManager' });
      } catch (error) {
        this.errorMessage = 'Login failed. Please check your credentials.';
      }
    },
  },
};
</script>

<style scoped>
/* Styles personnalisés ici */
</style>