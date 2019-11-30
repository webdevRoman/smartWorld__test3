<template>
<div class="container">
  <div class="left">
    <div class="left-filter">
      <select name="filter" id="filter" class="left-filter__select" v-model="status">
        <option value="process" selected>Неисполненные</option>
        <option value="done">Исполненные</option>
        <option value="all">Все</option>
      </select>
    </div>
    <div class="left-lists">
      <div :class="listClass(list)" v-for="(list, i) in filteredLists" :key="list.id" @click.prevent="setActiveCard(list, i)">
        <div class="left-list__name">{{ list.name }}</div>
        <div class="left-list__buttons">
          <button class="btn left-list__btn" @click.prevent="showListPopup(list.name, list.id)">
            <img src="../assets/pen.svg" alt="Pen image">
          </button>
          <button class="btn left-list__btn" @click.prevent="showDeleteListPopup(list)">
            <img src="../assets/bin.svg" alt="Bin image">
          </button>
        </div>
      </div>
    </div>
    <button class="btn left-btn" @click.prevent="showListPopup(null, null)">+</button>
  </div>

  <div class="separator"></div>

  <div v-if="currentList" class="right">
    <Tasks :list="currentList"></Tasks>
  </div>
  <div v-else class="right-choose">
    Выберите список дел
  </div>

  <div class="overlay" v-if="listPopup">
    <div class="popup popup-add_list">
      <div class="popup-close" @click.prevent="listPopup = false">&times;</div>
      <div class="popup-title" v-if="addPopupFlag">Добавить список дел</div>
      <div class="popup-title" v-else>Изменить список дел</div>
      <input type="text" class="popup-input" placeholder="Название списка дел" v-model="newListName">
      <button class="btn popup-btn" @click.prevent="addList" v-if="addPopupFlag">Добавить</button>
      <button class="btn popup-btn" @click.prevent="editList" v-else>Сохранить изменения</button>
    </div>
  </div>
  <div class="overlay" v-if="deleteListPopup">
    <div class="popup popup-delete">
      <div class="popup-close" @click.prevent="deleteListPopup = false">&times;</div>
      <div class="popup-title">
        Вы действительно хотите удалить список дел "{{ currentList.name }}"?
        {{ currentList.tasks.length ? `\n\nВсе связанные дела (${currentList.tasks.length} шт.) также будут удалены:` : '' }}
        <ul>
          <li v-for="(task, i) in currentList.tasks" :key="i">{{ task.name }}</li>
        </ul>
      </div>
      <div>
        <button class="btn popup-delete__btn" @click.prevent="deleteList()">Да</button>
        <button class="btn popup-delete__btn" @click.prevent="deleteListPopup = false">Нет</button>
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
</div>
</template>

<script>
  import Tasks from './Tasks'
  export default {
    data() {
      return {
        status: 'process',
        currentList: null,
        listPopup: false,
        deleteListPopup: false,
        addPopupFlag: true,
        newListName: '',
        listId: null,
        errorPopup: false,
        errorMessage: null,
        successPopup: false,
        successMessage: null
      }
    },
    methods: {
      setActiveCard(list, index) {
        const lists = document.querySelectorAll('.left-list')
        lists.forEach(l => {
          l.classList.remove('left-list_active')
        })
        lists[index].classList.add('left-list_active')
        this.setCurrentList(list)
      },
      setCurrentList(list) {
        this.$store.dispatch('SET_CURRENT_LIST', list)
        this.currentList = this.$store.getters.currentList
      },
      showListPopup(listName, listId) {
        this.listId = listId
        if (listName != null) {
          this.addPopupFlag = false
          this.newListName = listName
        } else {
          this.addPopupFlag = true
          this.newListName = ''
        }
        this.listPopup = true
      },
      addList() {
        if (!this.newListName) {
          this.errorMessage = 'Поле "Название списка дел" должно быть заполнено'
          this.errorPopup = true
          setTimeout(() => {
            this.errorPopup = false
          }, 5000)
        } else if (this.newListName.length > 30) {
          this.errorMessage = 'В поле "Название списка дел" должно быть не более 30 символов'
          this.errorPopup = true
          setTimeout(() => {
            this.errorPopup = false
          }, 5000)
        } else if (!(this.$store.getters.getLists.every(l => l.name != this.newListName))) {
          this.errorMessage = 'Такой список дел уже существует'
          this.errorPopup = true
          setTimeout(() => {
            this.errorPopup = false
          }, 5000)
        } else {
          this.$store.dispatch('ADD_USER_LIST', this.newListName)
          this.listPopup = false
          this.successMessage = `Список дел "${this.newListName}" добавлен`
          this.newListName = ''
          this.successPopup = true
          setTimeout(() => {
            this.successPopup = false
          }, 3000)
        }
      },
      editList() {
        if (!this.newListName) {
          this.errorMessage = 'Поле "Название списка дел" должно быть заполнено'
          this.errorPopup = true
          setTimeout(() => {
            this.errorPopup = false
          }, 5000)
        } else if (this.newListName.length > 30) {
          this.errorMessage = 'В поле "Название списка дел" должно быть не более 30 символов'
          this.errorPopup = true
          setTimeout(() => {
            this.errorPopup = false
          }, 5000)
        } else if (!(this.$store.getters.getLists.every(l => l.name != this.newListName))) {
          this.errorMessage = 'Такой список дел уже существует'
          this.errorPopup = true
          setTimeout(() => {
            this.errorPopup = false
          }, 5000)
        } else {
          this.$store.dispatch('EDIT_USER_LIST', { listId: this.listId, listName: this.newListName })
          this.listPopup = false
          this.successMessage = `Список дел "${this.newListName}" изменён`
          this.newListName = null
          this.currentList = null
          const lists = document.querySelectorAll('.left-list')
          lists.forEach(l => {
            l.classList.remove('left-list_active')
          })
          this.successPopup = true
          setTimeout(() => {
            this.successPopup = false
          }, 3000)
        }
      },
      showDeleteListPopup(list) {
        this.setCurrentList(list)
        this.listId = list.id
        this.deleteListPopup = true
      },
      deleteList() {
        this.$store.dispatch('DELETE_USER_LIST', this.listId)
        this.deleteListPopup = false
        this.successMessage = `Список дел "${this.currentList.name}" удалён`
        this.listId = null
        this.currentList = null
        this.successPopup = true
        setTimeout(() => {
          this.successPopup = false
        }, 3000)
      },
      listClass(list) {
        if (!list.tasks.length) {
          return 'left-list left-list_empty'
        } else if(list.tasks.every(t => t.done)) {
          return 'left-list left-list_done'
        } else {
          return 'left-list left-list_process'
        }
      }
    },
    computed: {
      filteredLists() {
        let lists = this.$store.getters.getLists
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
$light-color: #f9f9f9
$active-color: #3c6d85

.container
  align-items: stretch
  justify-content: flex-start
.left
  width: 400px
  min-height: 90vh
  padding: 40px 20px 90px 20px
  background-color: $light-color
  box-shadow: inset 0 0 15px rgba(#000, 0.3)
  position: relative
  &-filter
    margin-bottom: 40px
    &__select
      width: 100%
      padding: 10px
      border: 2px solid $active-color
      font-size: 16px
      appearance: none
      background: url(../assets/arrow.svg) 100% / 12% no-repeat #fff
      cursor: pointer
      &::-ms-expand
        display: none
  &-list
    display: flex
    justify-content: space-between
    align-items: center
    padding: 5px 10px
    background-color: #fff
    box-shadow: 5px 5px 10px rgba(#000, 0.3)
    margin-bottom: 10px
    transition: 0.3s
    cursor: pointer
    &:hover
      box-shadow: 5px 5px 15px rgba(#000, 0.4)
      transform: scale(1.04)
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
    &_empty
      background-color: #fff
    &_done
      background-color: #ccc
    &_process
      background-color: #42b883
    &_active
      box-shadow: 5px 5px 15px rgba(#000, 0.4)
      transform: scale(1.04)
  &-btn
    width: 50px
    height: 50px
    padding: 0
    font-size: 28px
    position: absolute
    bottom: 20px
    left: 20px
.separator
  width: 5px
  min-height: 90vh
  background-color: #2c3e50
.right
  flex-grow: 1
  min-height: 90vh
  background-color: $light-color
  &-choose
    flex-grow: 1
    min-height: 90vh
    padding: 50px 20px
    background-color: $light-color
    font-size: 24px
    box-shadow: inset 0 0 15px rgba(#000, 0.3)
.popup
  width: 500px
</style>