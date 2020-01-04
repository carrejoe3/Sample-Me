<template>
  <v-container>
    <v-list>
      <v-list-item v-for="(file, index) in files" :key="index" class="file">
        <v-list-item-action>
          <v-icon @click="loadFile(index)">mdi-play</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ file.name }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon @click="removeRecord(index)">mdi-delete</v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <div id="wavForm"></div>
  </v-container>
</template>

<script>

import WaveSurfer from 'wavesurfer.js'

export default {
  name: 'Files',
  data: () => ({
    waveSurfer: null
  }),
  computed: {
    files () {
      return this.$store.state.recordedFiles
    }
  },
  methods: {
    removeRecord (index) {
      this.$store.commit('removeFile', index)
    },
    loadFile (index) {
      let binary = this.convertToBinary(this.files[index].data)
      let blob = new Blob([binary], {
        type: 'audio/ogg'
      })
      this.waveSurfer.loadBlob(blob)
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
    },
    convertToBinary (base64) {
      let raw = window.atob(base64)
      let arr = new Uint8Array(new ArrayBuffer(raw.length))

      for (let i in arr) {
        arr[i] = raw.charCodeAt(i)
      }

      return arr
    }
  },
  mounted () {
    this.buildWavSurfer()
  }
}
</script>

<style lang="scss" scoped>
</style>
