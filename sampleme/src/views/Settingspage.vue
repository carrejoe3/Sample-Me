<template>
  <v-container>
    <v-select v-model="recordMode" :items="recordModeOptions" label="Recorder mode"></v-select>
    <v-btn @click="colourPickerPopup = true">Choose main colour</v-btn>
    <v-dialog v-model="colourPickerPopup">
      <v-color-picker hide-inputs v-model="selectedColour"></v-color-picker>
    </v-dialog>
  </v-container>
</template>

<script>

import { mapMutations } from 'vuex'

export default {
  name: 'SettingsPage',
  data: () => ({
    recordModeOptions: ['hold', 'press'],
    colourPickerPopup: false
  }),
  computed: {
    recordMode: {
      get () {
        return this.$store.state.recordMode
      },
      set (mode) {
        this.updateRecordMode(mode)
      }
    },
    selectedColour: {
      get () {
        return this.$store.state.selectedColour
      },
      set (colour) {
        this.updateSelectedColour(colour)
      }
    }
  },
  methods: {
    ...mapMutations([
      'updateRecordMode',
      'updateSelectedColour'
    ])
  }
}
</script>
