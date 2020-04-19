<template>
  <v-app>
    <v-content>
      <router-view></router-view>
      <v-bottom-navigation grow>
        <v-btn to="/" ripple icon>
          <span>Recorder</span>
          <v-icon :color="selectedColour">mdi-microphone</v-icon>
        </v-btn>
        <v-btn to="/files" ripple icon>
          <span>Files</span>
          <v-icon :color="selectedColour">mdi-file-cabinet</v-icon>
        </v-btn>
        <v-btn to="/settings" ripple icon>
          <span>Settings</span>
          <v-icon :color="selectedColour">mdi-cog</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  computed: {
    selectedColour () {
      return this.$store.state.selectedColour
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
