<template>
  <v-container>
    <v-select v-model="recordMode" :items="recordModeOptions" label="Recorder mode"></v-select>
  </v-container>
</template>

<script>
export default {
  name: 'SettingsPage',
  data: () => ({
    recordModeOptions: ['hold', 'press']
  }),
  computed: {
    recordMode: {
      get () {
        return this.$store.state.recordMode
      },
      set (mode) {
        this.$store.commit('updateRecordMode', mode)
      }
    }
  }
}
</script>
