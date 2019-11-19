<template>
  <header class="header">
    <div class="header-right">
      <div class="header-logo">ToDo List</div>
      <div class="header-username">"username"</div>
    </div>
    <router-link class="btn header-btn" to="/login">Выйти</router-link>
  </header>
</template>

<script>
export default {};
</script>

<style scoped lang="sass">
.header
  padding: 20px 40px
  background-color: #2c3e50
  display: flex
  justify-content: space-between
  align-items: center
  font-size: 18px
  color: #fff
  &-right
    display: flex
    justify-content: flex-start
    align-items: center
  &-logo
    margin-right: 30px
</style>
