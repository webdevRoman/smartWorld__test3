import Vue from 'vue'

export default {
  state: {
    currentList: {}
  },
  mutations: {
    SET_CURRENT_LIST(state, payload) {
      Vue.set(state.currentList, 'id', payload.id)
      Vue.set(state.currentList, 'name', payload.name)
      Vue.set(state.currentList, 'tasks', payload.tasks)
      // state.currentList = payload
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
    },

    SET_CURRENT_LIST({commit}, payload) {
      commit('SET_PROCESSING', true)
      commit('SET_CURRENT_LIST', payload)
      commit('SET_PROCESSING', false)
    },
    ADD_USER_TASK({commit, dispatch, getters}, payload) {
      commit('SET_PROCESSING', true)
      let userDataRef = Vue.$db.collection(getters.userId).doc(payload.listId)
      let task = {
        id: Date.now(),
        name: payload.taskName,
        priority: payload.taskPriority,
        done: false,
        time: Date.now()
      }
      let list = {}
      userDataRef.get()
      .then((doc) => {
        if (doc.exists) {
          list = doc.data()
          list.id = payload.listId
          list.tasks.push(task)
          userDataRef.update({
            tasks: list.tasks
          })
          .then(() => {
            dispatch('LOAD_LISTS', getters.userId)
            commit('SET_CURRENT_LIST', list)
            commit('SET_PROCESSING', false)
          })
          .catch((error) => {
            console.log(error)
            commit('SET_PROCESSING', false)
          })
        } else {
          console.log("Can't get tasks from DB");
        }
      })
      .catch((error) => console.log(error))
    },
    EDIT_USER_TASK({commit, dispatch, getters}, payload) {
      commit('SET_PROCESSING', true)
      let userDataRef = Vue.$db.collection(getters.userId).doc(payload.listId)
      let list = {}
      userDataRef.get()
      .then((doc) => {
        if (doc.exists) {
          list = doc.data()
          list.id = payload.listId
          list.tasks.forEach(t => {
            if (t.id == payload.taskId) {
              t.name = payload.taskName
              t.priority = payload.taskPriority
            }
          })
          userDataRef.update({
            tasks: list.tasks
          })
          .then(() => {
            dispatch('LOAD_LISTS', getters.userId)
            commit('SET_CURRENT_LIST', list)
            commit('SET_PROCESSING', false)
          })
          .catch((error) => {
            console.log(error)
            commit('SET_PROCESSING', false)
          })
        } else {
          console.log("Can't get tasks from DB");
        }
      })
      .catch((error) => console.log(error))
    },
    CHANGE_TASK_DONE({commit, dispatch, getters}, payload) {
      commit('SET_PROCESSING', true)
      let userDataRef = Vue.$db.collection(getters.userId).doc(payload.listId)
      let list = {}
      userDataRef.get()
      .then((doc) => {
        if (doc.exists) {
          list = doc.data()
          list.id = payload.listId
          list.tasks.forEach(t => {
            if (t.id == payload.taskId) {
              t.done = !t.done
            }
          })
          userDataRef.update({
            tasks: list.tasks
          })
          .then(() => {
            dispatch('LOAD_LISTS', getters.userId)
            commit('SET_CURRENT_LIST', list)
            commit('SET_PROCESSING', false)
          })
          .catch((error) => {
            console.log(error)
            commit('SET_PROCESSING', false)
          })
        } else {
          console.log("Can't get tasks from DB");
        }
      })
      .catch((error) => console.log(error))
    },
    DELETE_USER_TASK({commit, dispatch, getters}, payload) {
      commit('SET_PROCESSING', true)
      let userDataRef = Vue.$db.collection(getters.userId).doc(payload.listId)
      let list = {}
      userDataRef.get()
      .then((doc) => {
        if (doc.exists) {
          list = doc.data()
          list.id = payload.listId
          for (let i = 0; i < list.tasks.length; i++) {
            if (list.tasks[i].id == payload.taskId) {
              for (let j = i; j < list.tasks.length - 1; j++) {
                list.tasks[j] = list.tasks[j + 1]
              }
              list.tasks.length = list.tasks.length - 1
              break
            }
          }
          userDataRef.update({
            tasks: list.tasks
          })
          .then(() => {
            dispatch('LOAD_LISTS', getters.userId)
            commit('SET_CURRENT_LIST', list)
            commit('SET_PROCESSING', false)
          })
          .catch((error) => {
            console.log(error)
            commit('SET_PROCESSING', false)
          })
        } else {
          console.log("Can't get tasks from DB");
        }
      })
      .catch((error) => console.log(error))
    },
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
    currentList: (state) => state.currentList
  }
}