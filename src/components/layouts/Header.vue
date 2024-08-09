<script lang="ts" setup>
import {toggleDark} from "~/composables";
import {Check, Connection, MagicStick, Monitor, Position, Star, StarFilled} from "@element-plus/icons-vue";
</script>

<template>
  <el-menu class="el-menu-demo" mode="horizontal">
    <el-menu-item index="1">
      <el-link :icon="Position" href="https://www.mualliance.cn/server" target="_blank">MUA</el-link>
    </el-menu-item>

    <el-sub-menu index="2">
      <template #title>
        <el-icon color="green">
          <Monitor/>
        </el-icon>
        CYMC
      </template>
      <el-menu-item index="2-1">我的重医</el-menu-item>
      <el-menu-item index="2-2" disabled>生电服</el-menu-item>
      <el-menu-item index="2-3" disabled>樱花界</el-menu-item>
    </el-sub-menu>


    <el-sub-menu index="3">
      <template #title>
        <el-icon color="green">
          <Connection/>
        </el-icon>
        互通服
      </template>
      <el-menu-item index="3-1">
        <el-link :icon="Star" href="https://lobby.mualliance.ltd" target="_blank" disabled>MUA联合服</el-link>
      </el-menu-item>
      <el-menu-item index="3-2" disabled>荷兰PC2</el-menu-item>
      <el-menu-item index="3-3">
        <el-link :icon="StarFilled" href="https://hypixel.net/" target="_blank">Hypixel
        </el-link>
      </el-menu-item>
    </el-sub-menu>

    <el-menu-item index="4">
      <el-link :icon="Check" href="" target="_blank">外置登录</el-link>
    </el-menu-item>


    <el-menu-item index="5">
      <el-link :icon="MagicStick" href="https://skin.jntm.site" target="_blank">前往用户中心</el-link>
    </el-menu-item>
    <el-menu-item h="full" @click="toggleDark()" class="rm">
      <button
          class="border-none w-full bg-transparent cursor-pointer"
      >
        <i inline-flex i="dark:ep-moon ep-sunny"/>
      </button>
    </el-menu-item>
  </el-menu>

</template>

<style >
.rm {
  display: flex;
  margin-right: -10px;
}
</style>
