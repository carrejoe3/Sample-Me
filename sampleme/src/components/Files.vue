<template>
  <v-container>
    <div v-for="file in files" :key="file">{{ file }}</div>
  </v-container>
</template>

<script>
export default {
  name: 'Files',
  computed: {
    files: {
      get () {
        return this.$store.state.recordedFilesList
      },
      set (files) {
        this.$store.commit('updateRecordedFilesList', files)
      }
    }
  },
  methods: {
    padTapHandler (row, col) {
      console.log('pad tapped: ' + row + col)
    }
  }
}
</script>
