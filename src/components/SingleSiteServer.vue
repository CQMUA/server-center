<template>
  <div class="server-status">
    <div v-if="serverData">
      <div class="header">
        <div class="header-left">
          <el-icon size="20" v-if="serverData.online" color="green">
            <CircleCheckFilled />
          </el-icon>
          <el-icon v-else color="red">
            <CircleCloseFilled />
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
            <img :src="serverIcon" alt="Server Icon" class="server-icon" />
          </el-col>
          <el-col :span="20">
            <el-col>
              <div class="server-info">
                <div class="server-motd" v-html="serverData.online ? serverData.motd.html : '服务器不在线，无法显示 MOTD'"></div>
              </div>
              <div class="server-ipv4">IPV4: {{ serverData.ip_address || '无可用 IP 地址' }}</div>
            </el-col>
          </el-col>
        </el-row>
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
import { CircleCheckFilled, CircleCloseFilled } from "@element-plus/icons-vue";

export default {
  components: { CircleCloseFilled, CircleCheckFilled },
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
        const response = await axios.get('https://api.mcstatus.io/v2/status/java/c.club');
        this.serverData = response.data;
      } catch (error) {
        console.error('Error fetching server status:', error);
      }
    },
  },
};
</script>

<style scoped>
.header-left {
  justify-content: center;
}

.server-status {
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  padding: 8px;
  background-color: var(--el-button-disabled-bg-color);
  max-width: 800px;
  margin: 20px auto;
  font-family: Arial, sans-serif;
  box-shadow: 0px 0px 1em 1px rgba(85, 166, 201, 0.25);
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
  font-weight: bold;
  margin-left: 0.8em;
  margin-right: 0.8em;
}

.server-ipv4 {
  font-size: 1.2em;
  font-weight: bold;
  font-family: "JetBrains Mono NL Thin", emoji;
  justify-content: center;
  margin-left: 1em;
}

.body {
  display: flex;
  align-items: center;
}

.server-icon {
  width: 64px;
  height: 64px;
  border-radius: 4px;
  margin-right: 16px;
}

.server-info {
  flex-grow: 1;
}

.server-motd {
  font-size: 1.2em;
  color: #0089fb;
}

.version-number {
  color: #f00;
}

.player-count {
  font-size: 1.2em;
  color: rgb(1, 255, 234);
  text-align: right;
}
</style>
