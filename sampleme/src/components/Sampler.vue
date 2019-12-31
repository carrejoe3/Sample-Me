<template>
  <v-container>
    <v-row no-gutters>
      <v-col v-for="n in 3" :key="n" cols="4" xs="4">
        <v-card class="pa-2" outlined tile>One of three columns</v-card>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col v-for="n in 3" :key="n" cols="4" xs="4">
        <v-card class="pa-2" outlined tile>One of three columns</v-card>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col v-for="n in 3" :key="n" cols="4" xs="4">
        <v-card class="pa-2" outlined tile>One of three columns</v-card>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col v-for="n in 3" :key="n" cols="4" xs="4">
        <v-card class="pa-2" outlined tile>One of three columns</v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Sampler',
  data: () => ({
  })
}
</script>
