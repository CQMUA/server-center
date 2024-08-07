<template>
  <div class="muaservers" @mouseover="hover = true" @mouseleave="hover = false">
    <el-popover
        width="auto"
        popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
    >
      <template #reference>
        <el-avatar
            :size="60"
            src="https://www.mualliance.cn/wp-content/uploads/2023/01/mcclub_%E9%80%8F%E6%98%8E%E8%83%8C%E6%99%AF-300x300.png"
        />
      </template>
      <template #default>
        <div class="demo-rich-content" style="gap: 16px; flex-direction: row">
          <el-avatar
              :size="100"
              src="https://www.mualliance.cn/wp-content/uploads/2023/01/mcclub_%E9%80%8F%E6%98%8E%E8%83%8C%E6%99%AF-300x300.png"
              style="margin-bottom: 8px"
          />
          <el-avatar
              :size="100"
              src={{serverInfo[0].avatar}}
              style="margin-bottom: 8px"
          />
        </div>
        <div class="demo-rich-content" style="display: flex; gap: 16px; flex-direction: column; align-items: center;">
          <div>
            <p class="demo-rich-content__name" style="margin: 0; font-weight: 500;">
              {{ serverInfo[0].name }}
            </p>
            <p class="demo-rich-content__mention" style="margin: 0; font-size: 14px; color: var(--el-color-info)">
              {{ serverInfo[0].name }}-{{ serverInfo[0].community }}
            </p>
          </div>
          <p class="demo-rich-content__desc" style="margin: 0.5em">
            <el-link :icon="Link" href="" target="_blank">前往{{ serverInfo[0].community }}</el-link>
          </p>
          <el-divider></el-divider>
        </div>
      </template>
    </el-popover>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import {Link} from "@element-plus/icons-vue";

const serverInfo = ref([
  {
    id: 'SJTU',
    name: '上海交通大学',
    community: 'SJMC',
    avatar: 'https://www.mualliance.cn/wp-content/uploads/2023/01/mcclub_%E9%80%8F%E6%98%8E%E8%83%8C%E6%99%AF-300x300.png',
    link: 'https://mc.sjtu.cn/'
  }, {
    id: 'NJU',
    name: '南京大学',
    community: 'NJU',
    avatar: '',
    link: '',
  }
]);

const hover = ref(false);
</script>

<style scoped>
.muaservers {
  opacity: 0.5; /* Initial opacity */
  transition: opacity 0.3s ease; /* Smooth transition */
}

.muaservers:hover {
  opacity: 1; /* Full opacity on hover */
}
</style>
