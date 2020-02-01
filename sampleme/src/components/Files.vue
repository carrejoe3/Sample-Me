<template>
  <v-container>
    <div id='wavForm'></div>
    <v-toolbar color='elevation-0' v-if="files.length > 0">
      <v-toolbar-items id="audioControls" v-for='(button, index) in audioControlButtons' :key='index'>
        <v-btn @click="button.method" icon x-large :disabled="button.disabled">
          <v-icon>{{ button.icon }}</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-list id="fileList" v-if="files.length > 0">
      <v-list-item v-for='(file, index) in files' :key='index' class='file'>
        <v-list-item-content @click='loadFile(index)'>
          <v-list-item-title>{{ file.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ file.date }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn @click="showEditPanel = true" icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-dialog v-model="showEditPanel" v-if="files.length > 0">
      <v-card>
        <v-card-title class="headline" primary-title>
          <v-text-field label='Name' v-model="files[selectedFileIndex].name"></v-text-field>
        </v-card-title>
        <v-spacer></v-spacer>
        <v-card-text id="editPanelBtns">
          <v-btn @click="removeRecord">
            Delete
            <v-icon>mdi-delete</v-icon>
          </v-btn>
          <v-btn @click="shareFile">
            Share
            <v-icon>mdi-share</v-icon>
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>

import WaveSurfer from 'wavesurfer.js'
import { Plugins, registerWebPlugin } from '@capacitor/core'
import { FileSharer } from '@byteowls/capacitor-filesharer'

export default {
  name: 'Files',
  data () {
    return {
      waveSurfer: null,
      audioControlButtons: [
        {
          id: 'previousFile',
          icon: 'mdi-skip-previous',
          method: this.previousFile,
          disabled: false
        },
        {
          id: 'nextFile',
          icon: 'mdi-skip-next',
          method: this.nextFile,
          disabled: false
        },
        {
          id: 'skipBackwards',
          icon: 'mdi-rewind',
          method: this.skipBackwards,
          disabled: false
        },
        {
          id: 'playPause',
          icon: 'mdi-play',
          method: this.playPause,
          disabled: false
        },
        {
          id: 'skipForwards',
          icon: 'mdi-fast-forward',
          method: this.skipForwards,
          disabled: false
        },
        {
          id: 'mute',
          icon: 'mdi-volume-high',
          method: this.toggleMute,
          disabled: false
        }
      ],
      selectedFileIndex: 0,
      showEditPanel: false
    }
  },
  computed: {
    files () {
      return this.$store.state.recordedFiles
    },
    selectedColour () {
      return this.$store.state.selectedColour
    },
    normalise () {
      return this.$store.state.normalise
    },
    skipLength () {
      return this.$store.state.skipLength
    },
    audioRate () {
      return this.$store.state.audioRate
    }
  },
  methods: {
    removeRecord () {
      this.showEditPanel = false
      this.$store.commit('removeFile', this.selectedFileIndex)
    },
    loadFile (index) {
      this.selectedFileIndex = index

      this.audioControlButtons.find(btn => btn.id === 'playPause').icon = 'mdi-play'

      const nextFileBtn = this.audioControlButtons.find(btn => btn.id === 'nextFile')
      const prevFileBtn = this.audioControlButtons.find(btn => btn.id === 'previousFile')

      if (this.selectedFileIndex === this.files.length - 1) {
        nextFileBtn.disabled = true
      } else if (this.selectedFileIndex === 0) {
        prevFileBtn.disabled = true
      } else {
        nextFileBtn.disabled = false
        prevFileBtn.disabled = false
      }

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
        barHeight: 20,
        barRadius: 3,
        hideScrollbar: true,
        barWidth: 1,
        interact: true,
        skipLength: this.skipLength,
        responsive: true,
        normalise: this.normalise,
        audioRate: this.audioRate
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
    nextFile () {
      this.loadFile(this.selectedFileIndex + 1)
    },
    previousFile () {
      this.loadFile(this.selectedFileIndex - 1)
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
    },
    toggleMute () {
      const muteBtn = this.audioControlButtons.find(btn => btn.id === 'mute')
      if (muteBtn.icon === 'mdi-volume-high') {
        muteBtn.icon = 'mdi-volume-mute'
        this.waveSurfer.setMute(true)
      } else {
        muteBtn.icon = 'mdi-volume-high'
        this.waveSurfer.setMute(false)
      }
    },
    shareFile () {
      Plugins.FileSharer.share({
        filename: this.files[this.selectedFileIndex].name + '.mp3',
        base64Data: this.files[this.selectedFileIndex].data,
        contentType: 'audio/mpeg'
      }).then(() => {
        // do sth
      }).catch(error => {
        console.error('File sharing failed', error.message)
      })
    }
  },
  mounted () {
    registerWebPlugin(FileSharer)
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
  overflow-x: auto;
  max-height: calc(100vh - 56px - 128px - 56px - 20px);
}
#editPanelBtns {
  display: flex;
  justify-content: space-around;
}
</style>
