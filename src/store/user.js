import firebase from 'firebase'

export default {
  state: {
    user: {
      isAuthenticated: false,
      uid: null,
      login: null
    }
  },
  mutations: {
    SET_USER(state, payload) {
      state.user.isAuthenticated = true
      state.user.uid = payload.uid
      state.user.login = payload.email
    },
    UNSET_USER(state) {
      state.user = {
        isAuthenticated: false,
        uid: null,
        login: null
      }
    }
  },
  actions: {
    SIGNIN({commit}, payload) {
      commit('SET_PROCESSING', true)
      commit('CLEAR_ERROR')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(() => {
        commit('SET_PROCESSING', false)
      })  
      .catch(function(error) {
        commit('SET_PROCESSING', false)
        commit('SET_ERROR', error.message)
      });
    },
    SIGNOUT() {
      firebase.auth().signOut()
    },
    STATE_CHANGED({commit, dispatch}, payload) {
      if (payload) {
        commit('SET_USER', { uid: payload.uid, email: payload.email })
        dispatch('LOAD_USER_DATA', payload.uid)
      } else {
        commit('UNSET_USER')
      }
    }
  },
  getters: {
    isUserAuthenticated: (state) => state.user.isAuthenticated,
    userLogin: (state) => state.user.login,
    userId: (state) => state.user.uid
  }
}