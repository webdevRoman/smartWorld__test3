import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import firebase from 'firebase'
import firebaseConfig from './config/firebase'

Vue.config.productionTip = false

firebase.initializeApp(firebaseConfig)

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    let vm = this
    firebase.auth().onAuthStateChanged(function(user) {
      vm.$store.dispatch('STATE_CHANGED', user)
      // if (user) {
      //   // User is signed in.
      //   var displayName = user.displayName;
      //   var email = user.email;
      //   var emailVerified = user.emailVerified;
      //   var photoURL = user.photoURL;
      //   var isAnonymous = user.isAnonymous;
      //   var uid = user.uid;
      //   var providerData = user.providerData;
      //   // ...
      // } else {
      //   // User is signed out.
      //   // ...
      // }
    })
  }
}).$mount('#app')
