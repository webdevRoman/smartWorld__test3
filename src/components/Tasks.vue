<template>
  <section class="list">
    <h2 class="list-title">{{ listName }}</h2>
    <div class="list-items" v-if="tasks.length > 0">
      <div class="list-item" v-for="(task, i) in tasks" :key="task.id">
        <div class="list-item__priority" v-if="task.priority"></div>
        <div class="list-item__block">
          <input class="list-item__checkbox" type="checkbox" name="done" v-model="task.done" :id="generateCheckboxId(i)">
          <label class="list-item__name" :for="generateCheckboxId(i)">{{ task.name }}</label>
        </div>
        <div class="list-item__block">
          <div class="list-item__date">{{ getTime(task.time.seconds) }}</div>
          <button class="btn list-item__btn"><img src="../assets/pen.svg" alt="Pen image"></button>
          <button class="btn list-item__btn"><img src="../assets/bin.svg" alt="Bin image"></button>
        </div>
      </div>
    </div>
    <div class="list-noitems" v-else>В этом списке ещё нет задач</div>
  </section>
</template>

<script>
  export default {
    props: ['tasks', 'listName'],
    methods: {
      getTime(seconds) {
        let date = new Date(seconds * 1000)
        return (date.getDate().toString().length > 1 ? date.getDate().toString() : '0' + date.getDate().toString()) + '.' + (date.getMonth() + 1).toString() + '.' + date.getFullYear().toString() + ' ' + date.getHours().toString() + ':' + (date.getMinutes().toString().length > 1 ? date.getMinutes().toString() : '0' + date.getMinutes().toString())
      },
      generateCheckboxId(index) {
        return 'checkbox-' + index
      }
    }
  }
</script>

<style scoped lang="sass">
.list
  padding: 50px 30px
  &-title
    font-size: 26px
    font-weight: normal
    text-align: center
    margin-bottom: 50px
  &-item
    display: flex
    justify-content: space-between
    align-items: center
    padding: 5px 10px 5px 40px
    border-bottom: 2px solid #2c3e50
    position: relative
    &__priority
      width: 14px
      height: 14px
      background-color: #b71c1c
      border-radius: 50%
      position: absolute
      top: 50%
      left: 10px
      margin-top: -7px
    &__name
      font-size: 18px
    &__date
      margin-right: 20px
    &__block
      display: flex
      justify-content: space-between
      align-items: center
    &__btn
      display: flex
      justify-content: center
      align-items: center
      max-width: 40px
      padding: 10px
      &:last-child
        margin-left: 10px
  &-noitems
    font-size: 20px
    text-align: center

.list-item__checkbox
  position: absolute
  z-index: -1
  opacity: 0
.list-item__checkbox + label
  position: relative
  padding: 0 0 0 35px
  cursor: pointer
.list-item__checkbox + label:before
  content: ''
  position: absolute
  top: 0
  left: 0
  width: 18px
  height: 18px
  border: 2px solid #2c3e50
  border-radius: 5px
  background: #fff
  transition: 0.3s
.list-item__checkbox + label:after
  content: ''
  position: absolute
  top: -3px
  left: 2px
  width: 24px
  height: 24px
  background-image: url(../assets/tick.svg)
  background-size: contain
  opacity: 0
  transition: 0.2s
.list-item__checkbox:checked + label:after
  opacity: 1
</style>