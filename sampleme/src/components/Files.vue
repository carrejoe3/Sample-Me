<template>
  <v-container>
    <div id='wavForm'></div>
    <v-toolbar color='elevation-0'>
      <v-toolbar-items id="audioControls" v-for='(button, index) in audioControlButtons' :key='index'>
        <v-btn @click="button.method">
          <v-icon>{{ button.icon }}</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-list>
      <v-list-item v-for='(file, index) in files' :key='index' class='file' @click='loadFile(index)'>
        <v-list-item-action>
          <v-icon @click='removeRecord(index)'>mdi-delete</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ file.name }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon>mdi-share</v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>

import WaveSurfer from 'wavesurfer.js'

export default {
  name: 'Files',
  data () {
    return {
      waveSurfer: null,
      audioControlButtons: [
        {
          icon: 'mdi-skip-previous',
          method: this.skipBackwards
        },
        {
          icon: 'mdi-skip-next',
          method: this.skipForwards
        },
        {
          icon: 'mdi-rewind',
          method: this.skipBackwards
        },
        {
          icon: 'mdi-play',
          method: this.playPause
        },
        {
          icon: 'mdi-fast-forward',
          method: this.skipForwards
        },
        {
          icon: 'mdi-volume-high',
          method: this.playPause
        }
      ]
    }
  },
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
        barRadius: 3,
        hideScrollbar: true,
        audioRate: 1,
        barWidth: 3,
        interact: true
      })
    },
    convertToBinary (base64) {
      let raw = window.atob(base64)
      let arr = new Uint8Array(new ArrayBuffer(raw.length))

      for (let i in arr) {
        arr[i] = raw.charCodeAt(i)
      }

      return arr
    },
    playPause () {
      this.waveSurfer.playPause()
    },
    skipForwards () {
      this.waveSurfer.skipForward()
    },
    skipBackwards () {
      this.waveSurfer.skipBackward()
    }
  },
  mounted () {
    this.buildWavSurfer()
    if (this.files.length > 0) {
      this.loadFile(0)
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
