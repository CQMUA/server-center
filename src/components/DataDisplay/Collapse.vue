<template>
  <div class="MUAServer-collapse">
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item title="在线玩家" name="1">
        <div>
          123
        </div>
        <div>
          321
        </div>
      </el-collapse-item>
      <el-collapse-item title="" name="2">
        <div>
          Operation feedback: enable the users to clearly perceive their
          operations by style updates and interactive effects;
        </div>
        <div>
          Visual feedback: reflect current state by updating or rearranging
          elements of the page.
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeName = ref('1')
</script>
