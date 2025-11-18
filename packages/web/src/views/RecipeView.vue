<template>
  <v-container v-if="r">
    <h1 class="tw-text-2xl tw-font-bold">{{ r.nome }}</h1>
    <div class="tw-text-sm tw-text-gray-600">ID {{ r.id }}</div>
    <p><strong>Tempo:</strong> {{ r.tempo_preparo_minutos || '-' }} min</p>
    <h3 class="tw-font-semibold">Ingredientes</h3>
    <pre
      class="bg-color-gray tw-p-3 tw-rounded-2xl"
      style="white-space: normal"
      >{{ r.ingredientes || '-' }}</pre
    >
    <h3 class="tw-font-semibold">Modo de preparo</h3>
    <pre
      class="bg-color-gray tw-p-3 tw-rounded-2xl"
      style="white-space: normal"
      >{{ r.modo_preparo || '-' }}</pre
    >
    <div class="tw-space-x-2 tw-mt-4">
      <v-btn color="primary" @click="$router.push('/recipes/' + r.id + '/edit')"
        >Editar</v-btn
      >
      <v-btn
        color="secondary"
        :href="`${base}/recipes/${r.id}/print`"
        target="_blank"
        >PDF</v-btn
      >
    </div>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    base: process.env.VUE_APP_API_BASE || 'http://localhost:3000',
  }),
  computed: {
    r() {
      return this.$store.getters['recipes/current']
    },
  },
  async created() {
    await this.$store.dispatch('recipes/get', this.$route.params.id)
  },
}
</script>
<style>
.bg-color-gray {
  background-color: rgba(243, 244, 246, 0.2);
}
</style>
