<template>
  <form action="#" class="login">
    <h2 class="login-title">Авторизация</h2>
    <div class="login-block">
      <div class="login-block__icon">
        <img src="../assets/user.svg" alt="User image">
      </div>
      <input type="text" class="login-block__input" placeholder="Username">
    </div>
    <div class="login-block">
      <div class="login-block__icon">
        <img src="../assets/lock.svg" alt="Lock image">
      </div>
      <input type="password" class="login-block__input" placeholder="Password">
    </div>
    <button type="submit" class="btn login-btn">Войти</button>
  </form>
</template>

<script>
  export default {
    // name: "login",
    // components: {
      
    // }
  }
</script>

<style scoped lang="sass">
.login
  width: 400px
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
  &-block
    width: 90%
    margin: 0 auto 30px auto
    display: flex
    justify-content: center
    align-items: center
    border: 2px solid rgba(#000, 0.2)
    border-radius: 5px
    overflow: hidden
    &__icon
      flex-basis: 15%
      padding: 10px
      background-color: rgba(#000, 0.15)
      img
        max-height: 40px
    &__input
      flex-basis: 85%
      padding: 10px
      border: none
      font-size: 20px
      &::placeholder
        color: rgba(#000, 0.5)
  &-btn
    display: block
    margin: 50px auto 0 auto
</style>