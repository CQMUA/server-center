<template>
  <el-config-provider namespace="ep">
    <Header/>
    <div class="flex main-container">
      <div w="full" py="4">
<!--        <el-divider>CQMUA联合服务器</el-divider>-->
<!--        <CQMUAServers></CQMUAServers>-->
        <el-divider>CQMUA联盟高校</el-divider>
        <div class="muaservers-container">
          <MUAServers id="CQUcraft" class="muaservers-item delay-0"/>
          <MUAServers id="CYMC" class="muaservers-item delay-0"/>
          <MUAServers id="CubeSWU" class="muaservers-item delay-0"/>
          <MUAServers id="CQUSTMC" class="muaservers-item delay-0"/>
        </div>
        <CQMUAServers></CQMUAServers>
        <el-divider>MUA联盟高校</el-divider>
        <div class="muaservers-container">
          <template v-for="(server, index) in serverIds" :key="server">
            <MUAServers
                :id="server"
                :class="['muaservers-item', `delay-${index}`]"
                :style="{ animationDelay: `${delays[index]}s` }"
            />
          </template>
        </div>
      </div>
    </div>
    <Footer/>
  </el-config-provider>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import Header from './components/layouts/Header.vue';
import MUAServers from './components/MUAServers.vue';

const serverIds = [
  'NPUCRAFT', 'HDUART', 'SJTU', 'NJU', 'FDCRAFT', 'ZJUTMC', 'BCL', 'DUTCRAFT', 'YSUMC', 'Amethyst-Craft', 'TaruCraft', 'SDTBUcraft', 'SJZUMC', 'SZTUMC', 'SUESMC', 'SDUcraft', 'SMUNW', 'QUSTMC', 'XAUATcraft', 'XSUcraft', 'SWPUMC', 'WBC', 'ZJUT_MINECRAFT', 'NCWUMC', 'SWYSTMC', 'MineCUG', 'CYMC', 'CQUcraft', 'SD', 'Cube of Posts', 'XDUcraft', 'XJTUMC', 'NWUcraft', 'YNUMC', 'Asyncraft', 'SWYSTMC', 'CDTer', 'Minecraft UESTC Community', 'SZUCRAFT', 'GPNUMCER', 'GDPUMCER', '璃羽MC组', 'SCAE', 'JNUcraft', 'DDMC', 'HNNU', 'CSU-MC', 'SCNU', 'XNJUMC', 'GLHTMC', 'GDYSLMC', 'WYUMC', 'GZHHMC', 'GDHYUMC', 'ZNLYKJUMC', 'PKUMC', 'THUnion', 'PKJUMC', 'BJUTMC', 'PKHKUMC', 'PKLGUMC', 'PKKJUMC', 'PKYUMC', 'CAUcraft', 'PKLYUMC', 'MineCUC', 'ZYCJUMC', 'HBDLUMC', 'PKISUMC', 'NKUMC', 'TJUUS', 'CAUCraft', 'HBGYUMC', 'HBLGUMC', 'CDYMC', 'HBJRMC', 'YJLGMC', 'TYLGUMC', 'IMUcraft-方块内大', 'JZXYMC', 'LNUCraft', 'NEUMC', 'DLJTUMC', 'DLUMC', 'NEUMCf', 'JLUCraft', 'CCZYYUMC', 'HITMC', 'HEUcraft', 'HDLGUMC', 'DHUcraft', 'SkyMinecraft', 'SHHYUMC', 'SIT-Minecraft', 'SHTechCraft', 'SHGMMC', 'MCSUDA', 'NHUMC', 'NJLGUMC', 'JSKJUMC', 'NJTU-MC', 'NJUUMC', 'HHUMC', 'NJFUcraft', 'JSUMC', 'NJMUMC', 'NUIST Craft', 'XZMUMC', 'ZGMUMC', 'SteaMC', 'JSJGMC', 'SZKJUMC', 'NJITmc', 'BBS', 'mczju', 'HDUcraft', 'JXUMC', 'NBUCraft', 'ZJWEU Craft', 'AHLGUMC', 'AHUTcraft', 'HBSFmc', 'XMUMC', 'HQUCraft', 'FJUTmincraft', 'FZU server', 'FJSFUMC', 'JMUMC', 'XMJYUMC', 'FJSFXHMC', 'FJJXMC', 'NCUMC', 'NonCraft', 'JXSFUMC', 'MinecraftJUFE', 'NCGCMC', 'JDZYSZYUMC', 'GZSFMC', 'SDKJUMC', 'ZGSYUMCHD', 'QUSTMC', 'SDJZUcraft', 'NHPCA', 'DZMC', 'SDAUpixel', 'HNLGUMC', 'ZZUMC', 'HNKJUMC', 'ZYGXYMC', 'HNUMC', 'HNSFUMC', 'NYSFMC', 'SQSFMC', 'LYLGMC', '珞珈MC', 'HUstone', 'MCUG', 'WHUTcraft', 'GFKJUMC', 'ZNMZUMC', 'CubeSWU', 'CQUSTMC'
];

const dialogVisible = ref(false);

onMounted(() => {
  dialogVisible.value = true;
});

const delays = serverIds.map((_, index) => (3 / serverIds.length) * index);
</script>

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