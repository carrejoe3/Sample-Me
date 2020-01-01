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
import { Plugins, FilesystemDirectory } from '@capacitor/core'

const { Filesystem } = Plugins

export default {
  name: 'Recorder',
  data: () => ({
    filesData: []
  }),
  computed: {
    recordings () {
      return this.$store.state.recordings
    },
    recordMode () {
      return this.$store.state.recordMode
    },
    filesList: {
      get () {
        return this.$store.state.recordedFilesList
      },
      set (value) {
        this.$store.commit('updateRecordedFilesList', value)
      }
    }
  },
  methods: {
    ...mapMutations([
      'addRecording',
      'removeRecording'
    ]),
    async storeAudioFile (file, name) {
      try {
        await Filesystem.writeFile({
          data: file,
          path: 'recordings/' + name,
          directory: FilesystemDirectory.Documents
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
    },
    async readdir (path) {
      try {
        await Filesystem.readdir({
          path: path,
          directory: FilesystemDirectory.Documents
        }).then(
          result => {
            this.filesList = result.files
          },
          err => {
            console.error(err)
          }
        )
      } catch (e) {
        console.error('Unable to read dir', e)
      }
    },
    async fileRead (path) {
      let contents = await Filesystem.readFile({
        path: path,
        directory: FilesystemDirectory.Documents
      }).then(
        result => {
          this.filesData.push(result)
        }, err => {
          console.error(err)
        }
      )
      console.log(contents)
    }
  },
  mounted () {
    this.readdir('recordings')
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
