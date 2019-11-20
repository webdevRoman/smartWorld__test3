import firebase from 'firebase'

export default {
  state: {
    user: {
      isAuthenticated: false,
      uid: null
    }
  },
  mutations: {
    SET_USER(state, payload) {
      state.user.isAuthenticated = true
      state.user.uid = payload
    }
  },
  actions: {
    SIGNIN({commit}, payload) {
      commit('SET_PROCESSING', true)
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        commit('SET_USER', user.uid)
        commit('SET_PROCESSING', false)
      })  
      .catch(function(error) {
        commit('SET_PROCESSING', false)
        commit('SET_ERROR', error.message)
      });
    }
  },
  getters: {
    isUserAuthenticated: (state) => state.user.isAuthenticated
  }
}