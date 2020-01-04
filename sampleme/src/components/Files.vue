<template>
  <v-container>
    <div v-for="(file, index) in files" :key="index" class="file">
      <div @click="loadFile(file)">{{ file.name }}</div>
      <v-icon @click="removeRecord(index)">mdi-delete</v-icon>
    </div>
    <div id="wavForm"></div>
  </v-container>
</template>

<script>

import WaveSurfer from 'wavesurfer.js'

export default {
  name: 'Files',
  computed: {
    files () {
      return this.$store.state.recordedFiles
    }
  },
  methods: {
    removeRecord (index) {
      this.$store.commit('removeFile', index)
    },
    loadFile (name) {
      console.log(name)
    },
    buildWavSurfer () {
      this.waveSurfer = WaveSurfer.create({
        container: '#wavForm',
        waveColor: 'red',
        barHeight: 20,
        hideScrollbar: true,
        audioRate: 1,
        barWidth: 2,
        interact: false
      })
    }
  },
  mounted () {
    this.buildWavSurfer()
  }
}
</script>

<style lang="scss" scoped>
.file {
  display: flex;
  justify-content: space-between;
}
</style>
