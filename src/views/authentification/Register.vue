<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 class="text-3xl font-semibold text-center mb-6">Create an Account</h2>
      <form @submit.prevent="register" class="space-y-4">
        <div class="mb-4">
          <input v-model="name" type="text" class="form-input w-full md:w-96 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Full Name" required />
        </div>
        <div class="mb-4">
          <input v-model="email" type="email" class="form-input w-full md:w-96 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Email Address" required />
        </div>
        <div class="mb-4">
          <input v-model="password" type="password" class="form-input w-full md:w-96 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Password" required />
        </div>
        <button type="submit" class="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          Register
        </button>
      </form>
      <div v-if="successMessage" class="text-green-500 mt-4 text-center">{{ successMessage }}</div>
      <div v-if="errorMessage" class="text-red-500 mt-4 text-center">{{ errorMessage }}</div>
      <p class="mt-6 text-center text-gray-600">
        Already have an account? <router-link to="/login" class="text-blue-500">Log in</router-link>
      </p>
    </div>
  </div>
</template>


<script>
import axios from 'axios';
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      successMessage: '',
      errorMessage: '',
    };
  },
  methods: {
    async register() {
      try {
        // ... registration logic ...
        const response = await axios.post('/api/register', {
          name: this.name,
          email: this.email,
          password: this.password,
        });
        const token = response.data.token;
        localStorage.setItem('token', token); 
        this.successMessage = 'Registration successful!';

        // Automatic redirection after 3 seconds
        setTimeout(() => {
            // Rediriger vers la liste des tâches
            this.$router.push({ name: 'TaskManager' });
        }, 1000);

        console.log(token);
      } catch (error) {
        this.errorMessage = 'An error occurred during registration.';
        console.error(error);
      }
    },
  },
};
</script>


<style scoped>
/* Styles personnalisés ici */
</style>

       
