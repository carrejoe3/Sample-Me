<template>
  <v-container class="recorder">
    <vue-record-audio :mode="recordMode" @stream="onStream" @result="onResult" />
    <div class="recordedAudio">
      <div v-for="(record, index) in recordings" :key="index" class="recordedItem">
        <audio :src="record.src" controls/>
        <v-icon @click="removeRecord(index)">mdi-delete</v-icon>
      </div>
    </div>
  </v-container>
</template>

<script>

import { mapMutations } from 'vuex'
import { Capacitor, Plugins, FilesystemDirectory } from '@capacitor/core'

export default {
  name: 'Recorder',
  data: () => ({
    recordMode: 'hold',
    recordModeOptions: ['hold', 'press']
  }),
  computed: {
    recordings () {
      return this.$store.state.recordings
    }
  },
  methods: {
    ...mapMutations([
      'addRecording',
      'removeRecording'
    ]),
    async storeAudioFile (file, name) {
      console.log(file)
      const { Filesystem } = Plugins
      try {
        await Filesystem.writeFile({
          data: file,
          path: 'recordings/' + name,
          // path: 'secrets/text.txt',
          // data: 'This is a test',
          directory: FilesystemDirectory.Documents
        }).then(() => {
          Filesystem.getUri({
            directory: FilesystemDirectory.Data,
            path: 'recordings/' + name
            // path: 'secrets/text.txt'
          }).then(
            result => {
              let path = Capacitor.convertFileSrc(result.uri)
              alert(path)
            },
            err => {
              alert(err)
            }
          )
        })
      } catch (e) {
        console.error('Unable to write file', e)
      }
    },
    removeRecord (index) {
      this.removeRecording(index)
    },
    onStream (stream) {
      // console.log('Got a stream object:', stream)
    },
    onResult (data) {
      this.addRecording({ src: window.URL.createObjectURL(data) })
      this.convertBlobToText(data)
    },
    convertBlobToText (blob) {
      const reader = new FileReader()
      reader.onload = () => {
        let dataUrl = reader.result
        let base64 = dataUrl.split(',')[1]
        this.storeAudioFile(base64, 'Recording' + this.recordings.length + '.txt')
      }
      reader.readAsDataURL(blob)
    }
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
