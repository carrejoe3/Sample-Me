<template>
  <v-container>
    <div v-for="(file, index) in files" :key="index" @click="loadFile(file)">{{ file.name }}</div>
    <div id="wavForm"></div>
  </v-container>
</template>

<script>

import { Plugins, FilesystemDirectory } from '@capacitor/core'
import WaveSurfer from 'wavesurfer.js'

const { Filesystem } = Plugins

export default {
  name: 'Files',
  computed: {
    files () {
      return this.$store.state.recordedFiles
    }
  },
  methods: {
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
          this.fileData.push(result)
        }, err => {
          console.error(err)
        }
      )
      console.log(contents)
    },
    removeRecord (index) {
      this.removeRecording(index)
    },
    loadFile (name) {
      console.log(name)
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
    // this.readdir('recordings')
    this.buildWavSurfer()
  }
}
</script>
