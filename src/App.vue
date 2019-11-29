<template>
  <div id="app">
    <Login v-if="!isUserAuthenticated"></Login>
    <div class="loading" v-else-if="loadingData">
      <div>
        <div class="loading-img">
          <svg width="526" height="526" viewBox="0 0 526 526" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M263 513C401.071 513 513 401.071 513 263C513 124.929 401.071 13 263 13C124.929 13 13 124.929 13 263" stroke="#3C6D85" stroke-width="25" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="loading-text">
          Загружаем данные...
        </div>
      </div>
    </div>
    <div class="app" v-else>
      <Header></Header>
      <Lists></Lists>
    </div>
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
    },
    loadingData() {
      return this.$store.getters.getLoading
    }
  }
}
</script>

<style lang="sass">
$light-color: #f9f9f9
$light-text-color: #fff
$dark-color: #35495e
// $active-color: #347474
$active-color: #3c6d85
$shadow: 5px 5px 15px rgba(#000, 0.3)

body
  margin: 0
  background-color: $light-color
  font-family: "Roboto", sans-serif
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
  padding: 12px 30px
  border: none
  background-color: $active-color
  font-size: 14px
  font-weight: 100
  text-transform: uppercase
  letter-spacing: 1px
  color: $light-text-color
  text-decoration: none
  cursor: pointer
  transition: 0.3s
  &:hover
    background-color: darken($active-color, 10)
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
  padding: 70px 40px 60px 40px
  background-color: $light-color
  box-shadow: $shadow
  text-align: center
  &-close
    position: absolute
    top: -40px
    right: -30px
    font-size: 36px
    color: #fff
    transition: 0.3s
    cursor: pointer
    &:hover
      transform: rotate(90deg)
  &-title
    font-size: 22px
    margin-bottom: 50px
  &-input
    display: block
    width: 100%
    padding: 10px
    background-color: transparent
    border: none
    border-bottom: 2px solid $dark-color
    font-size: 16px
    text-align: center
    margin-bottom: 30px
  &-delete
    &__btn
      &:first-child
        margin-right: 30px
  &-error
    width: 500px
    padding: 20px 10px
    .popup-title
      display: flex
      align-items: center
      text-align: left
      margin-bottom: 0
    &__cross
      display: flex
      justify-content: center
      align-items: center
      min-width: 40px
      width: 40px
      height: 40px
      background-color: rgba(#d50000, 0.2)
      font-size: 38px
      color: #d50000
      margin-right: 30px
  &-success
    width: 500px
    padding: 20px 10px
    position: fixed
    top: 10px
    right: 10px
    .popup-title
      display: flex
      align-items: center
      text-align: left
      font-size: 20px
      margin-bottom: 0
    &__tick
      display: flex
      justify-content: center
      align-items: center
      min-width: 40px
      width: 40px
      height: 40px
      padding: 10px
      background-color: rgba(#2E7D32, 0.4)
      margin-right: 20px
.loading
  position: fixed
  height: 100vh
  width: 100vw
  display: flex
  justify-content: center
  align-items: center
  &-img
    display: flex
    justify-content: center
    align-items: center
    width: 100px
    height: 100px
    margin: 0 auto 30px auto
    animation: load 0.7s infinite linear
  &-text
    font-size: 24px

@keyframes load
  from
    transform: rotate(0)
  50%
    transform: rotate(180deg)
  to
    transform: rotate(360deg)
</style>