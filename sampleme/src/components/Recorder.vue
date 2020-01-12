<template>
  <v-container class="recorder">
    <v-btn large icon @click="isRecording ? stopRecord() : startRecord()" id="recordBtn" :style="recorderStyles">
      <v-icon>mdi-microphone</v-icon>
    </v-btn>
    <div id="wavForm"></div>
  </v-container>
</template>

<script>

import WaveSurfer from 'wavesurfer.js'
import MicrophonePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.microphone.min.js'

export default {
  name: 'Recorder',
  data: () => ({
    waveSurfer: null,
    mediaRecorder: null,
    isRecording: 0
  }),
  computed: {
    recordings () {
      return this.$store.state.recordedFiles
    },
    selectedColour () {
      return this.$store.state.selectedColour
    },
    recorderStyles () {
      return this.isRecording ? { 'background-color': this.selectedColour } : { 'background-color': 'white' }
    }
  },
  methods: {
    startRecord () {
      this.isRecording = true
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          this.mediaRecorder = new MediaRecorder(stream)
          this.mediaRecorder.start()

          const audioChunks = []

          this.mediaRecorder.addEventListener('dataavailable', event => {
            audioChunks.push(event.data)
          })

          this.mediaRecorder.addEventListener('stop', () => {
            const audioBlob = new Blob(audioChunks)
            this.convertBlobToText(audioBlob)
          })
        })
    },
    stopRecord () {
      this.isRecording = false
      this.mediaRecorder.stop()
    },
    onResult (data) {
      this.convertBlobToText(data)
    },
    convertBlobToText (blob) {
      const reader = new FileReader()
      reader.onload = () => {
        let dataUrl = reader.result
        let base64 = dataUrl.split(',')[1]
        this.$store.commit('addFile', {
          name: 'Recording ' + (this.recordings.length + 1),
          data: base64,
          date: new Date().toLocaleString()
        })
      }
      reader.readAsDataURL(blob)
    },
    buildWavSurfer () {
      this.waveSurfer = WaveSurfer.create({
        container: '#wavForm',
        waveColor: this.selectedColour,
        barHeight: 20,
        hideScrollbar: true,
        audioRate: 1,
        barWidth: 2,
        interact: false,
        cursorWidth: 0,
        plugins: [
          MicrophonePlugin.create()
        ]
      })

      this.waveSurfer.microphone.start()
    }
  },
  mounted () {
    this.buildWavSurfer()
  }
}
</script>

<style lang="scss" scoped>
.recorder {
  text-align: center;
  #recordBtn {
    margin-top: 3%;
    height: 30vh;
    width: 30vh;
  }
}
</style>
