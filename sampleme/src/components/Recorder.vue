<template>
  <v-container class="recorder">
    <vue-record-audio :mode="recordMode" @stream="onStream" @result="onResult" :style="recorderStyles"/>
    <div id="wavForm"></div>
  </v-container>
</template>

<script>

import WaveSurfer from 'wavesurfer.js'

export default {
  name: 'Recorder',
  data: () => ({
    waveSurfer: null
  }),
  computed: {
    recordings () {
      return this.$store.state.recordedFiles
    },
    recordMode () {
      return this.$store.state.recordMode
    },
    selectedColour () {
      return this.$store.state.selectedColour
    },
    recorderStyles () {
      return {
        'background-color': this.selectedColour
      }
    }
  },
  methods: {
    onStream (stream) {
      // console.log('Got a stream object:', stream)
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
.recorder {
  text-align: center;
  .vue-audio-recorder {
    margin-top: 3%;
  }
  .recordedAudio {
    margin-top: 3%;
    audio {
      width: 80%;
    }
    .recordedItem {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-bottom: 2%;
    }
  }
}
</style>
