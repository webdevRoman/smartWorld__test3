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
        // commit('SET_USER', user.uid)
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
    STATE_CHANGED({commit}, payload) {
      if (payload) {
        commit('SET_USER', { uid: payload.uid, email: payload.email })
      } else {
        commit('UNSET_USER')
      }
    }
    // SIGNIN({commit}, payload) {
    //   commit('SET_PROCESSING', true)
    //   firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
    //   .then(user => {
    //     commit('SET_USER', user.uid)
    //     commit('SET_PROCESSING', false)
    //   })  
    //   .catch(function(error) {
    //     commit('SET_PROCESSING', false)
    //     commit('SET_ERROR', error.message)
    //   });
    // }
  },
  getters: {
    isUserAuthenticated: (state) => state.user.isAuthenticated,
    userLogin: (state) => state.user.login
  }
}