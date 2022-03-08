import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mode: 'ScenicSpot'
  },
  mutations: {
    SET_MODE (state, mode) {
      state.mode = mode
    }
  }
})
