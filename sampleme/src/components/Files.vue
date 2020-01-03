<template>
  <v-container>
    <div v-for="file in files" :key="file">{{ file }}</div>
  </v-container>
</template>

<script>

import { Plugins, FilesystemDirectory } from '@capacitor/core'

const { Filesystem } = Plugins

export default {
  name: 'Files',
  computed: {
    files: {
      get () {
        return this.$store.state.recordedFilesList
      },
      set (files) {
        this.$store.commit('updateRecordedFilesList', files)
      }
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
          this.filesData.push(result)
        }, err => {
          console.error(err)
        }
      )
      console.log(contents)
    },
    removeRecord (index) {
      this.removeRecording(index)
    }
  },
  mounted () {
    this.readdir('recordings')
  }
}
</script>
