import Vue from 'vue'

export default {
  state: {
    processing: false,
    error: null,
    loading: {}
  },
  mutations: {
    SET_PROCESSING(state, payload) {
      state.processing = payload
    },
    SET_ERROR(state, payload) {
      state.error = payload
    },
    CLEAR_ERROR(state) {
      state.error = null
    },
    SET_LOADING(state, payload) {
      Vue.set(state, 'loading', payload)
    }
  },
  getters: {
    getProcessing: (state) => state.processing,
    getError: (state) => state.error,
    getLoading: (state) => state.loading
  }
}