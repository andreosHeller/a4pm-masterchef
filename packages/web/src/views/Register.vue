<template>
  <v-container class="tw-max-w-md tw-mx-auto tw-space-y-4">
    <h1 class="tw-text-2xl tw-font-bold">Criar conta</h1>

    <v-alert
      v-if="formError"
      type="error"
      dense
      class="tw-mb-2"
      @input="formError = ''"
    >
      {{ formError }}
    </v-alert>

    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submit">
      <v-text-field
        v-model="nome"
        label="Nome"
        :rules="rules.nome"
        :counter="100"
        outlined
        dense
        required
      />

      <v-text-field
        v-model="login"
        label="Login"
        :rules="rules.login"
        :counter="100"
        :error-messages="loginServerError"
        outlined
        dense
        required
        @input="loginServerError = []"
      />

      <v-text-field
        v-model="senha"
        :append-icon="showPass ? 'mdi-eye-off' : 'mdi-eye'"
        :type="showPass ? 'text' : 'password'"
        label="Senha"
        :rules="rules.senha"
        :counter="100"
        outlined
        dense
        required
        @click:append="showPass = !showPass"
      />

      <v-btn
        color="primary"
        class="tw-w-full tw-mt-2"
        type="submit"
        :disabled="!valid || loading"
        :loading="loading"
      >
        Criar conta
      </v-btn>

      <div class="tw-text-sm tw-mt-2">
        Já tem conta? <router-link to="/login">Entrar</router-link>
      </div>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: 'Register',
  data: () => ({
    valid: false,
    loading: false,
    nome: '',
    login: '',
    senha: '',
    showPass: false,
    formError: '',
    loginServerError: [],
    rules: {
      required: (v) =>
        (!!v && String(v).trim().length > 0) || 'Campo obrigatório',
      max100: (v) =>
        !v || String(v).length <= 100 || 'Máximo de 100 caracteres',
      min8: (v) => (!!v && String(v).length >= 8) || 'Mínimo de 8 caracteres',
      nome: [],
      login: [],
      senha: [],
    },
  }),
  created() {
    this.rules.nome = [this.rules.required, this.rules.max100]
    this.rules.login = [this.rules.required, this.rules.max100]
    this.rules.senha = [this.rules.required, this.rules.min8, this.rules.max100]
  },
  methods: {
    normalizeBackendErrors(err) {
      const msg = err?.response?.data?.message
      if (Array.isArray(msg)) {
        return msg.map((m) =>
          String(m)
            .replace(
              'must be shorter than or equal to 100 characters',
              'máximo de 100 caracteres',
            )
            .replace(
              'must be longer than or equal to 8 characters',
              'mínimo de 8 caracteres',
            )
            .replace('should not be empty', 'campo obrigatório'),
        )
      }
      return msg ? [String(msg)] : ['Erro ao registrar']
    },
    async submit() {
      this.formError = ''
      this.loginServerError = []
      if (!this.$refs.form?.validate()) return
      this.loading = true
      try {
        await this.$store.dispatch('user/register', {
          nome: this.nome.trim(),
          login: this.login.trim(),
          senha: this.senha,
        })
        const dest = this.$route.query.redirect || '/'
        this.$snack.success('Conta criada com sucesso!')
        this.$router.replace(dest)
      } catch (err) {
        const code = err?.response?.data?.message
        if (code === 'login_already_in_use') {
          this.loginServerError = ['Login já está em uso']
        } else {
          const list = this.normalizeBackendErrors(err)
          this.formError = list.join('\n')
        }
        this.$snack.error('Não foi possível criar a conta')
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
