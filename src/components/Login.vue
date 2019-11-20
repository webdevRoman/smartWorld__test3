<template>
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
</template>

<script>
export default {
  data() {
    return {
      email: null,
      password: null
    }
  },
  methods: {
    signin() {
      this.$store.dispatch('SIGNIN', { email: this.email, password: this.password })
    }
  },
  computed: {
    error() {
      return this.$store.getters.getError
    },
    processing() {
      return this.$store.getters.getProcessing
    },
    // isUserAuthenticated() {
    //   return this.$store.getters.isUserAuthenticated
    // }
  },
  // watch: {
  //   isUserAuthenticated(val) {
  //     if (val === true)
  //       this.$router.push('/')
  //   }
  // }
}
</script>

<style scoped lang="sass">
.login
  width: 450px
  padding: 30px 0 50px 0
  border: 2px solid #2c3e50
  border-radius: 10px
  margin: 10% auto 0 auto
  &-title
    padding-bottom: 30px
    border-bottom: 2px solid #2c3e50
    font-size: 24px
    text-align: center
    margin-bottom: 30px
  &-warning
    width: 90%
    padding: 20px
    background-color: #FFEB3B
    border: 2px solid #FFC107
    margin: 0 auto 30px auto
  &-block
    width: 90%
    margin: 0 auto 30px auto
    display: flex
    justify-content: center
    align-items: center
    overflow: hidden
    &__icon
      flex-basis: 15%
      padding: 10px
      background-color: rgba(#000, 0.15)
      border: 2px solid rgba(#000, 0.2)
      border-top-left-radius: 5px
      border-bottom-left-radius: 5px
      height: 55px
      display: flex
      justify-content: center
      align-items: center
      img
        max-height: 40px
    &__input
      flex-basis: 85%
      padding: 10px
      border: 2px solid rgba(#000, 0.2)
      border-left: none
      border-top-right-radius: 5px
      border-bottom-right-radius: 5px
      font-size: 20px
      height: 55px
      &::placeholder
        color: rgba(#000, 0.5)
  &-btn
    display: block
    margin: 50px auto 0 auto
    &:disabled
      cursor: default
      background-color: rgba(#2980b9, 0.2)
</style>