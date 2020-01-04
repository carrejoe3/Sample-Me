<template>
  <v-container class="recorder">
    <vue-record-audio :mode="recordMode" @stream="onStream" @result="onResult" />
    <!-- <div v-for="(record, index) in recordings" :key="index" class="recordedItem">
      <audio :src="record.src" controls/>
      <v-icon @click="removeRecord(index)">mdi-delete</v-icon>
    </div> -->
    <div id="wavForm"></div>
  </v-container>
</template>

<script>

import { Plugins, FilesystemDirectory } from '@capacitor/core'
import WaveSurfer from 'wavesurfer.js'

const { Filesystem } = Plugins

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
    }
  },
  methods: {
    async storeAudioFile (file, name) {
      try {
        await Filesystem.writeFile({
          data: file,
          path: 'recordings/' + name,
          directory: FilesystemDirectory.Documents
        }).then(() => {
          this.$store.commit('addFile', { name: name, data: file })
        })
      } catch (e) {
        console.error('Unable to write file', e)
      }
    },
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
        this.storeAudioFile(base64, 'Recording' + (this.recordings.length + 1) + '.txt')
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
