<template>
  <v-container>
    <vue-record-audio :mode="recordMode" @stream="onStream" @result="onResult" />
    <div class="recorded-audio">
      <div v-for="(record, index) in recordings" :key="index" class="recorded-item">
        <div class="audio-container"><audio :src="record.src" controls /></div>
        <div><button @click="removeRecord(index)" class="button is-dark">delete</button></div>
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
.modeDropdownContainer {
  display: flex;
}
</style>
