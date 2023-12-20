<template>
    <div class="login-reg-panel">
      <div class="login-info-box">
        <h2>Have an account?</h2>
        <label id="label-register" for="log-reg-show">Login</label>
        <input type="radio" name="active-log-panel" id="log-reg-show"  checked="checked">
      </div>
                
      <div class="register-info-box">
        <h2>Don't have an account?</h2>
        <label id="label-login" for="log-login-show">Register</label>
        <input type="radio" name="active-log-panel" id="log-login-show">
      </div>
                
      <div class="white-panel">
        <form @submit.prevent="login"> <!-- Form etiketi eklendi ve event handler atanıyor -->
        <div class="login-show">
          <h2>LOGIN</h2>
          <input type="text" placeholder="Email" v-model="loginData.email">
          <input type="password" placeholder="Password" v-model="loginData.password">
          <input type="button" value="Login">
          
        </div>
    </form>
        <div class="register-show">
          <h2>REGISTER</h2>
          <input type="text" placeholder="Email">
          <input type="password" placeholder="Password">
          <input type="password" placeholder="Confirm Password">
          <input type="button" value="Register">
        </div>
      </div>
    </div>
    </template>

    <script>
    //Bootstrap
    import './App.css'; 
    import 'bootstrap/dist/css/bootstrap.min.css';
    import 'bootstrap/dist/js/bootstrap.min.js';
    import 'jquery/dist/jquery.min.js';
    import $ from 'jquery';
    import Password from 'primevue/password';

    
    export default {
        data() {
            return {
                loginData: {
                    email: '',    // Bu özellik burada tanımlanmış olmalı
                    password: ''
                },
                registerErrors: {
                email: null,     // E-posta için hata mesajı
                password: null,  // Parola için hata mesajı
                confirmPassword: null, // Parolanın tekrarı için hata mesajı
                // Diğer hata mesajları...
                },
                loginErrors: {
                email: null,     // E-posta için hata mesajı
                password: null   // Parola için hata mesajı
                },
                isSubmitting: false, // Form gönderilirken true olur
                successMessage: 'Successful!', // Başarılı işlem sonrası mesaj
                errorMessage: 'Error!',   // Hata durumunda gösterilecek mesaj
                showPassword: false,  // Parola alanında parolayı göster/gizle
                externalData: null, // API'den alınan veya dış kaynaklardan gelen veri
            };
        },
        methods: {
            async login() {
                try {
                const response = await this.$axios.post('/login',{
                    email: this.loginData.email,
                    password: this.loginData.password
                });

                if (response.data.success) {
                    this.$router.push('/home'); // Kullanıcıyı anasayfaya yönlendir
                } else {
                    // Eğer beklenen 'data' yoksa, bir hata mesajı ayarlayın
                    this.errorMessage = response.data.message;
                }
                } catch (error) {
                    this.errorMessage = 'Login request failed.';
                    
                if (error.response && error.response.data) {
                    // Sunucudan gelen hata mesajını kullanın
                    this.errorMessage = error.response.data.message || 'Login failed';
                } else {
                    // Genel bir hata mesajı kullanın
                    this.errorMessage = 'Login failed due to network error';
                }
                }
            },
            async register() {
                try {
                const response = await this.$axios.post('/register', {
                    email: this.registerData.email,
                    password: this.registerData.password,
                    // Diğer kayıt bilgileri (varsa)
                });
                if (response.data.success) {
                    this.$router.push('/home'); // Kullanıcıyı anasayfaya yönlendir
                } else {
                    // Hata mesajını göster
                    this.errorMessage = response.data.message;
                }
                } catch (error) {
                this.errorMessage = 'Register request failed.';
                }
            },
            validateLoginForm() {
                // Giriş formu için basit validasyon
                if (!this.loginData.email || !this.loginData.password) {
                this.loginErrors.email = 'E-posta gereklidir';
                this.loginErrors.password = 'Parola gereklidir';
                return false;
                }
                return true;
            },
            validateRegisterForm() {
                let isValid = true;
                // Kayıt formu için basit validasyon
                if (!this.registerData.email) {
                    this.registerErrors.email = 'E-posta adresi gereklidir.';
                    isValid = false;
                } else if (!this.isValidEmail(this.registerData.email)) {
                    this.registerErrors.email = 'Geçerli bir e-posta adresi girin.';
                    isValid = false;
                }
                if (!this.registerData.password) {
                    this.registerErrors.password = 'Parola gereklidir.';
                    isValid = false;
                } else if (this.registerData.password.length < 8) {
                    this.registerErrors.password = 'Parola en az 6 karakter olmalıdır.';
                    isValid = false;
                }
                if (this.registerData.password !== this.registerData.confirmPassword) {
                    this.registerErrors.confirmPassword = 'Parolalar eşleşmiyor.';
                    isValid = false;
                }
                return isValid;
            },
            isValidEmail(email) {
                const emailRegex = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return emailRegex.test(email);
            },
            togglePasswordVisibility() {
                this.showPassword = !this.showPassword;
            },
            resetLoginForm() {
                this.loginData.email = '';
                this.loginData.password = '';
                this.loginErrors.email = null;
                this.loginErrors.password = null;
            },

            resetRegisterForm() {
                this.registerData.name = '';
                this.registerData.email = '';
                this.registerData.password = '';
                this.registerData.confirmPassword = '';
                this.registerErrors.name = null;
                this.registerErrors.email = null;
                this.registerErrors.password = null;
                this.registerErrors.confirmPassword = null;
            },
        },

      mounted(){
    
     //Animated Code
      $(document).ready(function(){
            $('.login-info-box').fadeOut();
            $('.login-show').addClass('show-log-panel');
        });
        
        
        $('.login-reg-panel input[type="radio"]').on('change', function() {
            if($('#log-login-show').is(':checked')) {
                $('.register-info-box').fadeOut(); 
                $('.login-info-box').fadeIn();
                
                $('.white-panel').addClass('right-log');
                $('.register-show').addClass('show-log-panel');
                $('.login-show').removeClass('show-log-panel');
                
            }
            else if($('#log-reg-show').is(':checked')) {
                $('.register-info-box').fadeIn();
                $('.login-info-box').fadeOut();
                
                $('.white-panel').removeClass('right-log');
                
                $('.login-show').addClass('show-log-panel');
                $('.register-show').removeClass('show-log-panel');
            }
        });
      },
      
    }
    </script>
  
