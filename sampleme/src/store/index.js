import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    recordMode: 'hold',
    recordedFiles: []
  },
  mutations: {
    addFile (state, newFile) {
      state.recordedFiles.push(newFile)
    },
    updateRecordMode (state, mode) {
      state.recordMode = mode
    }
  },
  getters: {
  }
})
