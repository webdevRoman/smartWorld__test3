import Vue from 'vue'

let defaultUserData = {
  lists: []
}

export default {
  state: {
    userData: defaultUserData
  },
  mutations: {
    SET_USER_DATA(state, payload) {
      state.userData = payload
    }
  },
  actions: {
    LOAD_USER_DATA({commit, dispatch}, payload) {
      commit('SET_PROCESSING', true)
      dispatch('LOAD_LISTS', payload)
      commit('SET_PROCESSING', false)
    },
    ADD_USER_LIST({commit, dispatch, getters}, payload) {
      commit('SET_PROCESSING', true)
      let userDataRef = Vue.$db.collection(getters.userId)
      let list = {
        name: payload,
        tasks: []
      }
      userDataRef.add(list)
      .then(() => {
        dispatch('LOAD_LISTS', getters.userId)
        commit('SET_PROCESSING', false)
      })
      .catch((error) => {
        console.log(error)
        commit('SET_PROCESSING', false)
      })
    },
    EDIT_USER_LIST({commit, dispatch, getters}, payload) {
      commit('SET_PROCESSING', true)
      let userDataRef = Vue.$db.collection(getters.userId).doc(payload.listId)
      userDataRef.update({
        name: payload.listName
      })
      .then(() => {
        dispatch('LOAD_LISTS', getters.userId)
        commit('SET_PROCESSING', false)
      })
      .catch((error) => {
        console.log(error)
        commit('SET_PROCESSING', false)
      })
    },
    DELETE_USER_LIST({commit, dispatch, getters}, payload) {
      commit('SET_PROCESSING', true)
      Vue.$db.collection(getters.userId).doc(payload).delete()
      .then(() => {
        dispatch('LOAD_LISTS', getters.userId)
        commit('SET_PROCESSING', false)
      })
      .catch((error) => {
        console.log(error)
        commit('SET_PROCESSING', false)
      })
    }
    // LOAD_USER_DATA({commit}, payload) {
    //   commit('SET_PROCESSING', true)
    //   let userDataRef = Vue.$db.collection(payload)
    //   userDataRef.get()
    //   .then((data) => {
    //     let userData = data.exists ? data.data() : defaultUserData
    //     if (userData.lists)
    //       userData.lists = {}
    //     commit('SET_USER_DATA', userData)
    //     commit('SET_PROCESSING', false)
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //     commit('SET_PROCESSING', false)
    //   })
    // }
  },
  getters: {
    userData: (state) => state.userData
  }
}