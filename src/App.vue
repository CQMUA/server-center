<template>
  <el-config-provider namespace="ep">
    <BaseHeader />
    <div class="flex main-container">
<!--      <BaseSide />-->
      <div w="full" py="4">
        <Logos my="4" />
        <SingleSiteServer></SingleSiteServer>
        <HelloWorld msg="CYMC 服务器中心(更新中，腐竹很懒ovo)" />

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
</script>