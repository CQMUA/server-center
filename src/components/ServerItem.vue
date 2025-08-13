<template>
  <div class="server-item">
    <div class="header">
      <el-icon size="30" v-if="data.online && !refreshing" color="green"><CircleCheckFilled/></el-icon>
      <el-icon size="30" v-else-if="!data.online && !refreshing" color="red"><CircleCloseFilled/></el-icon>
      <el-icon size="30" v-else-if="refreshing" color="orange"><Loading/></el-icon>

      <span :class="['server-address', { online: data.online }]">
        {{ data.host }}:{{ data.port }}
        <el-icon
            size="18"
            :style="{ cursor: data.online ? 'pointer' : 'not-allowed' }"
            @click="data.online && $emit('copy', data.host, data.port, index)"
        >
          <Check v-if="copySuccess" />
          <CopyDocument v-else />
        </el-icon>
      </span>
    </div>

    <div class="body">
      <img :src="data.icon || defaultIcon" alt="Server Icon" class="server-icon" />
      <div class="server-info">
        <div class="server-motd" v-html="data.online ? data.motd.html : '服务器不在线'"></div>
        <div class="version-motd" v-html="data.online ? data.version.name_html : '无版本信息'"></div>
      </div>
    </div>

    <el-collapse accordion>
      <el-collapse-item title="模组、插件" name="1">
        <p>模组：</p><p>插件：</p>
      </el-collapse-item>
      <el-collapse-item
          :title="`在线玩家(${data.online ? data.players.online : 0} / ${data.online ? data.players.max : 0})`"
          name="2"
      >
        <template v-if="data.online">
          <ol class="server-players">
            <li v-for="player in data.players.list" :key="player.uuid">
              <a :href="`https://minecraftuuid.com/?search=${player.uuid}`" target="_blank">
                <img :src="`https://api.mineatar.io/head/${player.uuid}`" width="24" height="24"/>
                <span v-html="player.name_html"></span>
              </a>
            </li>
          </ol>
        </template>
        <p v-else>服务器不在线</p>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import defaultIcon from '../assets/bingo_cat.gif';
import { CircleCheckFilled, CircleCloseFilled, CopyDocument, Check, Loading } from "@element-plus/icons-vue";

export default {
  props: {
    data: Object,
    refreshing: Boolean,
    copySuccess: Boolean,
    index: Number
  },
  components: { CircleCheckFilled, CircleCloseFilled, CopyDocument, Check, Loading },
  data() {
    return { defaultIcon };
  }
};
</script>

<style scoped>
.server-item {
  border: 1px solid rgba(0,0,0,0.3);
  border-radius: 8px;
  padding: 10px;
  margin: 10px 0;
  background: var(--el-bg-color);
}
.server-address.online { color: green; }
.server-icon {
  width: 64px; height: 64px;
  border-radius: 8px;
}
.server-players {
  display: flex; flex-wrap: wrap; gap: 8px; list-style: none; padding: 0;
}
</style>
