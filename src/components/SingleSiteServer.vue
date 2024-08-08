<template>
  <div class="server-status">
    <div v-if="serverData">
      <div class="header">
        <div class="header-left">
          <el-icon size="20" v-if="serverData.online" color="green">
            <CircleCheckFilled/>
          </el-icon>
          <el-icon v-else color="red">
            <CircleCloseFilled/>
          </el-icon>
          <span class="server-address"> {{ serverData.host }} </span>
        </div>
        <div class="player-count" v-if="serverData.online">
          在线 {{ serverData.players.online }} / {{ serverData.players.max }}
        </div>
        <div v-else>
          <span class="player-count">服务器不在线</span>
        </div>
      </div>
      <div class="body">
        <el-row gutter="40">
          <el-col :span="4">
            <div style="justify-content: center; align-self: center">
              <img :src="serverIcon" alt="Server Icon" class="server-icon"/>
            </div>
          </el-col>
          <el-col :span="20">
            <el-col>
              <div class="server-info">
                <div class="server-motd"
                     v-html="serverData.online ? serverData.motd.html : '服务器不在线，无法显示服务器状态'"></div>
                <div class="version-motd"
                     v-html="serverData.online ? serverData.version.name_html : '服务器不在线，无法显示版本信息'"></div>
              </div>
              <div class="server-ipv4">IPV4: {{ serverData.ip_address || '无可用 IP 地址' }}</div>
            </el-col>
          </el-col>
        </el-row>
      </div>

      <div class="MUAServer-collapse">
        <el-collapse accordion>
          <el-collapse-item title="模组、插件" name="1">
            <div>
              <el-icon ></el-icon>
              模组：
            </div>
            <div>
              插件：
            </div>
          </el-collapse-item>
          <el-collapse-item title="在线玩家(正版UUID查询，仅供参考)" name="2">
            <div class="server-players" v-if="serverData.online">
              <ol class="flex flex-wrap gap-2 mt-3 list-none">
                <li v-for="player in serverData.players.list" :key="player.uuid">
                  <a :href="`https://minecraftuuid.com/?search=${player.uuid}`" rel="sponsored"
                     class="flex items-center gap-3 px-3 py-2 card card-hover">
                    <img loading="lazy"
                         width="24"
                         height="24"
                         decoding="async"
                         :src="`https://api.mineatar.io/head/${player.uuid}`"
                         style="color: transparent;"/>
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
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import defaultIcon from '../assets/bingo_cat.gif';
import {CircleCheckFilled, CircleCloseFilled} from "@element-plus/icons-vue";

export default {
  components: {CircleCloseFilled, CircleCheckFilled},
  data() {
    return {
      serverData: null,
    };
  },
  computed: {
    serverIcon() {
      return this.serverData && this.serverData.icon ? this.serverData.icon : defaultIcon;
    }
  },
  mounted() {
    this.fetchServerStatus();
  },
  methods: {
    async fetchServerStatus() {
      try {
        const response = await axios.get('https://api.mcstatus.io/v2/status/java/mua.suesmc.ltd');
        this.serverData = response.data;
      } catch (error) {
        console.error('Error fetching server status:', error);
      }
    },
  },
};
</script>

<style scoped>
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
  justify-content: center;
}

.server-status {
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  padding: 8px;
  background-color: var(--el-bg-color);
  max-width: 500px;
  margin: 20px auto;
  font-family: Arial, sans-serif;
  box-shadow: 0px 0px 1em 1px rgba(85, 166, 201, 0.3);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  padding-bottom: 8px;
  margin-bottom: 8px;
}

.server-address {
  font-size: 1.5em;
  font-weight: bolder;
  margin-left: 0.8em;
  margin-right: 0.8em;
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
  border-radius: 4px;
  margin-right: 16px;
  padding-top: 16px;
}

.server-info {
  flex-grow: 1;
  mix-blend-mode: difference;
  text-align: -webkit-left;
  word-wrap: break-word;
}

.server-motd {
  font-size: 1.2em;
  color: #0089fb;
}

.player-count {
  font-size: 1.2em;
  color: rgb(0, 255, 177);
  text-align: right;
}
</style>
