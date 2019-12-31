<template>
  <v-container>
    <v-row v-for="i in 3" :key="i">
      <v-col v-for="n in 3" :key="n" cols="4" xs="4">
        <v-card class="pa-2" @click="padTapHandler(i, n)" outlined tile>One of three columns</v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Sampler',
  data: () => ({
  }),
  methods: {
    padTapHandler (row, col) {
      console.log('pad tapped: ' + row + col)
    }
  }
}
</script>
