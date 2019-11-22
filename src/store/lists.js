export default {
  state: {
    lists: [
      {
        id: 'skdjfhskdfjh1',
        name: 'Дела 1',
        state: 'process'
      },
      {
        id: 'skdjfhskdfjh2',
        name: 'Дела 2',
        state: 'done'
      },
      {
        id: 'skdjfhskdfjh3',
        name: 'Дела 3',
        state: 'empty'
      },
      {
        id: 'skdjfhskdfjh4',
        name: 'Дела 4',
        state: 'done'
      },
      {
        id: 'skdjfhskdfjh5',
        name: 'Дела 5',
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