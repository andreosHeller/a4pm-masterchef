<template>
  <v-snackbar
    v-model="$snackState.visible"
    :color="$snackState.color"
    :timeout="4000"
    :multi-line="$snackState.multiline"
    :bottom="true"
    :center="true"
    elevation="2"
  >
    <div class="tw-flex tw-items-center tw-gap-3">
      <span class="tw-leading-snug">{{ $snackState.text }}</span>
      <v-spacer />
      <v-btn small text @click="$snack.close()">Fechar</v-btn>
    </div>
  </v-snackbar>
</template>

<script>
export default { name: 'AppSnackbar' }
</script>
