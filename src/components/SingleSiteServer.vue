<template>
  <div class="server-status">
    <StatusUpdate @refresh="fetchServerStatus"></StatusUpdate>
    <el-scrollbar max-height="368px" max-width="fit-content" :always="false">
      <div v-if="!servers || Object.keys(servers).length === 0" style="text-align: center; padding: 10px">
        该学校或组织<span style="color: red; font-weight: bold;">没有</span>公开的服务器记录，联系<a style="color: #6b778c" href="https://qm.qq.com/q/3QTOMQKgMw" target="_blank">开发人员</a> 添加。
      </div>
      <div v-else-if="showServerCountMessage" style="text-align: center; padding: 10px">
        该学校或组织有 <span style="color: green; font-weight: bold;">{{ Object.keys(servers).length }}</span> 个公开的服务器记录，请点击刷新按钮。
      </div>
      <div v-if="serverData.length">
        <div v-for="(data, index) in serverData" :key="index" class="server-item">
          <div class="header">
            <div class="header-left">
              <el-icon size="30" v-if="data.online && !refreshing" color="green">
                <CircleCheckFilled/>
              </el-icon>
              <el-icon size="30" v-else-if="!data.online && !refreshing" color="red">
                <CircleCloseFilled/>
              </el-icon>
              <el-icon size="30" v-if="refreshing" color="orange">
                <Loading/>
              </el-icon>
              <div class="copy-box">
                <span :class="['server-address', { online: data.online }]">
                  {{ data.host }}:{{ data.port }}
                  <el-icon
                      size="18"
                      :style="{ cursor: data.online ? 'pointer' : 'not-allowed' }"
                      @click="data.online ? copyToClipboard(data.host, data.port, index) : null"
                  >
                    <template v-if="copySuccess[index]">
                      <Check/>
                    </template>
                    <template v-else>
                      <CopyDocument/>
                    </template>
                  </el-icon>
                </span>
              </div>
            </div>
          </div>
          <div class="body">
            <el-row :gutter="40">
              <el-col :span="4">
                <div style="justify-content: center; align-self: center">
                  <img :src="getServerIcon(data)" alt="Server Icon" class="server-icon"/>
                </div>
              </el-col>
              <el-col :span="20">
                <el-col>
                  <div class="server-info">
                    <div class="server-motd"
                         v-html="data.online ? data.motd.html : '服务器不在线，无法显示服务器状态'"></div>
                  </div>
                  <div class="version-motd"
                       v-html="data.online ? data.version.name_html : '服务器不在线，无法显示版本信息'"></div>
                </el-col>
              </el-col>
            </el-row>
          </div>
          <div class="MUAServer-collapse">
            <el-collapse accordion>
              <el-collapse-item title="模组、插件" name="1">
                <div>模组：</div>
                <div>插件：</div>
              </el-collapse-item>
              <el-collapse-item
                  :title="`在线玩家(${data.online ? data.players.online : 0} / ${data.online ? data.players.max : 0})`"
                  name="2">
                <div class="server-players" v-if="data.online">
                  <ol class="flex flex-wrap mt-3 list-none">
                    <li v-for="player in data.players.list" :key="player.uuid">
                      <a :href="`https://minecraftuuid.com/?search=${player.uuid}`" rel="sponsored"
                         class="flex items-center gap-3 px-3 py-2 card card-hover">
                        <img loading="lazy"
                             width="24"
                             height="24"
                             decoding="async"
                             :src="`https://api.mineatar.io/head/${player.uuid}`"
                             style="color: transparent;" alt="MCAvatars"/>
                        <span class="font-mono text-sm" v-html="player.name_html" v-if="player.name_html"></span>
                      </a>
                    </li>
                  </ol>
                </div>
                <div v-else>
                  <p>服务器不在线，无法显示在线玩家信息。</p>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>
      </div>
      <div v-else style="justify-content: center; align-self: center; text-align: center;">
        <el-row v-loading="loading"></el-row>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import {ref} from 'vue';
import axios from 'axios';
import StatusUpdate from './StatusUpdate.vue'; // Import the StatusUpdate component
import defaultIcon from '../assets/bingo_cat.gif';
import {CircleCheckFilled, CircleCloseFilled, CopyDocument, Check, Loading} from "@element-plus/icons-vue"; // Import Loading icon
import {ElMessage} from 'element-plus';

export default {
  components: {StatusUpdate, CopyDocument, Check, CircleCloseFilled, CircleCheckFilled, Loading},
  props: {
    servers: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const serverData = ref([]);
    const loading = ref(false);
    const copySuccess = ref({});
    const refreshing = ref(false); // New state for refreshing
    const showServerCountMessage = ref(true); // New state for showing server count message

    const fetchServerStatus = async () => {
      refreshing.value = true; // Set refreshing state to true
      loading.value = true;
      showServerCountMessage.value = false; // Hide server count message on refresh
      try {
        const requests = Object.entries(props.servers).map(([name, address]) => {
          return axios.get(`https://api.mcstatus.io/v2/status/java/${address}`);
        });
        const responses = await Promise.all(requests);
        serverData.value = responses.map(response => response.data);
      } catch (error) {
        console.error('Error fetching server status:', error);
        ElMessage.error('请求服务器状态失败！');
      } finally {
        loading.value = false;
        refreshing.value = false; // Reset refreshing state
      }
    };

    const getServerIcon = (data) => {
      return data.icon ? data.icon : defaultIcon;
    };

    const copyToClipboard = (host, port, index) => {
      const textToCopy = `${host}:${port}`;
      navigator.clipboard.writeText(textToCopy).then(() => {
        copySuccess.value[index] = true;
        ElMessage.success({
          message: '已复制到剪切板',
          offset: 500
        });

        setTimeout(() => {
          copySuccess.value[index] = false;
        }, 3000);
      }).catch(err => {
        ElMessage.error({
          message: "复制出错了？",
          offset: 500
        });
        console.error('复制失败:', err);
      });
    };

    return {
      serverData,
      loading,
      copySuccess,
      refreshing, // Expose refreshing state
      showServerCountMessage, // Expose showServerCountMessage state
      fetchServerStatus,
      getServerIcon,
      copyToClipboard
    };
  }
};
</script>

<style scoped>
.server-item {
  flex-direction: column;
  display: flex;
  max-width: 80vw;
  margin-top: 10px;
  margin-bottom: 24px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  padding: 10px;
  background-color: var(--el-bg-color);
  box-shadow: 0 2px 1em 4px rgba(0, 0, 0, 0.43);
}

.copy-box {
  padding: 4px;
  width: 90%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.server-players {
  padding: 10px;
  color: #6AC8FE;
}

.server-players ol {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
  list-style: none;
  padding: 0;
}

.server-players li {
  display: flex;
  align-items: center;
}

.card {
  border: 0.5px solid rgba(0, 0, 0, 0.7);
  border-radius: 4px;
  background-color: var(--el-button-bg-color);
  cursor: pointer;
}

.card-hover:hover {
  background-color: rgba(255, 255, 255, 0.51);
}

.font-mono {
  font-family: 'JetBrains Mono', monospace;
  color: rgba(0, 0, 0, 0.66);
}

.header-left {
  display: flex;
  align-items: center;
  justify-content: center;
}

.server-status {
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  background-color: var(--el-bg-color);
  width: fit-content;
  margin: 20px auto;
  font-family: Arial, sans-serif;
  box-shadow: 0 0 1em 1px rgba(85, 166, 201, 0.3);
  overflow: hidden;
  box-sizing: border-box;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  padding-bottom: 8px;
  margin-bottom: 8px;
  width: 100%;
}

.server-address {
  color: rgb(110, 110, 110);
  font-size: 1.23em;
  font-weight: bolder;
}

.server-address.online {
  color: #008000;
}

.version-motd {
  text-align: -webkit-right;
  color: #55C97B;
}

.server-ipv4 {
  padding-top: 1em;
  font-size: 1em;
  font-weight: bold;
  font-family: "JetBrains Mono NL Thin", emoji;
  justify-content: center;
  text-align: -webkit-right;
  word-wrap: break-word;
  color: #ffffff;
  mix-blend-mode: difference;
}

.body {
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
}

.server-icon {
  width: 64px;
  height: 64px;
  border-radius: 8px;
  box-shadow: 0 0 8px 4px rgba(85, 166, 201, 0.47);
}

.server-info {
  width: 100%;
  flex-grow: 1;
  mix-blend-mode: difference;
  text-align: left;
  word-wrap: break-word;
}

.server-motd {
  font-size: 1.2em;
  color: #0089fb;
}

.player-count {
  font-size: 1em;
  color: rgb(0, 255, 177);
  text-align: right;
}
</style>