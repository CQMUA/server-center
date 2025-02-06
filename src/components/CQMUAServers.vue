<template>
  <el-card class="server-card" shadow="hover">
    <div class="server-header">
      <div class="server-info">
        <div class="server-title">
          <el-avatar
              class="server-icon"
              size="large"
              :src="serverIcon"
          ></el-avatar>
          <a href="https://www.yuque.com/pguide/cqmua/twwn635iq7te6pgp" target="_blank">{{ serverData?.host }}</a>
          <CircleCheckFilled size="6" color="green" v-if="serverData?.online" />
          <CircleCloseFilled size="6" color="red" v-else />
        </div>
        <div class="server-status">
          <el-tag type="info">联合生存服</el-tag>
          <el-tag type="warning">CQMUA通行证</el-tag>
        </div>
      </div>
    </div>
    <div class="server-body">
      <div class="server-version" v-html="serverData?.version?.name_html"></div>
      <div class="server-motd" v-html="serverData?.motd?.html"></div>
      <div class="server-players">
        <el-collapse v-model="activeCollapse">
          <el-collapse-item title="在线玩家列表(点击查看id)" name="1">
            <ul class="player-list" v-if="serverData?.players?.list">
              <li v-for="player in serverData.players.list" :key="player.uuid">
                <el-tooltip :content="getInnerHtml(player.name_html)" placement="top">
                  <img loading="lazy"
                       width="24"
                       height="24"
                       decoding="async"
                       :src="`https://api.mineatar.io/head/${player.uuid}`"
                       style="color: transparent;" alt="MCAvatars"/>
                  <span class="font-mono text-sm" v-html="player.name_html" v-if="player.name_html"></span>
                </el-tooltip>
              </li>
            </ul>
            <p v-else>没有在线玩家</p>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import axios from 'axios';
import defaultIcon from '../assets/bingo_cat.gif';
import {ElMessage} from 'element-plus';
import {CircleCheckFilled, CircleCloseFilled} from "@element-plus/icons-vue";

const serverData = ref(null);
const serverIcon = ref(defaultIcon);
const loading = ref(false);
const activeCollapse = ref(['1']); // Set the default expanded item

const fetchServerStatus = async () => {
  loading.value = true;
  try {
    const response = await axios.get('https://api.mcstatus.io/v2/status/java/mc.cqmua.cn');
    serverData.value = response.data;
    serverIcon.value = response.data.icon ? response.data.icon : defaultIcon;
  } catch (error) {
    console.error('Error fetching server status:', error);
    ElMessage.error('请求服务器状态失败！');
  } finally {
    loading.value = false;
  }
};

const getInnerHtml = (htmlString) => {
  const div = document.createElement('div');
  div.innerHTML = htmlString;
  return div.textContent || div.innerText || '';
};

onMounted(() => {
  fetchServerStatus();
});
</script>

<style scoped>
.server-card {
  margin: 30px;
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

.server-title a {
  text-decoration: none;
  color: inherit;
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

.server-version {
  color: #e59533;
}

.player-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  list-style: none;
  padding: 0;
}

.player-avatar {
  width: 32px;
  height: 32px;
  border-radius: 4px;
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
    padding: 1em;
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