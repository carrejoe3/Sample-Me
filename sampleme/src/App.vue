<template>
  <v-app>
    <v-content>
      <router-view></router-view>
      <v-bottom-navigation grow>
        <v-btn to="/">
          <span>Recorder</span>
          <v-icon>mdi-microphone</v-icon>
        </v-btn>
        <v-btn to="/files">
          <span>Files</span>
          <v-icon>mdi-file-cabinet</v-icon>
        </v-btn>
        <v-btn to="/settings">
          <span>Settings</span>
          <v-icon>mdi-settings</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss" scoped>
.v-bottom-navigation {
  align-items: center;
  position: fixed;
  bottom: 0;
}
</style>
