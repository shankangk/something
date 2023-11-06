<template>
  <div class="card">
    <p>{{data.name}}</p>
    <img :src="data.screenshot" alt="" />
  </div>
</template>

<script setup>
import {ref, useAttrs} from 'vue';
const attrs = useAttrs();
const props = defineProps(['data']);
const data = props.data;
</script>

<style lang="scss" scoped>
.card {
  width: 25%;
  img{
    width: 100%;
  }
}
</style>
