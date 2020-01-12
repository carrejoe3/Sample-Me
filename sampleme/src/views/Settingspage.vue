<template>
  <v-container>
    <v-btn @click="colourPickerPopup = true">Choose main colour</v-btn>
    <v-dialog v-model="colourPickerPopup" width='unset'>
      <v-color-picker hide-inputs v-model="selectedColour" width="500"></v-color-picker>
    </v-dialog>
  </v-container>
</template>

<script>

import { mapMutations } from 'vuex'

export default {
  name: 'SettingsPage',
  data: () => ({
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
      'updateSelectedColour'
    ])
  }
}
</script>
