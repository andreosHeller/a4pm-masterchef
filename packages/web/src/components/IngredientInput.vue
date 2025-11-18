<!-- IngredientInput.vue -->
<template>
  <v-combobox
    v-model="internal"
    :items="suggestions"
    label="Ingredientes"
    multiple
    chips
    clearable
    small-chips
    hide-selected
    deletable-chips
    :hint="hint"
    persistent-hint
    @change="emit"
  />
</template>

<script>
export default {
  name: 'IngredientInput',
  props: {
    value: { type: Array, default: () => [] },
    suggestions: { type: Array, default: () => [] },
    hint: { type: String, default: 'Pressione Enter para adicionar' },
  },
  data: () => ({ internal: [] }),
  watch: {
    value: {
      immediate: true,
      handler(v) {
        this.internal = [...(v || [])]
      },
    },
  },
  methods: {
    emit() {
      this.$emit('input', this.internal)
    },
  },
}
</script>
