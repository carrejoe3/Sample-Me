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
export default {
  name: 'Recorder',
  data: () => ({
    recordMode: 'hold',
    recordModeOptions: ['hold', 'press'],
    recordings: []
  }),
  methods: {
    removeRecord (index) {
      this.recordings.splice(index, 1)
    },
    onStream (stream) {
      console.log('Got a stream object:', stream)
    },
    onResult (data) {
      this.recordings.push({
        src: window.URL.createObjectURL(data)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.recorder {
  text-align: center;
  .recordedAudio {
    margin-top: 5%;
    .recordedItem {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  }
}
</style>
