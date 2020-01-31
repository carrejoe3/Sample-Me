<template>
  <v-container>
    <v-list>
      <v-list-item-group>
        <v-list-item class="mb-6">
          <v-list-item-content>
            <v-btn @click="colourPickerPopup = true">Choose main colour</v-btn>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Bitrate</v-list-item-title>
            <v-overflow-btn :items="bitRateOptions" :value="bitRateOptions.value" v-model="bitRate" label="Bitrate"></v-overflow-btn>
          </v-list-item-content>
        </v-list-item>
        <!-- <v-list-item>
          <v-list-item-content>
            <v-switch v-model="normalise" label="Normalise waves"></v-switch>
          </v-list-item-content>
        </v-list-item> -->
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Skip length (seconds)</v-list-item-title>
            <v-text-field v-model="skipLength" type="number"></v-text-field>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Playback speed</v-list-item-title>
            <v-overflow-btn :items="playbackRateOptions" :value="playbackRateOptions.value" v-model="playBackRate" label="Playback speed"></v-overflow-btn>
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
    ],
    playbackRateOptions: [
      {
        text: '0.5x',
        value: 0.5
      },
      {
        text: '0.75x',
        value: 0.75
      },
      {
        text: '1x',
        value: 1
      },
      {
        text: '1.25x',
        value: 1.25
      },
      {
        text: '1.5x',
        value: 1.5
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
    },
    playBackRate: {
      get () {
        return this.$store.state.audioRate
      },
      set (audioRate) {
        this.updateAudioRate(audioRate)
      }
    }
  },
  methods: {
    ...mapMutations([
      'updateSelectedColour',
      'updateNormalise',
      'updateBitRate',
      'updateSkipLength',
      'updateAudioRate'
    ])
  }
}
</script>
