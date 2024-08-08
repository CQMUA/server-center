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
          <template v-for="(server, index) in serverIds" :key="server">
            <MUAServers :id="server" :class="['muaservers-item', `delay-${index}`]"
                        :style="{ animationDelay: `${delays[index]}s` }"/>
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
  width: auto;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  backdrop-filter: blur(10px);
  border-radius: 8px;
  padding: 1em;
}

.muaservers-item {
  animation: fadeInOut 3s linear infinite; /* 应用动画 */
}

/* 定义动画 */
@keyframes fadeInOut {
  0% {
    opacity: 0.24;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.24;
  }
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

// 这里控制图标动画时长
const animationDuration = 4.2;
const delayIncrement = animationDuration / serverIds.length;

const delays = serverIds.map((_, index) => delayIncrement * index);
</script>

