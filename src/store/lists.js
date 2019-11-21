export default {
  state: {
    lists: [
      {
        id: 'skdjfhskdfjh',
        name: 'Дела 1',
        state: 'process'
      }
    ]
  },
  mutations: {
    SET_LISTS(state, payload) {
      state.lists = payload
    }
  },
  getters: {
    getLists: (state) => state.lists
  }
}