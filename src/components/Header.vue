<template>
<div>
  <header class="header">
    <div class="header-right">
      <router-link class="header-logo" to="/" tag="div">ToDo List</router-link>
      <div class="header-username">{{ login }}</div>
    </div>
    <button class="btn header-btn" @click.prevent="signoutConfirm = true" :disabled="processing">Выйти</button>
  </header>
  <div class="overlay" v-if="signoutConfirm">
    <div class="popup popup-signout">
      <div class="popup-close" @click.prevent="signoutConfirm = false">&times;</div>
      <div class="popup-title">Вы действительно хотите выйти?</div>
      <div>
        <button class="btn popup-signout__btn" @click.prevent="signout">Да</button>
        <button class="btn popup-signout__btn" @click.prevent="signoutConfirm = false">Нет</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      signoutConfirm: false
    }
  },
  methods: {
    signout() {
      this.$store.dispatch('SIGNOUT')
    }
  },
  computed: {
    login() {
      return this.$store.getters.userLogin
    },
    processing() {
      return this.$store.getters.getProcessing
    }
  }
}
</script>

<style scoped lang="sass">
$light-text-color: #fff
$dark-color: #35495e

.header
  padding: 20px 40px
  background-color: $dark-color
  display: flex
  justify-content: space-between
  align-items: center
  font-size: 18px
  color: $light-text-color
  &-right
    display: flex
    justify-content: flex-start
    align-items: center
  &-logo
    margin-right: 30px
    cursor: pointer
.overlay
  z-index: 10
.popup
  &-signout
    &__btn
      &:first-child
        margin-right: 30px
</style>
