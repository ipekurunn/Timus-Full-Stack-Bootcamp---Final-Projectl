// router/index.js
import Vue from 'vue';
import Router from 'vue-router';
import UserAuth from '@/views/UserAuth.vue';
import UserProfile from '@/components/UserProfile.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
  routes: [
    {
        path: '/',
        name: 'auth',
        component: UserAuth
    },
    {
        path: '/userProfile',
        name: 'userProfile',
        component: UserProfile
    },

  ]
});


