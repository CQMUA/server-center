<template>
  <div class="server-status">
    <StatusUpdate></StatusUpdate>
    <el-scrollbar max-height="368px" max-width="fit-content" :always=false>
      <div v-if="!servers || Object.keys(servers).length === 0" style="text-align: center">
        <p>这个学校或者好像没有服务器哦ovo！</p>
      </div>
      <div v-if="serverData.length">
        <div v-for="(data, index) in serverData" :key="index" class="server-item">
          <div class="header">
            <div class="header-left">
              <el-icon size="30" v-if="data.online" color="green">
                <CircleCheckFilled/>
              </el-icon>
              <el-icon size="30" v-else color="red">
                <CircleCloseFilled/>
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
                  :title="`在线玩家(${data.online ? data.players.online : 0} / ${data.online ? data.players.max : 0}) (正版UUID查询，仅供参考)`"
                  name="2">
                <div class="server-players" v-if="data.online">
                  <ol class="flex flex-wrap gap-2 mt-3 list-none">
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
import {ref, onMounted} from 'vue';
import axios from 'axios';
import defaultIcon from '../assets/bingo_cat.gif';
import {CircleCheckFilled, CircleCloseFilled, CopyDocument, Check} from "@element-plus/icons-vue";
import {ElMessage} from 'element-plus'; // Correct import

export default {
  components: {CopyDocument, Check, CircleCloseFilled, CircleCheckFilled},
  props: {
    servers: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const serverData = ref([]);
    const loading = ref(true);
    const copySuccess = ref({}); // Use ref for reactivity

    const fetchServerStatus = async () => {
      loading.value = true;
      try {
        const requests = Object.entries(props.servers).map(([name, address]) => {
          return axios.get(`https://api.mcstatus.io/v2/status/java/${address}`);
        });
        const responses = await Promise.all(requests);
        serverData.value = responses.map(response => response.data);
      } catch (error) {
        console.error('Error fetching server status:', error);
      } finally {
        loading.value = false;
      }
    };

    const getServerIcon = (data) => {
      return data.icon ? data.icon : defaultIcon;
    };

    const copyToClipboard = (host, port, index) => {
      const textToCopy = `${host}:${port}`;
      navigator.clipboard.writeText(textToCopy).then(() => {
        copySuccess.value[index] = true;
        ElMessage.success('地址已复制到剪切板！'); // Use ElMessage directly

        setTimeout(() => {
          copySuccess.value[index] = false; // Reset after 3 seconds
        }, 3000);
      }).catch(err => {
        console.error('复制失败:', err);
      });
    };

    onMounted(() => {
      fetchServerStatus(); // Initial request
    });

    return {
      serverData,
      loading,
      copySuccess,
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
  height: 90%; /* header的90% */
  display: flex;
  justify-content: center;
  align-items: center;
}

.server-players {
  padding: 10px;
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
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.21);
  cursor: pointer;
  mix-blend-mode: lighten;
}

.card-hover:hover {
  background-color: rgba(255, 255, 255, 0.51);
}

.font-mono {
  font-family: 'Courier New', monospace;
  color: #333;
}

.header-left {
  display: flex;
  align-items: center;
  justify-content: center;
}

.server-status {
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  padding: 4px;
  background-color: var(--el-bg-color);
  width: fit-content;
  margin: 20px auto;
  font-family: Arial, sans-serif;
  box-shadow: 0 0 1em 1px rgba(85, 166, 201, 0.3);
  overflow: hidden; /* 隐藏溢出内容 */
  box-sizing: border-box; /* 包含内边距和边框 */
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
  color: rgb(110, 110, 110); /* 默认颜色，表示网站不在线 */
  font-size: 1.4em;
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
