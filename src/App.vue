<template>
  <div id="app">
    <Login v-if="!authorized"></Login>
    <Header v-if="authorized"></Header>
    <router-view />
  </div>
</template>

<script>
import Header from "./components/Header"
import Login from "./components/Login"
export default {
  data() {
    return {
      authorized: false
    }
  },
  components: {
    Header,
    Login
  }
}
</script>

<style lang="sass">
body
  margin: 0
  font-family: "Arial", sans-serif
img
  width: 100%
h1, h2, h3
  margin: 0
.btn
  padding: 10px 25px
  border: none
  background-color: #2980b9
  border-radius: 10px
  font-size: 16px
  color: #fff
  text-decoration: none
  cursor: pointer
  transition: 0.3s
  &:hover
    background-color: darken(#2980b9, 10)
</style>