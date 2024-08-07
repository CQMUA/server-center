<template>
  <el-config-provider namespace="ep">
    <BaseHeader />
    <div class="flex main-container">
      <div w="full" py="4">
        <ServerStatus />

        <el-divider>
          <el-icon>
            <star-filled />
          </el-icon>
        </el-divider>

        <!-- Flex container for MUAServers -->
        <div class="muaservers-container">
          <MUAServers />
          <MUAServers />
          <MUAServers />
          <MUAServers />
          <MUAServers />
          <MUAServers />
          <MUAServers />
          <MUAServers />
          <MUAServers />
          <MUAServers />
          <MUAServers />
          <MUAServers />



        </div>

        <HelloWorld msg="CYMC 服务器中心(更新中，腐竹很懒ovo)" />
        <ServerStatistic />
        <Logos my="4" />
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

/* New styles for MUAServers container */
.muaservers-container {
  display: flex;
  gap: 16px; /* Space between MUAServers */
  justify-content: center; /* Center the items */
}
</style>
<script setup lang="ts">
</script>