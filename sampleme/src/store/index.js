import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    recordedFiles: [],
    selectedColour: 'red'
  },
  mutations: {
    addFile (state, newFile) {
      state.recordedFiles.push(newFile)
    },
    removeFile (state, index) {
      state.recordedFiles.splice(index, 1)
    },
    updateSelectedColour (state, colour) {
      state.selectedColour = colour
    }
  },
  getters: {
  },
  plugins: [vuexLocal.plugin]
})
