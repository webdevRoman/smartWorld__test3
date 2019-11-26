<template>
<section class="list">
  <h2 class="list-title">{{ list.name }}</h2>
  <div class="list-items" v-if="list.tasks.length > 0">
    <div class="list-item" v-for="(task, i) in sortedTasks" :key="task.id">
      <div class="list-item__priority" v-if="task.priority"></div>
      <div class="list-item__block">
        <input class="list-item__checkbox" type="checkbox" name="done" v-model="task.done" :id="generateCheckboxId(i)" @click.prevent="changeTaskDone(task.id, $event)">
        <label class="list-item__name" :for="generateCheckboxId(i)">{{ task.name }}</label>
      </div>
      <div class="list-item__block">
        <div class="list-item__date">{{ getTime(task.time) }}</div>
        <button class="btn list-item__btn" @click.prevent="showTaskPopup(task.id, task.name, task.priority)"><img src="../assets/pen.svg" alt="Pen image"></button>
        <button class="btn list-item__btn" @click.prevent="showDeleteTaskPopup(task)"><img src="../assets/bin.svg" alt="Bin image"></button>
      </div>
    </div>
  </div>
  <div class="list-noitems" v-else>В этом списке ещё нет задач</div>
  <button class="btn list-btn" @click.prevent="showTaskPopup(null, null, null)">+</button>

  <div class="overlay" v-if="taskPopup">
    <div class="popup popup-add_task">
      <div class="popup-close" @click.prevent="taskPopup = false">&times;</div>
      <div class="popup-title" v-if="addPopupFlag">Добавить дело</div>
      <div class="popup-title" v-else>Изменить дело</div>
      <input type="text" class="popup-input" placeholder="Название дела" v-model="newTaskName">
      <div class="popup-priority">
        <input type="checkbox" name="priority" id="priority-checkbox" class="list-item__checkbox" v-model="newTaskPriority">
        <label for="priority-checkbox" class="popup-priority__label">Срочно</label>
      </div>
      <button class="btn popup-btn" @click.prevent="addTask" v-if="addPopupFlag">Добавить</button>
      <button class="btn popup-btn" @click.prevent="editTask" v-else>Сохранить изменения</button>
    </div>
  </div>
  <div class="overlay" v-if="deleteTaskPopup">
    <div class="popup popup-delete">
      <div class="popup-close" @click.prevent="deleteTaskPopup = false">&times;</div>
      <div class="popup-title">
        Вы действительно хотите удалить дело "{{ currentTask.name }}"?
      </div>
      <div>
        <button class="btn popup-delete__btn" @click.prevent="deleteTask()">Да</button>
        <button class="btn popup-delete__btn" @click.prevent="deleteTaskPopup = false">Нет</button>
      </div>
    </div>
  </div>
  <div class="overlay" v-if="errorPopup">
    <div class="popup popup-error">
      <div class="popup-close" @click.prevent="errorPopup = false">&times;</div>
      <div class="popup-title">
        <div class="popup-error__cross">&times;</div>
        <div class="popup-error__message">{{ errorMessage }}</div>
      </div>
    </div>
  </div>
  <div class="popup popup-success" v-if="successPopup">
    <div class="popup-close" @click.prevent="successPopup = false">&times;</div>
    <div class="popup-title">
      <div class="popup-success__tick"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve" fill="#2E7D32"><path d="M504.502,75.496c-9.997-9.998-26.205-9.998-36.204,0L161.594,382.203L43.702,264.311c-9.997-9.998-26.205-9.997-36.204,0 c-9.998,9.997-9.998,26.205,0,36.203l135.994,135.992c9.994,9.997,26.214,9.99,36.204,0L504.502,111.7 C514.5,101.703,514.499,85.494,504.502,75.496z"/></svg></div>
      <div class="popup-success__message">{{ successMessage }}</div>
    </div>
  </div>
</section>
</template>

<script>
  export default {
    props: ['list'],
    data() {
      return {
        currentTask: null,
        taskPopup: false,
        deleteTaskPopup: false,
        addPopupFlag: true,
        newTaskName: '',
        newTaskPriority: false,
        taskId: null,
        errorPopup: false,
        errorMessage: null,
        successPopup: false,
        successMessage: null
      }
    },
    methods: {
      getTime(milliseconds) {
        let date = new Date(milliseconds)
        return (date.getDate().toString().length > 1 ? date.getDate().toString() : '0' + date.getDate().toString()) + '.' + (date.getMonth() + 1).toString() + '.' + date.getFullYear().toString() + ' ' + (date.getHours().toString().length > 1 ? date.getHours().toString() : '0' + date.getHours().toString()) + ':' + (date.getMinutes().toString().length > 1 ? date.getMinutes().toString() : '0' + date.getMinutes().toString())
      },
      generateCheckboxId(index) {
        return 'checkbox-' + index
      },
      showTaskPopup(taskId, taskName, taskPriority) {
        this.taskId = taskId
        if (taskName != null) {
          this.addPopupFlag = false
          this.newTaskName = taskName
          this.newTaskPriority = taskPriority
        } else {
          this.addPopupFlag = true
          this.newTaskName = ''
          this.newTaskPriority = false
        }
        this.taskPopup = true
      },
      addTask() {
        if (!this.newTaskName) {
          this.errorMessage = 'Поле "Название дела" должно быть заполнено'
          this.errorPopup = true
          setTimeout(() => {
            this.errorPopup = false
          }, 5000)
        } else if (this.newTaskName.length > 30) {
          this.errorMessage = 'В поле "Название дела" должно быть не более 30 символов'
          this.errorPopup = true
          setTimeout(() => {
            this.errorPopup = false
          }, 5000)
        } else if (!(this.$store.getters.currentList.tasks.every(t => t.name != this.newTaskName))) {
          this.errorMessage = 'Такое дело уже существует'
          this.errorPopup = true
          setTimeout(() => {
            this.errorPopup = false
          }, 5000)
        } else {
          this.$store.dispatch('ADD_USER_TASK', { listId: this.list.id, taskName: this.newTaskName, taskPriority: this.newTaskPriority })
          this.taskPopup = false
          this.successMessage = `Дело "${this.newTaskName}" добавлено`
          this.newTaskName = ''
          this.successPopup = true
          setTimeout(() => {
            this.successPopup = false
          }, 3000)
        }
      },
      editTask() {
        if (!this.newTaskName) {
          this.errorMessage = 'Поле "Название дела" должно быть заполнено'
          this.errorPopup = true
          setTimeout(() => {
            this.errorPopup = false
          }, 5000)
        } else if (this.newTaskName.length > 30) {
          this.errorMessage = 'В поле "Название дела" должно быть не более 30 символов'
          this.errorPopup = true
          setTimeout(() => {
            this.errorPopup = false
          }, 5000)
        } else if (!(this.$store.getters.currentList.tasks.every(t => (t.id != this.taskId && t.name != this.newTaskName) || (t.id == this.taskId)))) {
          this.errorMessage = 'Такое дело уже существует'
          this.errorPopup = true
          setTimeout(() => {
            this.errorPopup = false
          }, 5000)
        } else {
          this.$store.dispatch('EDIT_USER_TASK', { listId: this.list.id, taskId: this.taskId, taskName: this.newTaskName, taskPriority: this.newTaskPriority })
          this.taskPopup = false
          this.successMessage = `Дело "${this.newTaskName}" изменено`
          this.newTaskName = ''
          this.successPopup = true
          setTimeout(() => {
            this.successPopup = false
          }, 3000)
        }
      },
      changeTaskDone(taskId, event) {
        for (let i = 0; i < this.$store.getters.currentList.tasks.length; i++) {
          let t = this.$store.getters.currentList.tasks[i]
          if (t.id == taskId) {
            if (t.done) {
              break
            } else {
              event.target.checked = true
              this.$store.dispatch('CHANGE_TASK_DONE', { listId: this.list.id, taskId: taskId })
              break
            }
          }
        }
      },
      showDeleteTaskPopup(task) {
        this.currentTask = task
        this.newTaskName = task.name
        this.taskId = task.id
        this.deleteTaskPopup = true
      },
      deleteTask() {
        this.$store.dispatch('DELETE_USER_TASK', { listId: this.list.id, taskId: this.taskId })
        this.deleteTaskPopup = false
        this.successMessage = `Дело "${this.newTaskName}" удалено`
        this.newTaskName = ''
        this.successPopup = true
        setTimeout(() => {
          this.successPopup = false
        }, 3000)
      }
    },
    computed: {
      storeTasks() {
        let storeTasks = this.$store.getters.currentList.tasks
        return storeTasks
      },
      sortedTasks() {
        let sortedTasks = this.storeTasks
        sortedTasks = sortedTasks.sort((a, b) => b.time - a.time)
        return sortedTasks
      }
    }
  }
</script>

<style scoped lang="sass">
.list
  min-height: 90vh
  padding: 50px 30px
  position: relative
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
  &-btn
    display: flex
    justify-content: center
    align-items: center
    padding: 0 10px 5px 10px
    font-size: 40px
    position: absolute
    bottom: 30px
    left: 30px

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

.popup
  width: 500px
  &-priority
    margin-bottom: 30px
    &__label
      font-size: 18px
</style>