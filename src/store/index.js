import Vue from 'vue'
import Vuex from 'vuex'
import generalModule from './general'
import userModule from './user'
import listsModule from './lists'
import userDataModule from './userData'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    generalModule,
    userModule,
    listsModule,
    userDataModule
  }
})
