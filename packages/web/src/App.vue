<template>
  <v-app>
    <app-header />
    <v-main>
      <router-view />
    </v-main>
    <app-snackbar />
  </v-app>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import AppSnackbar from './components/AppSnackbar.vue'

export default {
  name: 'App',
  components: { AppHeader, AppSnackbar },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
