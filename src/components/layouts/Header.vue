<script lang="ts" setup>
import {toggleDark} from "~/composables";
import {
  Check,
  Connection,
  MagicStick,
  Monitor,
  Position,
  Select,
  Star,
  StarFilled,
  WindPower
} from "@element-plus/icons-vue";
</script>

<template>

  <el-menu class="el-menu-demo" mode="horizontal">
    <el-menu-item h="full" @click="toggleDark()" class="rm">
      <button
          class="border-none w-full bg-transparent cursor-pointer"
      >
        <i inline-flex i="dark:ep-moon ep-sunny"/>
      </button>
    </el-menu-item>

    <el-sub-menu index="2">
      <template #title>
        <el-icon color="green">
          <WindPower/>
        </el-icon>
        大项目
      </template>
      <el-menu-item index="2-1">像素大学城</el-menu-item>
      <el-menu-item index="2-2" disabled>联合生电服</el-menu-item>
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
        <el-link :icon="Select" href="#" target="_blank" onclick="true">CQMUA联合生存服（即将开放）
        </el-link>

      </el-menu-item>
      <el-menu-item index="3-2">
        <el-link :icon="Select" target="_blank" href="#" onclick="true">CQMUA联合大厅（即将开放）</el-link>
      </el-menu-item>
      <el-menu-item index="3-3">
        <el-link :icon="StarFilled" href="https://www.yuque.com/pguide/cymc/tp82a4okpfm8hycd" target="_blank">樱花随想（CYMC）
        </el-link>
      </el-menu-item>
    </el-sub-menu>

    <el-menu-item index="4">
      <el-link :icon="Check" href="https://skin.jntm.site/" target="_blank">CQMUA外置登录</el-link>
    </el-menu-item>


    <el-menu-item>
      <el-link :icon="MagicStick" href="https://skin.jntm.site" target="_blank">CQMUA用户中心</el-link>
    </el-menu-item>
    <el-menu-item>
      <el-link :icon="Position" href="https://www.mualliance.cn/server" target="_blank">MUA</el-link>
    </el-menu-item>

  </el-menu>

</template>

<style>
.rm {
  display: flex;
  margin-right: -10px;
}
</style>
