<template>
  <v-container>
    <div v-for="(file, index) in files" :key="index" @click="loadFile(file)">{{ file.name }}</div>
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
      this.removeRecording(index)
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
