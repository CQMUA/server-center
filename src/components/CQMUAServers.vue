<template>
  <div class="server-card-container">
    <el-card
        v-for="server in servers"
        :key="server.api"
        class="server-card"
        shadow="hover"
    >
      <!-- 加载状态 -->
      <template v-if="server.loading">
        <el-skeleton animated :rows="4" />
      </template>

      <!-- 错误状态 -->
      <template v-else-if="server.error">
        <div class="server-error">
          <el-empty description="加载失败" :image-size="60">
            <el-button size="small" type="primary" @click="retry(server)">重试</el-button>
          </el-empty>
        </div>
      </template>

      <!-- 正常内容 -->
      <template v-else>
        <div class="server-header">
          <div class="server-info">
            <div class="server-title">
              <el-avatar
                  class="server-icon"
                  size="large"
                  :src="server.icon"
              />
              <a :href="server.link" target="_blank">{{ server.data?.host }}</a>
              <CircleCheckFilled size="6" color="green" v-if="server.data?.online"/>
              <CircleCloseFilled size="6" color="red" v-else/>
            </div>
            <div class="server-status">
              <el-tag
                  v-for="(tag, i) in server.tags"
                  :key="i"
                  :type="tag.type"
              >{{ tag.text }}</el-tag>
            </div>
          </div>
        </div>

        <div class="server-body" v-if="server.showDetails">
          <div class="server-version" v-html="server.data?.version?.name_html"></div>
          <div class="server-motd" v-html="server.data?.motd?.html"></div>
          <div class="server-players">
            <el-collapse v-model="server.activeCollapse">
              <el-collapse-item title="在线玩家列表(点击查看id)" name="1">
                <ul class="player-list" v-if="server.data?.players?.list">
                  <li v-for="player in server.data.players.list" :key="player.uuid">
                    <el-tooltip :content="getInnerHtml(player.name_html)" placement="top">
                      <img
                          loading="lazy"
                          width="24"
                          height="24"
                          decoding="async"
                          :src="`https://api.mineatar.io/head/${player.uuid}`"
                          alt="MCAvatars"
                      />
                      <span
                          class="font-mono text-sm"
                          v-html="player.name_html"
                          v-if="player.name_html"
                      ></span>
                    </el-tooltip>
                  </li>
                </ul>
                <p v-else>没有在线玩家</p>
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>
      </template>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import defaultIcon from '../assets/bingo_cat.gif';
import { ElMessage } from 'element-plus';
import { CircleCheckFilled, CircleCloseFilled } from '@element-plus/icons-vue';

const servers = ref([
  {
    api: 'https://api.mcstatus.io/v2/status/java/mc.cqmua.cn',
    link: 'https://www.yuque.com/pguide/cqmua/twwn635iq7te6pgp',
    tags: [{ text: '联合生存服', type: 'info' }, { text: 'CQMUA通行证', type: 'warning' }],
    showDetails: true,
    data: null,
    icon: defaultIcon,
    activeCollapse: ['1'],
    loading: true,
    error: false
  },
  {
    api: 'https://api.mcstatus.io/v2/status/java/minigame.cqmua.fun',
    link: 'https://www.yuque.com/pguide/cqmua/acpqxohcyfno7l5d',
    tags: [{ text: '小游戏服', type: 'info' }, { text: 'CQMUA通行证', type: 'warning' }],
    showDetails: true,
    data: null,
    icon: defaultIcon,
    activeCollapse: ['1'],
    loading: true,
    error: false
  },
  {
    api: 'https://api.mcstatus.io/v2/status/java/redstone.cqmua.cn',
    link: 'https://www.yuque.com/pguide/cqmua/vulgxhdq0s1zy3ew',
    tags: [{ text: '联合生电服', type: 'info' }, { text: 'CQMUA通行证', type: 'warning' }],
    showDetails: true,
    data: null,
    icon: defaultIcon,
    activeCollapse: ['1'],
    loading: true,
    error: false
  },
  {
    api: 'https://api.mcstatus.io/v2/status/java/rebuild.cqmua.cn',
    link: 'https://www.yuque.com/pguide/cqmua/kgpgp9k3el6n9etg',
    tags: [{ text: '像素大学城', type: 'warning' }, { text: 'CQMUA联合认证', type: 'success' }],
    showDetails: false,
    data: null,
    icon: defaultIcon,
    activeCollapse: ['1'],
    loading: true,
    error: false
  },

]);

const getInnerHtml = (htmlString) => {
  const div = document.createElement('div');
  div.innerHTML = htmlString;
  return div.textContent || div.innerText || '';
};

const fetchServerStatus = async (server) => {
  server.loading = true;
  server.error = false;
  try {
    const { data } = await axios.get(server.api);
    server.data = data;
    server.icon = data.icon || defaultIcon;
  } catch (error) {
    server.error = true;
    ElMessage.error('请求服务器状态失败！');
  } finally {
    server.loading = false;
  }
};

const retry = (server) => {
  fetchServerStatus(server);
};

onMounted(() => {
  servers.value.forEach((server) => fetchServerStatus(server));
});
</script>

<style scoped>
.server-card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  max-width: calc(4 * 300px + 3 * 16px); /* 限制最大列数为4，300px卡片+16px间距 */
  gap: 16px;
  margin: auto;
}


.server-card {
  border-radius: 8px;
}

.server-header {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.server-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
}

.server-title a {
  text-decoration: none;
  color: inherit;
}

.server-status {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.server-body {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.server-version {
  color: #e59533;
}

.player-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.server-error {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}
</style>
