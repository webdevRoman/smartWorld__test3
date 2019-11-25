import Vue from 'vue'

export default {
  state: {
    lists: []
  },
  mutations: {
    SET_LISTS(state, payload) {
      state.lists = payload
    }
  },
  actions: {
    LOAD_LISTS({commit}, payload) {
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
          })
          .catch(error => console.log(error))
      }
    }
    // LOAD_LISTS({commit}) {
    //   Vue.$db.collection('lists')
    //   .get()
    //   .then(querySnapshot => {
    //     let lists = []
    //     querySnapshot.forEach(l => {
    //       const data = l.data()
    //       let list = {
    //         id: l.id,
    //         name: data.name,
    //         tasks: data.tasks.slice()
    //       }
    //       lists.push(list)
    //     })
    //     commit('SET_LISTS', lists)
    //   })
    //   .catch(error => console.log(error))
    // }
  },
  getters: {
    getLists: (state) => state.lists
  }
}