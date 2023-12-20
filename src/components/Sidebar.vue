<template>
  <v-navigation-drawer v-model="drawer" app class="custom-sidebar" color="custom-sidebar">
    <v-img
      height="140"
      class="pa-4"
      src="assets/img.png"    
      >
      <div class="text-center">
        <v-avatar class="mb-4" color="white darken-1" size="100">
          <v-img
            src="assets/img.png"          
        /></v-avatar>
      </div>
    </v-img>
    <v-divider></v-divider>
    <v-list>
      <v-list-item v-for="[icon, text] in links" :key="icon" link>
        <v-list-item-icon>
          <v-icon>{{ icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "Sidebar",
  props: ['drawer'],
  data() {
    return {
      localDrawer: this.drawer,
      links: [
        ["mdi-microsoft-windows", "Dashboard"],
        ["mdi-account", "Profile"],
        ["mdi-clipboard-list-outline", "Products"],
        ["mdi-card-account-details-outline", "Orders"],
        ["mdi-cog", "System Setting"],
      ],
    };
  },
  watch: {
    drawer(newValue) {
      this.localDrawer = newValue;
    }
  },
  methods: {
    toggleDrawer() {
      this.$emit('update:drawer', this.localDrawer);
    }
  }
};
</script>

<style scoped>
.custom-sidebar {
  background-color: rgba(83,86,173,1) !important; 
}
.custom-sidebar .v-list-item  {
  color: #FFFFFF !important; 
}

.custom-sidebar .v-list-item--active {
  color: #FFFFFF; 
}

.custom-sidebar .v-icon {
  color: #FFFFFF; 
}
</style>

