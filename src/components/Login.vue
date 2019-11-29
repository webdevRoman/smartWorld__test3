<template>
<div class="overlay">
  <form action="#" class="login">
    <h2 class="login-title">Авторизация</h2>
    <div class="login-warning" v-if="error">{{ error }}</div>
    <div class="login-block">
      <div class="login-block__icon">
        <img src="../assets/user.svg" alt="User image">
      </div>
      <input type="email" class="login-block__input" placeholder="Email" required v-model="email">
    </div>
    <div class="login-block">
      <div class="login-block__icon">
        <img src="../assets/lock.svg" alt="Lock image">
      </div>
      <input type="password" class="login-block__input" placeholder="Password" required v-model="password">
    </div>
    <button type="submit" class="btn login-btn" @click.prevent="signin" :disabled="processing">Войти</button>
  </form>

  <div class="overlay" v-if="errorPopup">
    <div class="popup popup-error">
      <div class="popup-close" @click.prevent="errorPopup = false">&times;</div>
      <div class="popup-title">
        <div class="popup-error__cross">&times;</div>
        <div class="popup-error__message">{{ errorMessage }}</div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      email: null,
      password: null,
      errorPopup: false,
      errorMessage: null
    }
  },
  methods: {
    signin() {
      if (!this.email) {
        this.errorMessage = 'Введите e-mail'
        this.errorPopup = true
      } else if (!this.password) {
        this.errorMessage = 'Введите пароль'
        this.errorPopup = true
      } else {
        this.$store.dispatch('SIGNIN', { email: this.email, password: this.password })
      }
    }
  },
  computed: {
    error() {
      return this.$store.getters.getError
    },
    processing() {
      return this.$store.getters.getProcessing
    }
  }
}
</script>

<style scoped lang="sass">
$light-color: #f9f9f9
$dark-color: #35495e
$shadow: 5px 5px 15px rgba(#000, 0.3)

.login
  width: 450px
  padding: 100px 50px 110px 50px
  border: 2px solid #2c3e50
  background-color: $light-color
  box-shadow: $shadow
  &-title
    font-size: 24px
    font-weight: 100
    text-transform: uppercase
    text-align: center
    margin-bottom: 50px
  &-warning
    padding: 20px
    background-color: #FFEB3B
    border: 2px solid #FFC107
    margin-bottom: 30px
  &-block
    border-bottom: 2px solid $dark-color
    display: flex
    justify-content: center
    align-items: center
    margin-bottom: 20px
    &__icon
      flex-basis: 15%
      padding: 10px
      display: flex
      justify-content: center
      align-items: center
      img
        max-height: 40px
    &__input
      flex-basis: 85%
      padding: 15px
      background-color: transparent
      border: none
      font-size: 20px
      &::placeholder
        color: rgba(#000, 0.5)
  &-btn
    display: block
    width: 100%
    margin-top: 30px
    padding: 20px
    font-size: 16px
    &:disabled
      cursor: default
      background-color: rgba(#2980b9, 0.2)
</style>