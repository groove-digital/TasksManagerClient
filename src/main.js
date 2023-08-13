import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import '../src/assets/css/app.css';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';



// Configuration de l'URL de base de l'API
axios.defaults.baseURL = 'http://localhost:8000'; // Remplacez par le port de votre API

createApp(App).use(store).use(router).use(Toast).mount('#app')
