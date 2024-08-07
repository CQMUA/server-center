<template>
  <el-config-provider namespace="ep">
    <BaseHeader/>
    <div class="flex main-container">
      <!--      <BaseSide />-->
      <div w="full" py="4">
        <Logos my="4"/>
        <ServerStatistic></ServerStatistic>

                <ServerStatus></ServerStatus>
        <el-divider>
          <el-icon>
            <star-filled/>
          </el-icon>
        </el-divider>
        <MUAServers></MUAServers>
        <SingleSiteServer></SingleSiteServer>
        <HelloWorld msg="CYMC 服务器中心(更新中，腐竹很懒ovo)"/>
        <el-backtop :bottom="100" :visibility-height="20">
          <div
              style="
        height: 100%;
        width: 100%;
        background-color: var(--el-bg-color-overlay);
        box-shadow: var(--el-box-shadow-lighter);
        text-align: center;
        line-height: 40px;
        color: #1989fa;

      "
          >
            <el-icon size="24"><CaretTop /></el-icon>
          </div>
        </el-backtop>
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
</style>
<script setup lang="ts">
import {CaretTop, StarFilled} from '@element-plus/icons-vue'
import TopNavButton from "~/components/layouts/TopNavButton.vue";
</script>