<template>
  <v-container>
    <div class="tw-flex tw-items-center tw-gap-2 tw-mb-4">
      <v-text-field
        v-model="q"
        label="Buscar por título/ingredientes"
        dense
        outlined
        hide-details
        @keyup.enter="load"
        class="tw-flex-1"
      />
      <v-select
        :items="sortItems"
        v-model="sort"
        label="Ordenar"
        dense
        outlined
        hide-details
        class="tw-w-48"
      />
      <v-select
        :items="orderItems"
        v-model="order"
        label="Ordem"
        dense
        outlined
        hide-details
        class="tw-w-32"
      />
      <v-btn color="primary" @click="load">Buscar</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="success" @click="$router.push('/recipes/new')"
        >Nova Receita</v-btn
      >
    </div>

    <v-data-table
      class="tw-bg-appbg"
      :headers="headers"
      :items="list"
      dense
      hide-default-footer
      disable-pagination
      item-key="id"
    >
      <!-- eslint-disable-next-line -->
      <template #item.actions="{ item }">
        <div class="tw-flex tw-justify-end tw-gap-2">
          <v-btn small text @click="$router.push('/recipes/' + item.id)"
            >Ver</v-btn
          >
          <v-btn
            small
            text
            @click="$router.push('/recipes/' + item.id + '/edit')"
            >Editar</v-btn
          >
          <v-btn small text color="error" @click="del(item.id)">Excluir</v-btn>
          <v-btn
            small
            text
            color="secondary"
            :href="`${base}/recipes/${item.id}/print`"
            target="_blank"
            >PDF</v-btn
          >
        </div>
      </template>

      <template #no-data>
        <div class="tw-text-center tw-py-6 tw-text-apptext">
          Nenhuma receita
        </div>
      </template>
    </v-data-table>

    <div class="tw-flex tw-justify-between tw-items-center tw-mt-4">
      <div>
        Página {{ meta.page }} de {{ meta.pages }} ({{ meta.total }} itens)
      </div>
      <div class="tw-space-x-2">
        <v-btn small :disabled="meta.page <= 1" @click="setPage(meta.page - 1)"
          >Anterior</v-btn
        >
        <v-btn
          small
          :disabled="meta.page >= meta.pages"
          @click="setPage(meta.page + 1)"
          >Próxima</v-btn
        >
      </div>
    </div>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    q: '',
    sort: 'criado_em',
    order: 'desc',
    page: 1,
    limit: 10,
    sortItems: [
      { text: 'Criado em', value: 'criado_em' },
      { text: 'Alterado em', value: 'alterado_em' },
      { text: 'Nome', value: 'nome' },
    ],
    orderItems: [
      { text: 'Desc', value: 'desc' },
      { text: 'Asc', value: 'asc' },
    ],
    base: process.env.VUE_APP_API_BASE || 'http://localhost:3000',
    headers: [
      { text: 'Nome', value: 'nome', align: 'start' },
      {
        text: 'Tempo',
        value: 'tempo_preparo_minutos',
        align: 'start',
        width: 120,
      },
      { text: 'ID', value: 'id', align: 'start', width: 90 },
      { text: '', value: 'actions', align: 'end', sortable: false, width: 280 },
    ],
  }),
  computed: {
    list() {
      return this.$store.getters['recipes/list']
    },
    meta() {
      return this.$store.getters['recipes/meta']
    },
  },
  methods: {
    async load() {
      await this.$store.dispatch('recipes/fetch', {
        page: this.page,
        limit: this.limit,
        sort: this.sort,
        order: this.order,
        q: this.q,
      })
    },
    async setPage(p) {
      this.page = p
      await this.load()
    },
    async del(id) {
      if (!confirm('Excluir?')) return // eslint-disable-line
      await this.$store.dispatch('recipes/remove', id)
      await this.load()
    },
  },
  created() {
    this.load()
  },
}
</script>
<style>
.table-td {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>
