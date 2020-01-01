import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    recordMode: 'hold',
    recordings: []
  },
  mutations: {
    updateRecordMode (state, mode) {
      state.recordMode = mode
    },
    addRecording (state, recording) {
      state.recordings.push(recording)
    },
    removeRecording (state, index) {
      state.recordings.splice(index, 1)
    }
  },
  getters: {
  }
})
