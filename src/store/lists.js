import Vue from 'vue'

export default {
  state: {
    lists: {}
  },
  mutations: {
    SET_LISTS(state, payload) {
      payload.forEach(l => {
        Vue.set(state.lists, l.id, { name: l.name, tasks: l.tasks })
      })
    }
  },
  actions: {
    LOAD_LISTS({commit}, payload) {
      commit('SET_PROCESSING', true)
      commit('SET_LOADING', true)
      if (payload) {
        Vue.$db.collection(payload)
          .get()
          .then(querySnapshot => {
            let lists = []
            querySnapshot.forEach(l => {
              const data = l.data()
              let list = {
                id: l.id,
                name: data.name,
                tasks: data.tasks ? data.tasks.slice() : []
              }
              lists.push(list)
            })
            lists.sort((a, b) => {
              const nameA = a.name.toLowerCase()
              const nameB = b.name.toLowerCase()
              if (nameA < nameB)
                return -1
              if (nameA > nameB)  
                return 1
              return 0
            })
            commit('SET_LISTS', lists)
            commit('SET_PROCESSING', false)
            commit('SET_LOADING', false)
          })
          .catch(error => {
            console.log(error)
            commit('SET_PROCESSING', false)
            commit('SET_LOADING', false)
          })
      }
    },
    LOAD_LISTS_PASSIVE({commit}, payload) {
      commit('SET_PROCESSING', true)
      if (payload) {
        Vue.$db.collection(payload)
          .get()
          .then(querySnapshot => {
            let lists = []
            querySnapshot.forEach(l => {
              const data = l.data()
              let list = {
                id: l.id,
                name: data.name,
                tasks: data.tasks ? data.tasks.slice() : []
              }
              lists.push(list)
            })
            lists.sort((a, b) => {
              const nameA = a.name.toLowerCase()
              const nameB = b.name.toLowerCase()
              if (nameA < nameB)
                return -1
              if (nameA > nameB)  
                return 1
              return 0
            })
            commit('SET_LISTS', lists)
            commit('SET_PROCESSING', false)
          })
          .catch(error => {
            console.log(error)
            commit('SET_PROCESSING', false)
            commit('SET_LOADING', false)
          })
      }
    }
  },
  getters: {
    getLists: (state) => state.lists
  }
}