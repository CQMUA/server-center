<template>
  <div class="muaservers">
    <el-popover :popper-style="popoverStyle" trigger="click">
      <!-- 触发区 -->
      <template #reference>
        <transition name="fade" mode="out-in">
          <el-avatar
              :key="avatarKey"
              :size="60"
              :src="avatarSrc"
          />
        </transition>
      </template>

      <!-- 弹窗内容 -->
      <div class="popover-content">
        <div class="avatar-row">
          <el-avatar fit="contain" :size="100" :src="currentServer.avatar" />
          <el-avatar fit="fill" :size="100" :src="currentServer.avatar_university" />
        </div>

        <div class="server-info">
          <div>
            <p class="server-name">{{ currentServer.name }}</p>
            <p class="server-community">{{ currentServer.community }}</p>
          </div>
          <el-link :icon="Link" type="info" :href="currentServer.link" target="_blank">
            前往{{ currentServer.community }}
          </el-link>
        </div>

        <el-divider>在线服务器状态</el-divider>
        <SingleSiteServer :servers="currentServer.servers" />
      </div>
    </el-popover>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { Link } from '@element-plus/icons-vue';
import serverData from './serverData.json';

const props = defineProps({
  id: { type: String, required: true }
});

const currentServer = computed(
    () => serverData.find(server => server.id === props.id) || {}
);

const showAvatar = ref(true);
const avatarKey = ref(0);
const avatarSrc = ref(''); // 当前显示的头像

// 初始化默认头像
onMounted(() => {
  avatarSrc.value = currentServer.value.avatar;
});

let intervalId = null;

// 切换头像时先预加载，等加载完成再切换
const toggleAvatar = () => {
  const newSrc = showAvatar.value
      ? currentServer.value.avatar_university
      : currentServer.value.avatar;

  const img = new Image();
  img.src = newSrc;

  img.onload = () => {
    avatarSrc.value = newSrc;
    showAvatar.value = !showAvatar.value;
    avatarKey.value++;
  };
};

// popover 自适应
const popoverStyle = ref(getPopoverStyle());
function getPopoverStyle() {
  return {
    width: window.innerWidth < 768 ? '98vw' : 'fit-content',
    maxWidth: '400px',
    opacity: 0.95,
    boxShadow: 'rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px',
    padding: '20px',
    backdropFilter: 'blur(10px)'
  };
}

onMounted(() => {
  intervalId = setInterval(toggleAvatar, 10000);
  window.addEventListener('resize', () => {
    popoverStyle.value = getPopoverStyle();
  });
});

onUnmounted(() => {
  clearInterval(intervalId);
  window.removeEventListener('resize', getPopoverStyle);
});
</script>

<style scoped>
.muaservers {
  opacity: 0.7;
  transition: opacity 0.4s ease, filter 0.4s ease;
}

.muaservers:hover {
  filter: drop-shadow(0 0 3em #01ffea);
}

/* 头像淡入淡出 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* 弹窗内容布局 */
.popover-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.avatar-row {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.server-info {
  text-align: center;
}

.server-name {
  margin: 0;
  font-weight: 500;
  font-size: large;
}

.server-community {
  margin: 0;
  font-size: 14px;
  color: var(--el-color-info);
}
</style>
