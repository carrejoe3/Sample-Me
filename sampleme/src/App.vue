<template>
  <v-app>
    <v-content>
      <Sampler/>
    </v-content>
  </v-app>
</template>

<script>
import Sampler from './components/Sampler'

export default {
  name: 'App',

  components: {
    Sampler
  },

  data: () => ({
    //
  })
}
</script>
