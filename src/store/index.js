import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import timer from './modules/timer'
import getters from './getters'
import selectedDevice from './modules/selectedDevice'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    timer,
    selectedDevice
  },
  getters
})

export default store
