<template>
  <el-config-provider namespace="ep">
    <BaseHeader/>
    <div class="flex main-container">
      <div w="full" py="4">

        <Logos my="4"/>
        <el-divider>
          这是分割线
        </el-divider>

        <div class="muaservers-container">
          <template v-for="server in serverIds" :key="server">
            <MUAServers :id="server" class="muaservers-item"/>
          </template>
        </div>

        <el-divider>
          这是分割线
        </el-divider>
        <HelloWorld msg="CYMC 服务器中心(更新中，腐竹很懒ovo)"/>
        <el-divider>
          这是分割线
        </el-divider>
        <ServerStatistic/>
        <el-divider>
          这是分割线
        </el-divider>
        <ServerStatus/>
      </div>
    </div>
  </el-config-provider>
</template>

<style>
#app {
  text-align: center;
}

.main-container {
  height: calc(100vh - 3px);
}

.muaservers-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  padding: 16px;
  transition: filter 0.3s;
}

.muaservers-item:hover {
  filter: drop-shadow(0 0 3em #55a6c9);
}
</style>

<script setup lang="ts">

const serverIds = [
  'SJTU',
  'NJU',
  'NPUCRAFT',
  'FDCRAFT',
  'ZJUTMC',
  'BCL',
  'DUTCRAFT',
  'CYMC',
  'SDTBUcraft',
  'SJZUMC',
  'SZTUMC',
  'SUESMC',
  'XAUATcraft',
  'XSUcraft',
  'NCWUMC',
  'HDUART',
  'ZJUT_MINECRAFT',
  'SWPUMC',

];
</script>
