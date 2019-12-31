<template>
  <v-app>
    <v-content>
      <router-view></router-view>
      <v-bottom-navigation grow v-model="bottomNav">
        <v-btn value="sampler" to="/">
          <span>Sampler</span>
          <v-icon>mdi-grid</v-icon>
        </v-btn>
        <v-btn value="recorder" to="/recorder">
          <span>Recorder</span>
          <v-icon>mdi-microphone</v-icon>
        </v-btn>
        <v-btn value="settings" to="/settings">
          <span>Settings</span>
          <v-icon>mdi-settings</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      bottomNav: 'sampler'
    }
  }
}
</script>

<style lang="scss" scoped>
.v-bottom-navigation {
  align-items: center;
  position: fixed;
  bottom: 0;
}
</style>
