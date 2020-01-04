import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

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
  },
  plugins: [vuexLocal.plugin]
})
