import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import './assets/main.css'; // Stil dosyasını burada içe aktarıyoruz
import Column from 'primevue/column';

Vue.component('PrimeColumn', Column);

Vue.config.productionTip = false

new Vue({
  router,
  store: createPinia(),
  render: h => h(App)
}).$mount('#app')
