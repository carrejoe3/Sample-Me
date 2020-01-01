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
    removeRecord (index) {
      this.removeRecording(index)
    },
    onStream (stream) {
      console.log('Got a stream object:', stream)
    },
    onResult (data) {
      this.addRecording({ src: window.URL.createObjectURL(data) })
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
