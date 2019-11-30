import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import firebase from 'firebase'
import 'firebase/firestore'
import firebaseConfig from './config/firebase'

Vue.config.productionTip = false

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()

Vue.$db = db

new Vue({
  store,
  render: h => h(App),
  created() {
    let vm = this
    firebase.auth().onAuthStateChanged(function(user) {
      vm.$store.dispatch('STATE_CHANGED', user)
    })

    this.$store.dispatch('LOAD_LISTS')
  }
}).$mount('#app')
