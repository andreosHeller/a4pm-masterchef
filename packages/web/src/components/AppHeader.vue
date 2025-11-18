<template>
  <v-app-bar app dense elevation="2">
    <v-toolbar-title color="primary" class="tw-font-bold tw-text-brand"
      >A4PM MasterChef</v-toolbar-title
    >

    <v-spacer />

    <v-btn text to="/" exact>
      <v-icon left>mdi-home</v-icon>
      Home
    </v-btn>

    <template v-if="isLogged">
      <v-divider vertical class="mx-2" />
      <span class="tw-text-base tw-text-apptext tw-mr-3 ml-2 mr-4"
        >Olá, {{ me.login }}</span
      >
      <v-btn outlined color="primary" @click="doLogout">
        <v-icon left>mdi-logout</v-icon>
        Sair
      </v-btn>
    </template>

    <template v-else>
      <v-divider vertical class="mx-2" />
      <v-btn color="primary" text to="/login">Entrar</v-btn>
      <v-btn color="primary" text to="/register">Registrar</v-btn>
    </template>
  </v-app-bar>
</template>

<script>
export default {
  name: 'AppHeader',
  computed: {
    isLogged() {
      return this.$store.getters['user/isLogged']
    },
    me() {
      return this.$store.getters['user/me'] || {}
    },
  },
  methods: {
    async doLogout() {
      try {
        await this.$store.dispatch('user/logout')
        this.$snack?.info?.('Você saiu')
        this.$router.replace({ name: 'login', query: { redirect: '/' } })
      } catch (e) {
        this.$snack?.error?.('Falha ao sair')
      }
    },
  },
}
</script>
