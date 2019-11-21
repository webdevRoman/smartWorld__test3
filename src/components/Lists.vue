<template>
<div class="left">
  <div class="left-filter">
    <select name="filter" id="filter" class="left-filter__select">
      <option value="process">Неисполненные</option>
      <option value="done">Исполненные</option>
      <option value="all">Все</option>
    </select>
  </div>
  <div class="left-lists">
    <div class="left-list">
      <div class="left-list__name">
        Дела 1
      </div>
      <button class="btn left-list__btn">
        <img src="../assets/pen.svg" alt="Pen image">
      </button>
      <button class="btn left-list__btn">
        <img src="../assets/bin.svg" alt="Bin image">
      </button>
    </div>
  </div>
</div>
</template>

<script>
  export default {
    
  }
</script>

<style scoped lang="sass">
  
</style>