import axios from 'axios';

// Axios için global yapılandırmayı oluşturun
const instance = axios.create({
  baseURL: 'https://your-api-url.com',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`, // Token'ı localStorage'dan al
    'Cache-Control': 'no-cache',
  },
  timeout: 10000, // zaman aşımı
  params: {
    apiKey: 'your-api-key',
    lang: 'en', // Örneğin, 'en' İngilizce, 'tr' Türkçe için
    sort: 'name', // Örneğin, 'name' alanına göre sırala
    order: 'asc', // Artan sıralama (ascending)
    status: 'active', // Örneğin, sadece aktif öğeleri getir
    category: 'news', // Belirli bir kategoriye göre filtreleme
  },

  transformRequest: [function (data) {
    // İstek verilerini dönüştür
    return data;
  }],
  transformResponse: [function (data) {
    // Yanıt verilerini dönüştür
    return data;
  }],
  withCredentials: true,
  validateStatus: function (status) {
    return status >= 200 && status < 300; // Varsayılan
  },
});

instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('AuthToken'); // Örnek olarak localStorage'dan alınan token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    }, function (error) {
      // Hata işleme...
      return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    // Yanıt verisini burada işleyin
    return response;
}, function (error) {
    // Yanıt hataları için işlem yapın
    // Örneğin: Eğer hata durumu belirli bir koşulu karşılıyorsa, özel bir işlem yap
    if (error.response && error.response.status === 401) {
      // Örneğin, yetkilendirme hatası için özel işlem yap
}
    return Promise.reject(error);
});

// Yapılandırılmış Axios instance'ını dışa aktarın
export default instance;
