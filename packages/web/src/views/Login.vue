<template>
  <v-container class="tw-max-w-md tw-mx-auto tw-space-y-4">
    <div class="tw-flex tw-justify-center tw-mt-6">
      <v-avatar size="112" class="tw-shadow">
        <img src="@/assets/logo.png" alt="Logo a4pm-masterchef" />
      </v-avatar>
    </div>
    <h1 class="tw-text-2xl tw-font-bold">Login</h1>
    <v-form @submit.prevent="submit">
      <v-text-field v-model="login" label="Login" outlined dense />
      <v-text-field
        v-model="senha"
        label="Senha"
        type="password"
        outlined
        dense
      />
      <v-btn color="primary" type="submit" class="tw-w-full">Entrar</v-btn>
    </v-form>
    <div class="tw-text-sm">
      Novo aqui? <router-link to="/register">Criar conta</router-link>
    </div>
  </v-container>
</template>
<script>
export default {
  data: () => ({ login: '', senha: '' }),
  methods: {
    async submit() {
      try {
        await this.$store.dispatch('user/login', {
          login: this.login,
          senha: this.senha,
        })
        this.$router.push('/')
      } catch (e) {
        console.log(e)
        // this.$vuetify.toast?.error?.('Falha no login') || alert('Falha no login');
      }
    },
  },
}
</script>
