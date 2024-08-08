<script setup lang="ts">
import { ElMessage } from "element-plus";
import { ElementPlus, Position } from "@element-plus/icons-vue";

defineProps<{ msg: string }>();

const toast = () => {
  ElMessage.success("功德加1");
};
</script>

<template>
  <div class="container">
    <h1 color="$ep-color-primary">{{ msg }}</h1>
    <div>
      <p>
        由
        <el-link :icon="ElementPlus" type="primary" href="https://element-plus.org/zh-CN">ElementPlus</el-link>
        和
        <el-link :icon="Position" type="danger" href="https://vuejs.org/">Vue3</el-link>
        开发，在
        <el-link :icon="Position" type="info" href="https://vercel.com">Vercel</el-link>
        部署
      </p>
    </div>

    <div class="mb-4">
      <el-button size="large" @click="toast">试一下电子木鱼</el-button>
    </div>
  </div>
</template>

<style>
#logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  //display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>

