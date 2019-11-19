<template>
  <header class="header">
    <div class="header-right">
      <router-link class="header-logo" to="/" tag="div">ToDo List</router-link>
      <div class="header-username">"username"</div>
    </div>
    <button class="btn header-btn">Выйти</button>
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
    cursor: pointer
</style>
