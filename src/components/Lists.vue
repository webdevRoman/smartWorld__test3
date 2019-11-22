<template>
<div class="left">
  <div class="left-filter">
    <select name="filter" id="filter" class="left-filter__select" v-model="status">
      <option value="process" selected>Неисполненные</option>
      <option value="done">Исполненные</option>
      <option value="all">Все</option>
    </select>
  </div>
  <div class="left-lists">
    <div class="left-list" v-for="list in filteredLists" :key="list.id">
      <div class="left-list__name">{{ list.name }}</div>
      <div class="left-list__buttons">
        <button class="btn left-list__btn">
          <img src="../assets/pen.svg" alt="Pen image">
        </button>
        <button class="btn left-list__btn">
          <img src="../assets/bin.svg" alt="Bin image">
        </button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  export default {
    data() {
      return {
        status: 'process',
        statuses: ['processing', 'done', 'empty']
      }
    },
    computed: {
      lists() {
        return this.$store.getters.getLists
      },
      filteredLists() {
        let lists = this.lists
        if (this.status == 'process') {
          lists = lists.filter(l => l.state == 'process' || l.state == 'empty')
        } else if (this.status == 'done') {
          lists = lists.filter(l => l.state == 'done')
        }
        return lists
      }
    }
  }
</script>

<style scoped lang="sass">
.left
  flex-basis: 35%
  min-height: 95vh
  padding: 50px 0
  border-right: 3px solid #2c3e50
  margin-right: 50px
  &-filter
    width: 90%
    margin: 0 auto 50px auto
    &__select
      width: 100%
      padding: 10px
      border: 2px solid #2c3e50
      border-radius: 5px
      font-size: 16px
  &-list
    display: flex
    justify-content: space-between
    align-items: center
    padding: 5px 10px
    border-bottom: 2px solid #2c3e50
    transition: 0.3s
    cursor: pointer
    &:hover
      background-color: rgba(#2c3e50, 0.2)
    &:first-child
      border-top: 2px solid #2c3e50
    &__name
      font-size: 18px
    &__buttons
      display: flex
      justify-content: space-between
      align-items: center
    &__btn
      display: flex
      justify-content: center
      align-items: center
      max-width: 40px
      padding: 10px
      &:first-child
        margin-right: 10px
</style>