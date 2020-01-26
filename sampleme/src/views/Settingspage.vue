<template>
  <v-container>
    <v-list>
      <v-list-item-group>
        <v-list-item>
          <v-list-item-content>
            <v-btn @click="colourPickerPopup = true">Choose main colour</v-btn>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-overflow-btn :items="bitRateOptions" :value="bitRateOptions.value" v-model="bitRate" label="Bitrate"></v-overflow-btn>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-switch v-model="normalise" label="Normalise waves"></v-switch>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-text-field v-model="skipLength" type="number" label="Skip length (seconds)"></v-text-field>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
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
    colourPickerPopup: false,
    bitRateOptions: [
      {
        text: '64kbps',
        value: 64000
      },
      {
        text: '128kbps',
        value: 128000
      },
      {
        text: '192kbps',
        value: 192000
      },
      {
        text: '256kbps',
        value: 256000
      },
      {
        text: '320kpbs',
        value: 320000
      }
    ]
  }),
  computed: {
    bitRate: {
      get () {
        return this.$store.state.bitRate
      },
      set (bitRate) {
        this.updateBitRate(bitRate)
      }
    },
    normalise: {
      get () {
        return this.$store.state.normalise
      },
      set (bool) {
        this.updateNormalise(bool)
      }
    },
    selectedColour: {
      get () {
        return this.$store.state.selectedColour
      },
      set (colour) {
        this.updateSelectedColour(colour)
      }
    },
    skipLength: {
      get () {
        return this.$store.state.skipLength
      },
      set (length) {
        this.updateSkipLength(length)
      }
    }
  },
  methods: {
    ...mapMutations([
      'updateSelectedColour',
      'updateNormalise',
      'updateBitRate',
      'updateSkipLength'
    ])
  }
}
</script>
