<script lang="ts" setup>
import {
  Connection,
  FolderChecked, Lock,
  MagicStick,
  Platform,
  Position,
  Select,
  WindPower,
  Close,
  Mouse
} from '@element-plus/icons-vue';
import {toggleDark} from "~/composables";
</script>

<template>
  <el-menu class="el-menu-demo" mode="horizontal">
    <img alt="skin web" src="/CQMUA-Logo-transp.png"/>
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
      <el-menu-item index="2-1">
        <el-link href="https://www.yuque.com/pguide/cqmua/kgpgp9k3el6n9etg" target="_blank">
          像素大学城
        </el-link>
      </el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="3">
      <template #title>
        <el-icon color="green">
          <Connection/>
        </el-icon>
        通行证互通服
      </template>
      <el-menu-item index="3-1">
        <el-link :icon="Close" href="https://www.yuque.com/pguide/cqmua/twwn635iq7te6pgp"
                 target="_blank" disabled>
          CQMUA联合生存服
        </el-link>
      </el-menu-item>
      <el-menu-item index="3-2">
        <el-link :icon="Close" target="_blank"
                 href="https://www.yuque.com/pguide/cqmua/cv05kucsg1pe7igz" disabled>
          CQMUA联合大厅
        </el-link>
      </el-menu-item>
      <el-menu-item index="3-3">
        <el-link :icon="Select" href="https://www.yuque.com/pguide/cqmua/twwn635iq7te6pgp"
                 target="_blank">
          CQMUA联合生电服
        </el-link>
      </el-menu-item>
      <el-menu-item index="3-4">
        <el-link :icon="Select" href="https://www.yuque.com/pguide/cqmua/twwn635iq7te6pgp"
                 target="_blank">
          CQMUA小游戏服
        </el-link>
      </el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="4">
      <template #title>
        <el-icon color="green">
          <Lock/>
        </el-icon>
        认证系统
      </template>
      <el-menu-item index="4-1">
        <el-link :icon="MagicStick" href="https://skin.cqmua.cn" target="_blank">
          CQMUA联合认证
        </el-link>
      </el-menu-item>
      <el-menu-item index="4-2">
        <el-link :icon="FolderChecked" href="https://p.cqmua.cn" target="_blank">CQMUA通行证
        </el-link>
      </el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="5">
      <template #title>
        <el-icon color="green">
          <Position/>
        </el-icon>
        友情链接
      </template>
      <el-menu-item index="5-1">
        <el-link :icon="Position" href="https://www.cqmua.cn" target="_blank">CQMUA官网</el-link>
      </el-menu-item>
      <el-menu-item index="5-2">
        <el-link :icon="Position" href="https://www.mualliance.cn/server" target="_blank">MUA官网
        </el-link>
      </el-menu-item>
      <el-menu-item>
        <el-link :icon="Platform" href="https://github.com/CQMUA" target="_blank">Github</el-link>
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="6">
      <template #title>
        <el-icon color="green">
          <Mouse/>
        </el-icon>
        自助开服
      </template>
      <el-menu-item index="6-1">
        <el-link :icon="Position" href="https://maap.macrodd.cn/" target="_blank">小游戏开服
        </el-link>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>

</template>

<style>
</style>