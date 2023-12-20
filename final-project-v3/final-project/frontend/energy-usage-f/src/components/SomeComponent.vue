<template>
    <div class="users-list">
      <h2>Kullanıcı Listesi</h2>
      <ul v-if="users.length">
        <li v-for="user in users" :key="user.id">
          {{ user.name }} - {{ user.email }}
        </li>
      </ul>
      <p v-else>Kullanıcı bulunamadı.</p>
    </div>
  </template>
  
  <script>
  import axios from '@/axios'; // Axios instance'ını içe aktarın
  
  export default {
    data() {
      return {
        users: [] // Kullanıcı verilerini saklayacak
      };
    },
    methods: {
      fetchUsers() {
        axios.get('/users')
          .then(response => {
            this.users = response.data;
          })
          .catch(error => {
            console.error('Kullanıcılar yüklenirken bir hata oluştu:', error);
          });
      },
      fetchData() {
      // API isteği
        }
    },
    mounted() {
      this.fetchUsers();
    }
  };
  </script>
  
  <style>
  .users-list {
    max-width: 600px; /* Maksimum genişlik */
    margin: 0 auto; /* Merkezde hizalama */
    padding: 20px; /* İç boşluk */
    background-color: #f9f9f9; /* Arka plan rengi */
    border-radius: 8px; /* Köşeleri yuvarlaklaştır */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Gölge efekti */
  }
  
  .users-list h2 {
    color: #333; /* Başlık rengi */
    margin-bottom: 15px; /* Başlığın altındaki boşluk */
    text-align: center; /* Başlığı ortala */
  }
  
  .users-list ul {
    list-style: none; /* Liste işaretlerini kaldır */
    padding: 0; /* Üst ve alt boşlukları sıfırla */
  }
  
  .users-list li {
    padding: 10px; /* Liste öğeleri için iç boşluk */
    border-bottom: 1px solid #ddd; /* Alt çizgi */
    color: #555; /* Metin rengi */
  }
  
  .users-list li:last-child {
    border-bottom: none; /* Son liste öğesinde alt çizgiyi kaldır */
  }
  </style>