<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-text">
        2025 ©CQMUA | Open Source(MIT) refers to <el-link href="https://github.com/CQMUA/server-center" target="_blank" underline>Github</el-link> | Wish you a good day!
      </div>
      <div class="footer-icons">
        <el-icon></el-icon>
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
  justify-content: right;
  align-items: center;
}

.footer-text {
  font-size: 16px;
  color: #333;
  text-align: center;
}

.footer-icons {
  display: flex;
  gap: 10px;
}
</style>
