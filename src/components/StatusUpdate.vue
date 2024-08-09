<template>
<!--  <p>Background color always on</p>-->
<!--  <el-button plain>Plain</el-button>-->
<!--  <el-button type="primary" plain>Primary</el-button>-->
<!--  <el-button type="success" plain>Success</el-button>-->
<!--  <el-button type="info" plain>Info</el-button>-->
<!--  <el-button type="info" plain>Info</el-button>-->
<!--  <el-button type="info" plain>Info</el-button>-->
<!--  <el-button type="warning" plain>Warning</el-button>-->
<!--  <el-button type="danger" plain>Danger</el-button>-->


<!--  <p>Disabled text button</p>-->
<!--  <div>-->
<!--    <el-button-->
<!--        v-for="button in buttons"-->
<!--        :key="button.text"-->
<!--        :type="button.type"-->
<!--        text-->
<!--        disabled-->
<!--    >-->
<!--      {{ button.text }}-->
<!--    </el-button>-->
<!--  </div>-->


  <div>
    <el-button :icon="Search" circle />
    <el-button type="primary" :icon="Edit" circle />
    <el-button type="success" :icon="Check" circle />
    <el-button type="info" :icon="Message" circle />
    <el-button type="warning" :icon="Star" circle />
    <el-button type="danger" :icon="Delete" circle />
  </div>
</template>

<script setup lang="ts">
import {Check, Delete, Edit, Message, Search, Star} from "@element-plus/icons-vue";

const buttons = [
  { type: '', text: 'plain' },
  { type: 'primary', text: 'primary' },
  { type: 'success', text: 'success' },
  { type: 'info', text: 'info' },
  { type: 'warning', text: 'warning' },
  { type: 'danger', text: 'danger' },
] as const
</script>