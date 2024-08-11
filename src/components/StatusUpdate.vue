<template>
  <div style="display: flex; justify-content: space-between; background-color: rgba(0,0,0,0.25)">
    <div style="display: flex; gap: 1px; padding: 10px;">
      <transition name="fade">
        <el-button
            key="refresh-button"
            :type="isRefreshing ? 'warning' : refreshSuccess ? 'success' : 'warning'"
            :icon="isRefreshing ? Refresh : (refreshSuccess ? Check : Refresh)"
            circle
            title="刷新"
            :loading="isRefreshing"
            @click="handleRefresh"
        />
      </transition>
      <el-button type="danger" :icon="Close" circle title="关闭界面" />
    </div>
    <div style="padding: 10px">
      <el-button type="info" :icon="Position" circle title="前往" :disabled="true" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import { Check, Close, Position, Refresh } from "@element-plus/icons-vue";

const emit = defineEmits();
const isRefreshing = ref(false);
const refreshSuccess = ref(false);

const handleRefresh = async () => {
  isRefreshing.value = true;
  refreshSuccess.value = false;

  // API-integration debug
  emit('refresh');

  setTimeout(() => {
    isRefreshing.value = false;
    refreshSuccess.value = true;

    setTimeout(() => {
      refreshSuccess.value = false;
    }, 1500);
  }, 2000);
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
