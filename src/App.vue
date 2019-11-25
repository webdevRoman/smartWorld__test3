<template>
  <div id="app">
    <Login v-if="!isUserAuthenticated"></Login>
    <Header v-if="isUserAuthenticated"></Header>
    <Lists v-if="isUserAuthenticated"></Lists>
  </div>
</template>

<script>
import Header from "./components/Header"
import Login from "./components/Login"
import Lists from "./components/Lists"
export default {
  components: {
    Header,
    Login,
    Lists
  },
  computed: {
    isUserAuthenticated() {
      return this.$store.getters.isUserAuthenticated
    }
  }
}
</script>

<style lang="sass">
body
  margin: 0
  font-family: "Arial", sans-serif
*
  box-sizing: border-box
img, svg
  width: 100%
h1, h2, h3
  margin: 0
.container
  display: flex
  justify-content: space-between
  align-items: flex-start
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
.overlay
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100vh
  background-color: rgba(#000, 0.8)
  display: flex
  justify-content: center
  align-items: center
.popup
  position: relative
  padding: 30px
  border: 2px solid #2c3e50
  border-radius: 10px
  background-color: #fff
  text-align: center
  &-close
    position: absolute
    top: -30px
    right: -30px
    font-size: 36px
    color: #fff
    transition: 0.3s
    cursor: pointer
    &:hover
      transform: rotate(90deg)
  &-title
    font-size: 24px
    margin-bottom: 30px
  &-input
    display: block
    width: 100%
    padding: 10px
    border: 2px solid #2c3e50
    border-radius: 5px
    font-size: 16px
    margin-bottom: 30px
  &-delete
    &__btn
      &:first-child
        margin-right: 30px
  &-error
    .popup-title
      display: flex
      align-items: center
      text-align: left
      margin-bottom: 0
    &__cross
      display: flex
      justify-content: center
      align-items: center
      width: 50px
      height: 50px
      border-radius: 50%
      background-color: rgba(#d50000, 0.4)
      font-size: 42px
      color: #d50000
      margin-right: 20px
  &-success
    position: absolute
    top: 10px
    right: 10px
    .popup-title
      display: flex
      align-items: center
      text-align: left
      margin-bottom: 0
    &__tick
      display: flex
      justify-content: center
      align-items: center
      min-width: 50px
      width: 50px
      height: 50px
      padding: 10px
      border-radius: 50%
      background-color: rgba(#2E7D32, 0.4)
      margin-right: 20px
</style>