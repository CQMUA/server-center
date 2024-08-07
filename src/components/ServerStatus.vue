<template>
  <p class="text-center demonstration">当前在线服务器</p>
  <el-carousel
      :direction="isMobileOrTablet ? 'vertical' : 'horizontal'"
      type="card"
      :autoplay="true"
  >
    <el-carousel-item v-for="server in servers" :key="server.id">
      <a :href="server.url" :title="server.title" target="_blank">
        <img :src="server.banner" :alt="server.title" width="auto" height="auto"/>
      </a>
    </el-carousel-item>
  </el-carousel>
  <p>
    2024
    <el-link :icon="Position" type="primary" >项导工作室</el-link>
    版权所有
  </p>
</template>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

@media (max-width: 768px) {
  .el-carousel__item {
    height: 200px;
  }
}
</style>

<script setup lang="ts">
import { computed } from 'vue';
import {Position} from "@element-plus/icons-vue";

const servers = [
  {
    id: 1,
    title: 'Hypixel',
    url: 'https://minecraftlist.com/servers/hypixel.net',
    banner: 'https://minecraftlist.com/servers/hypixel.net/banner@2x.jpg'
  },
  {
    id: 2,
    title: 'CYMC',
    url: 'https://minecraftlist.com/servers/mc.cqmu.online',
    banner: 'https://minecraftlist.com/servers/mc.cqmu.online/banner@2x.jpg'
  },
  {
    id: 3,
    title: 'Cubecraft',
    url: 'https://minecraftlist.com/servers/cubecraft.net',
    banner: 'https://minecraftlist.com/servers/cubecraft.net/banner@2x.jpg'
  },
  {
    id: 4,
    title: 'Complex',
    url: 'https://minecraftlist.com/servers/org.mc-complex.com',
    banner: 'https://minecraftlist.com/servers/org.mc-complex.com/banner@2x.jpg'
  }
];

// Computed property to determine if the device is mobile or tablet
const isMobileOrTablet = computed(() => {
  return window.innerWidth <= 768; // Adjust the breakpoint as needed
});
</script>
