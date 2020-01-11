<template>
  <v-container>
    <div id='wavForm'></div>
    <v-toolbar color='elevation-0'>
      <v-toolbar-items id="audioControls" v-for='(button, index) in audioControlButtons' :key='index'>
        <v-btn @click="button.method" icon x-large>
          <v-icon>{{ button.icon }}</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-list id="fileList" class="overflow-y-auto">
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
          id: 'skipBackwards',
          icon: 'mdi-skip-previous',
          method: this.skipBackwards
        },
        {
          id: 'skipForwards',
          icon: 'mdi-skip-next',
          method: this.skipForwards
        },
        {
          id: 'rewind',
          icon: 'mdi-rewind',
          method: this.skipBackwards
        },
        {
          id: 'playPause',
          icon: 'mdi-play',
          method: this.playPause
        },
        {
          id: 'skipForwards',
          icon: 'mdi-fast-forward',
          method: this.skipForwards
        },
        {
          id: 'volume',
          icon: 'mdi-volume-high',
          method: this.playPause
        }
      ]
    }
  },
  computed: {
    files () {
      return this.$store.state.recordedFiles
    },
    selectedColour () {
      return this.$store.state.selectedColour
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
        waveColor: this.selectedColour,
        barHeight: 3,
        barRadius: 3,
        hideScrollbar: true,
        audioRate: 1,
        barWidth: 1,
        interact: true,
        responsive: true
      })

      this.waveSurfer.on('finish', () => {
        this.togglePlayPauseIcon()
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
      this.togglePlayPauseIcon()
    },
    skipForwards () {
      this.waveSurfer.skipForward()
    },
    skipBackwards () {
      this.waveSurfer.skipBackward()
    },
    togglePlayPauseIcon () {
      const playPauseBtn = this.audioControlButtons.find(btn => btn.id === 'playPause')
      if (playPauseBtn.icon === 'mdi-play') {
        playPauseBtn.icon = 'mdi-pause'
      } else {
        playPauseBtn.icon = 'mdi-play'
      }
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

<style lang='scss'>
.v-toolbar__content {
  justify-content: space-around;
}
#fileList {
  max-height: 65vh;
}
</style>
