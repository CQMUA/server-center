<template>
  <div style="display: flex; justify-content: space-between; background-color: rgba(255,255,255,0.2)">
    <div style="display: flex; gap: 1px; padding: 10px;">
      <transition name="fade">
        <el-button
            key="refresh-button"
            :type="isRefreshing ? 'warning' : refreshSuccess ? 'success' : 'warning'"
            :icon="isRefreshing ? Refresh : (refreshSuccess ? Check : Refresh)"
            circle
            title="刷新"
            :loading="isRefreshing"
            @click="refresh"
        />
      </transition>
      <!--      <el-button type="success" :icon="Check" circle />-->
      <el-button type="danger" :icon="Close" circle :disabled="true" title="关闭界面"/>
    </div>
    <div style="padding: 10px">
      <el-button type="info" :icon="Position" circle title="前往" :disabled="true"/>
    </div>
  </div>
</template>

<style scoped>

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.8s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */
{
  opacity: 0.5;
}
</style>

<script setup lang="ts">
import {ref} from 'vue';
import {Check, Close, Position, Refresh} from "@element-plus/icons-vue";

const isRefreshing = ref(false);
const refreshSuccess = ref(false);

const refresh = async () => {
  isRefreshing.value = true;
  refreshSuccess.value = false; // 重置成功状态

  // 模拟刷新操作，例如请求数据
  await new Promise(resolve => setTimeout(resolve, 2000)); // 假设刷新需要2秒

  isRefreshing.value = false;
  refreshSuccess.value = true; // 刷新成功，更新状态

  // 0.5秒后恢复为原来的图标
  setTimeout(() => {
    refreshSuccess.value = false; // 恢复为原来的状态
  }, 1000);
};
</script>
