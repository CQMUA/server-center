<template>
  <el-row>
    <el-col :span="8">
      <el-statistic :value="102">
        <template #title>
          <div style="display: inline-flex; align-items: center">
            <el-icon style="margin-right: 4px" :size="32" color="green">
              <OfficeBuilding />
            </el-icon>
            高校联盟
          </div>
        </template>
      </el-statistic>
    </el-col>
    <el-col :span="8">
      <el-statistic :value="138">
        <template #title>
          <div style="display: inline-flex; align-items: center">
            <el-icon style="margin-right: 4px" :size="32" color="pink">
              <Platform/>
            </el-icon>
            接入服务器
          </div>
        </template>
        <template #suffix>/100</template>
      </el-statistic>
    </el-col>
    <el-col :span="8">
      <el-statistic title="服务器数量" :value="562">
        <template #title>
          <div style="display: inline-flex; align-items: center">
            <el-icon style="margin-right: 4px" :size="32" color="red">
              <User/>
            </el-icon>
            在线人数
          </div>
        </template>
      </el-statistic>
    </el-col>

  </el-row>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import {useTransition} from '@vueuse/core'
import {OfficeBuilding, Platform, User} from '@element-plus/icons-vue'

const source = ref(0)
const outputValue = useTransition(source, {
  duration: 1500,
})

</script>

<style scoped>

</style>