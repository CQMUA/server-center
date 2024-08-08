<script setup lang="ts">
import { ElMessage } from "element-plus";
import { ElementPlus, Position } from "@element-plus/icons-vue";

defineProps<{ msg: string }>();

const toast = () => {
  ElMessage.success("Hello");
};
</script>

<template>
  <div class="container">
    <h1 color="$ep-color-primary">{{ msg }}</h1>

    <p>
      由
      <el-link :icon="ElementPlus" type="primary" href="https://element-plus.org/zh-CN">ElementPlus</el-link>
      和
      <el-link :icon="Position" type="danger" href="https://vuejs.org/">Vue3</el-link>
      开发，在
      <el-link :icon="Position" type="info" href="https://vercel.com">Vercel</el-link>
      部署
    </p>
    <div class="mb-4">
      <el-button size="large" @click="toast">试一下电子木鱼</el-button>
    </div>
  </div>
</template>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  //height: 100vh; /* 占满整个视口高度 */
  text-align: center; /* 使文本居中 */
}
</style>

