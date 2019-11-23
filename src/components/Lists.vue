<template>
<div class="container">
  <div class="left" v-if="lists">
    <div class="left-filter">
      <select name="filter" id="filter" class="left-filter__select" v-model="status">
        <option value="process" selected>Неисполненные</option>
        <option value="done">Исполненные</option>
        <option value="all">Все</option>
      </select>
    </div>
    <div class="left-lists">
      <div class="left-list" v-for="list in filteredLists" :key="list.id" @click.prevent="setCurrentList(list)">
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
  <div class="loading" v-else>Загружаем данные...</div>
  <div v-if="currentList" class="right">
    <Tasks :tasks="currentList.tasks" :listName="currentList.name"></Tasks>
  </div>
  <div v-else class="right-choose">
    Выберите список дел
  </div>
</div>
</template>

<script>
  import Tasks from './Tasks'
  export default {
    data() {
      return {
        status: 'process',
        statuses: ['processing', 'done', 'empty'],
        currentList: null
      }
    },
    methods: {
      setCurrentList(list) {
        this.currentList = list
      }
    },
    computed: {
      lists() {
        return this.$store.getters.getLists
      },
      filteredLists() {
        let lists = this.lists
        let filteredLists = []
        if (this.status == 'process') {
          lists.forEach(l => {
            if (!l.tasks.length) {
              filteredLists.push(l)
            } else {
              for (let i = 0; i < l.tasks.length; i++) {
                if (!l.tasks[i].done) {
                  filteredLists.push(l)
                  break
                }
              }
            }
          })
        } else if (this.status == 'done') {
          lists.forEach(l => {
            if (l.tasks.length) {
              let flag = true
              for (let i = 0; i < l.tasks.length; i++) {
                if (!l.tasks[i].done) {
                  flag = false
                  break
                }
              }
              if (flag)
                filteredLists.push(l)
            }
          })
        } else {
          filteredLists = lists
        }
        return filteredLists
      }
    },
    components: {
      Tasks
    }
  }
</script>

<style scoped lang="sass">
.left
  flex-basis: 35%
  min-width: 400px
  min-height: 95vh
  padding: 50px 0
  border-right: 3px solid #2c3e50
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
.right
  flex-basis: 65%
  &-choose
    flex-basis: 65%
    min-height: 95vh
    display: flex
    justify-content: center
    align-items: center
    font-size: 32px
.loading
  flex-basis: 65%
  min-height: 95vh
  display: flex
  justify-content: center
  align-items: center
  font-size: 32px
  animation: glow  1.5s infinite ease-in-out

@keyframes glow
  from
    opacity: 1
  50%
    opacity: 0.3
  to
    opacity: 1
</style>