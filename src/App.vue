<template>
  <el-config-provider namespace="ep">
    <Header/>
    <div class="flex main-container">
      <!--      <Side></Side>-->
      <div w="full" py="4">

        <FrontInfo msg="CYMC 服务器中心(更新中)"/>
        <!--        <Tabs></Tabs>-->
        <Logos my="4"/>
        <!--        <CYMCServerStatus></CYMCServerStatus>-->
        <el-divider>
          MUA联盟高校
        </el-divider>

        <div class="muaservers-container">
          <template v-for="(server, index) in serverIds" :key="server">
            <MUAServers
                :id="server"
                :class="['muaservers-item', `delay-${index}`]"
                :style="{ animationDelay: `${delays[index]}s` }"
            />
          </template>
        </div>

<!--        <el-divider>-->
<!--          这是分割线-->
<!--        </el-divider>-->

<!--        <el-divider>-->
<!--          这是分割线-->
<!--        </el-divider>-->

<!--        <ServerStatistic/>-->
<!--        <el-divider>-->
<!--          这是分割线-->
<!--        </el-divider>-->


<!--        <el-divider>-->
<!--          这是分割线-->
<!--        </el-divider>-->
<!--        <el-divider>-->
<!--          这是分割线-->
<!--        </el-divider>-->
<!--        <Footer></Footer>-->
      </div>
    </div>
  </el-config-provider>

</template>

<style>

.main-container {
  overflow-x: hidden;
  width: 100%;
}

body {
  overflow-x: hidden;
}

.muaservers-container {
  display: flex;
  width: auto;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  backdrop-filter: blur(10px);
  border-radius: 8px;
  padding-top: 1em;
  padding-bottom: 1em;
  padding-left: -2em;
  margin: 0.5em;
  background-color: rgba(255, 255, 255, 0.05);
}

.muaservers-item {
  animation: fadeInOut 10s linear infinite;
}

/* 定义动画 */
@keyframes fadeInOut {
  0% {
    opacity: 0.001;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.001;
  }
}
</style>

<script setup lang="ts">

// import Tabs from "~/components/Navigation/CommonTabs.vue";

const serverIds = [
  'SJTU',
  'NJU',
  'NPUCRAFT',
  'FDCRAFT',
  'ZJUTMC',
  'BCL',
  'DUTCRAFT',
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
  'CYMC',
  'CQUcraft',
  'SYUMC', // 香港树仁大学Minecraft组织
  'SD', // 新疆大学服务器
  'Cube of Posts',
  'XDUcraft',
  'XJTUMC',
  'NWUcraft',
  'YNUMC',
  'Asyncraft',
  'SWYSTMC',
  'CDTer',
  'Minecraft UESTC Community',
  'SZUCRAFT',
  'GPNUMCER',
  'GDPUMCER',
  '璃羽MC组',
  'SCAE',
  'JNUcraft',
  'DDMC',
  'HNNU',
  'CSU-MC',
  'SCNU',
  'XNJUMC',
  'GLHTMC',
  'GDYSLMC',
  'WYUMC',
  'GZHHMC',
  'GDHYUMC',
  'ZNLYKJUMC',
  'PKUMC',
  'THUnion',
  'PKJUMC',
  'BJUTMC',
  'PKHKUMC',
  'PKLGUMC',
  'PKKJUMC',
  'PKYUMC',
  'CAUcraft',
  'PKLYUMC',
  'MineCUC',
  'ZYCJUMC',
  'HBDLUMC',
  'PKISUMC',
  'NKUMC',
  'TJUUS',
  'CAUCraft',
  'HBGYUMC',
  'HBLGUMC',
  'CDYMC',
  'HBJRMC',
  'YJLGMC',

];


// 网站数据检测：https://vercel.com/multipledmes-projects/cymc-mc-servers/analytics
import {inject} from '@vercel/analytics';
// 网站访问检测：https://vercel.com/multipledmes-projects/cymc-mc-servers/speed-insights
// import { SpeedInsights } from '@vercel/speed-insights/vue';
inject();

// Optional: 可作为keyframe控制自动图标动画时长 [Feature]
const animationDuration = 3;
const delayIncrement = animationDuration / serverIds.length;

const delays = serverIds.map((_, index) => delayIncrement * index);
</script>
