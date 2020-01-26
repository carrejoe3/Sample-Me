<template>
  <v-container class="recorder">
    <v-btn large icon @click="isRecording ? stopRecord() : startRecord()" id="recordBtn" :style="recorderStyles">
      <v-icon>mdi-microphone</v-icon>
    </v-btn>
    <div id="timer">{{ timer }}</div>
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
    isRecording: 0,
    timer: 0.00,
    timerIsRunning: false,
    interval: null
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
    },
    normalise () {
      return this.$store.state.normalise
    },
    bitRate () {
      return this.$store.state.bitRate
    }
  },
  methods: {
    startRecord () {
      this.isRecording = true
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          const options = {
            audioBitsPerSecond: this.bitRate
          }
          this.mediaRecorder = new MediaRecorder(stream, options)
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
        height: '200',
        normalise: this.normalise,
        plugins: [
          MicrophonePlugin.create()
        ]
      })

      this.waveSurfer.microphone.start()
    },
    toggleTimer () {
      if (this.timerIsRunning) {
        clearInterval(this.interval)
      } else {
        this.interval = setInterval(this.incrementTime, 1000)
      }
      this.timerIsRunning = !this.timerIsRunning
    },
    incrementTime () {
      this.timer = parseInt(this.time) + 0.01
    }
  },
  mounted () {
    this.buildWavSurfer()
  },
  beforeDestroy () {
    if (this.isRecording) this.stopRecord()
  }
}
</script>

<style lang="scss" scoped>
.recorder {
  text-align: center;
  #recordBtn {
    margin: 12% 0% 7% 0%;
    height: 30vh;
    width: 30vh;
  }
  #timer {
    margin: 0% 0% 7% 0%;
  }
}
</style>
