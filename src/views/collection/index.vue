<template>
  <div class="container">
    <!--    <a href="https://vitejs.dev" target="_blank">-->
    <!--      <img src="/vite.svg" class="logo" alt="Vite logo" />-->
    <!--    </a>-->
    <!--    <a href="https://vuejs.org/" target="_blank">-->
    <!--      <img src="@/assets/vue.svg" class="logo vue" alt="Vue logo" />-->
    <!--    </a>-->
    <div class="box">
      <template v-for="item in dataArr" :key="item.url">
        <card :data="item" />
      </template>
    </div>
  </div>
</template>

<script setup>
import card from './components/card.vue';
import data from '@assets/js/data.js';
const dataArr = data.reduce((acc, cur) => {
  if (cur.hasOwnProperty('data')) {
    acc.push(...cur.data);
  }
  return acc;
}, []);
</script>

<style lang="scss" scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;

  &:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }

  &.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
  }
}

.box {
  display: flex;
}
</style>
