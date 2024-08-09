<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-text">
        You can use TEXT to replace
        FOOTER components using
      </div>
      <div class="footer-icons">
        <el-icon><ChromeFilled /></el-icon>
        <!-- Add more icons here if needed -->
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ElIcon } from 'element-plus';
import { ChromeFilled } from '@element-plus/icons-vue';
</script>

<style scoped>
.footer {
  background-color: var(--el-bg-color);
  padding: 20px;
  text-align: center;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-text {
  font-size: 16px;
  color: #333;
}

.footer-icons {
  display: flex;
  gap: 10px;
}
</style>
