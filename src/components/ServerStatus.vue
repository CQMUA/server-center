<template>
  <p class="text-center demonstration">Card Vertical Layout</p>
  <el-carousel
      height="400px"
      direction="vertical"
      type="card"
      :autoplay="true"
  >
    <el-carousel-item v-for="server in servers" :key="server.id">
      <a :href="server.url" :title="server.title">
        <img :src="server.banner" :alt="server.title" width="60%" height="auto"/>
      </a>
    </el-carousel-item>
  </el-carousel>
</template>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>

<script setup lang="ts">
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
    title: 'complex',
    url: 'https://minecraftlist.com/servers/org.mc-complex.com',
    banner: 'https://minecraftlist.com/servers/org.mc-complex.com/banner@2x.jpg'
  }
];
</script>
