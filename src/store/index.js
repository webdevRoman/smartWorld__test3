import Vue from 'vue'
import Vuex from 'vuex'
import generalModule from './general'
import userModule from './user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    generalModule,
    userModule
  }
})
