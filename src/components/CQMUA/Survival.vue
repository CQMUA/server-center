<template>
  <el-card class="server-card" shadow="hover">
    <div class="server-header">
      <el-avatar
          class="server-icon"
          size="large"
          :src="serverIcon"
      ></el-avatar>
      <div class="server-info">
        <div class="server-title">{{ serverData.host }}</div>
        <div class="server-status">{{ serverData.online ? '在线' : '离线' }}</div>
      </div>
    </div>
    <div class="server-body">
      <div class="server-version">版本: [{{ serverData.version?.name_html }}]</div>
      <div class="server-motd" v-html="serverData.motd?.html"></div>
      <div class="server-players">在线玩家: {{ serverData.players?.online }} / {{ serverData.players?.max }}</div>

    </div>
  </el-card>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import defaultIcon from '../../assets/bingo_cat.gif';
import { ElMessage } from 'element-plus';

const serverData = ref({});
const serverIcon = ref(defaultIcon);
const loading = ref(false);

const fetchServerStatus = async () => {
  loading.value = true;
  try {
    const response = await axios.get('https://api.mcstatus.io/v2/status/java/hypixel.net');
    serverData.value = response.data;
    serverIcon.value = response.data.icon ? response.data.icon : defaultIcon;
  } catch (error) {
    console.error('Error fetching server status:', error);
    ElMessage.error('请求服务器状态失败！');
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchServerStatus();
});
</script>

<style scoped>
.server-card {
  margin: 20px;
  padding: 20px;
  border-radius: 8px;
  transition: box-shadow 0.3s;
}

.server-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.server-icon {
  margin-right: 20px;
}

.server-info {
  display: flex;
  flex-direction: column;
}

.server-title {
  font-size: 1.5em;
  font-weight: bold;
}

.server-status {
  font-size: 1em;
  color: #666;
}

.server-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.server-version,
.server-players,
.server-motd {
  font-size: 1em;
}

@media (max-width: 768px) {
  .server-card {
    padding: 10px;
  }

  .server-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .server-icon {
    margin-bottom: 10px;
  }

  .server-title {
    font-size: 1.2em;
  }

  .server-status {
    font-size: 0.9em;
  }

  .server-body {
    gap: 5px;
  }

  .server-version,
  .server-players,
  .server-motd {
    font-size: 0.9em;
  }
}
</style>