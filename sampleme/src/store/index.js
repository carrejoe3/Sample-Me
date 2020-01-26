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
    selectedColour: 'red',
    normalise: false,
    bitRate: 128000,
    skipLength: 2
  },
  mutations: {
    addFile (state, newFile) {
      state.recordedFiles.unshift(newFile)
    },
    removeFile (state, index) {
      state.recordedFiles.splice(index, 1)
    },
    updateSelectedColour (state, colour) {
      state.selectedColour = colour
    },
    updateNormalise (state, bool) {
      state.normalise = bool
    },
    updateBitRate (state, bitRate) {
      state.bitRate = bitRate
    },
    updateSkipLength (state, length) {
      state.skipLength = Math.ceil(length)
    }
  },
  getters: {
  },
  plugins: [vuexLocal.plugin]
})
