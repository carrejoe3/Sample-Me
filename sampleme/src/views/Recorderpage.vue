<template>
  <div class="recorderPage">
    <Recorder/>
  </div>
</template>

<script>
// @ is an alias to /src
import Recorder from '@/components/Recorder.vue'

export default {
  name: 'RecorderPage',
  components: {
    Recorder
  }
}
</script>
