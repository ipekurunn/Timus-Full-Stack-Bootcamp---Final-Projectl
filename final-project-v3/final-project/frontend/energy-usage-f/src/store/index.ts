// src/store/index.ts
import { defineStore } from 'pinia';

export const useMyStore = defineStore({
  id: 'myStore',
  state: () => ({
    myData: null,
    isLoggedIn: false,
    user: {
      name: '',
      email: '',
    },
    factories: [],
  }),
  getters: {
    uppercasedName: (state) => state.user.name.toUpperCase(),
    isAuthenticated: (state) => state.isLoggedIn,
    activeFactories: (state) => state.factories.filter(factory => factory.isActive),
  },
  actions: {
    // Use function keyword instead of arrow function
    loginUser: function(credentials) {
        if (credentials.username === 'demo' && credentials.password === 'password') {
            this.isLoggedIn = true;
            this.user = {
                name: 'Demo User',
                email: 'demo@example.com',
            };
        } else {
            throw new Error('Invalid credentials');
        } 
    },
    logoutUser: function() {
        this.isLoggedIn = false;
        this.user = {
            name: '',
            email: '',
        };
    },
  },
});
