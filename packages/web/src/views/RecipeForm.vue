<template>
  <v-container class="tw-space-y-4">
    <h1 class="tw-text-2xl tw-font-bold">
      {{ isEdit ? 'Editar' : 'Nova' }} Receita
    </h1>
    <v-form @submit.prevent="save">
      <v-text-field v-model="form.nome" label="Nome" outlined dense />
      <v-text-field
        v-model.number="form.tempo_preparo_minutos"
        label="Tempo (min)"
        outlined
        dense
        type="number"
      />
      <v-textarea v-model="form.ingredientes" label="Ingredientes" outlined />
      <v-textarea
        v-model="form.modo_preparo"
        label="Modo de preparo"
        outlined
      />
      <div class="tw-flex tw-gap-2">
        <v-btn color="primary" type="submit">Salvar</v-btn>
        <v-btn text @click="$router.back()">Cancelar</v-btn>
      </div>
    </v-form>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    form: {
      id_usuarios: 1,
      id_categorias: 1,
      nome: '',
      tempo_preparo_minutos: null,
      ingredientes: '',
      modo_preparo: '',
    },
  }),
  computed: {
    isEdit() {
      return !!this.$route.params.id
    },
  },
  async created() {
    if (this.isEdit) {
      const r = await this.$store.dispatch('recipes/get', this.$route.params.id)
      this.form = {
        id_usuarios: r.id_usuarios,
        id_categorias: r.id_categorias,
        nome: r.nome,
        tempo_preparo_minutos: r.tempo_preparo_minutos,
        ingredientes: r.ingredientes,
        modo_preparo: r.modo_preparo,
      }
    }
  },
  methods: {
    async save() {
      const payload = {
        id_usuarios: this.form.id_usuarios,
        id_categorias: this.form.id_categorias,
        nome: this.form.nome,
        tempo_preparo_minutos: this.form.tempo_preparo_minutos,
        ingredientes: this.form.ingredientes,
        modo_preparo: this.form.modo_preparo,
      }

      if (this.isEdit) {
        await this.$store.dispatch('recipes/update', {
          id: Number(this.$route.params.id),
          ...payload,
        })
      } else {
        await this.$store.dispatch('recipes/create', payload)
      }
      this.$router.push('/')
    },
  },
}
</script>
