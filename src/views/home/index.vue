<template>
  <div class="container">
    <h1>something</h1>
    <el-button @click="pathTo('/collection')">collection</el-button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const pathTo = (path) => {
  router.push(path);
};
</script>

<style lang="scss" scoped>
// css自定义属性  Houdini API
@property --direc {
  syntax: '<angle>'; //属性类型 length等等都可
  initial-value: 0deg; //默认值
  inherits: false; //是否可继承
}
.container {
  --direc: 20deg;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  background-image: linear-gradient(
    var(--direc),
    #dd5642,
    #c77e78,
    #9ea0b0,
    #32beeb
  );
  animation: bgmove 40s infinite linear;
  background-size: 200%;
}
@keyframes bgmove {
  to {
    --direc: 360deg;
  }
}

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
</style>
