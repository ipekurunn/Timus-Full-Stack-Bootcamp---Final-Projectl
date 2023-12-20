<template>
  <v-app id="inspire">
    <Sidebar :drawer="drawer" />
    <Topbar @drawerEvent="drawer = !drawer" />
    <Chart/>
    <v-main style="background: #f5f5f540">
      <v-container class="py-8 px-6" fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
  
</template>

<script>
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Chart from './components/Chart';

export default {
  name: "App",
  components: { Topbar, Sidebar, Chart },
  data: () => ({
    cards: ["Today", "Yesterday"],
    drawer: null,
  }),
  methods: {},
};
</script>
