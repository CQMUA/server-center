<template>
  <div class="muaservers" @mouseover="hover = true" @mouseleave="hover = false">
    <!--    https://element-plus.org/zh-CN/component/popover.html-->
    <el-popover
        :popper-style="popoverStyle"
        trigger="click"
    >
      <template #reference>
        <transition name="fade" mode="out-in">
          <el-avatar
              :key="avatarKey"
              :size="60"
              :src="showAvatar ? currentServerInfo.avatar : currentServerInfo.avatar_university"
          />
        </transition>
      </template>
      <template #default>
        <div class="demo-rich-content"
             style="display: flex; justify-content: center; gap: 16px; flex-direction: row;">
          <el-avatar
              fit="contain"
              :size="100"
              :src="currentServerInfo.avatar"
              style="margin-bottom: 8px"
          />
          <el-avatar
              fit="fill"
              :size="100"
              :src="currentServerInfo.avatar_university"
              style="margin-bottom: 8px"
          />
        </div>

        <div class="demo-rich-content"
             style="display: flex; gap: 16px; flex-direction: column; align-items: center; justify-content: center; text-align: center">
          <div>
            <p class="demo-rich-content__name"
               style="margin: 0; font-weight: 500; font-size: large">
              {{ currentServerInfo.name }}
            </p>
            <p class="demo-rich-content__mention"
               style="margin: 0; font-size: 14px; color: var(--el-color-info);">
              {{ currentServerInfo.community }}
            </p>
          </div>
          <p class="demo-rich-content__desc" style="margin: 0.5em">
            <el-link :icon="Link" type="info" :href="currentServerInfo.link" target="_blank">前往{{
                currentServerInfo.community
              }}
            </el-link>
          </p>
        </div>
        <el-divider>在线服务器状态</el-divider>
        <SingleSiteServer :servers="currentServerInfo.servers"></SingleSiteServer>

      </template>
    </el-popover>
  </div>
</template>


<script setup>
import {ref, defineProps, computed, onMounted, onUnmounted} from 'vue';
import {Link} from "@element-plus/icons-vue";

const props = defineProps({
  id: {
    type: String,
    required: true
  }
});

const currentServerInfo = computed(() => {
  return serverInfo.find(server => server.id === props.id) || {};
});

const showAvatar = ref(true);
const avatarKey = ref(0); // 用于触发过渡效果

const toggleAvatar = () => {
  showAvatar.value = !showAvatar.value;
  avatarKey.value++; // 改变 key 触发过渡
};

let intervalId;

onMounted(() => {
  intervalId = setInterval(toggleAvatar, 10000); // Avatar.isShow()切换周期[Animation Control]
});

onUnmounted(() => {
  clearInterval(intervalId); // 清理定时器
});


// 沟槽的适配前端
const popoverStyle = computed(() => {
  let width = window.innerWidth < 768 ? '98vw' : 'fit-content';
  return {
    width: width,
    maxWidth: '400px', // 最大600px
    opacity: 0.95,
    boxShadow: 'rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px',
    padding: '20px',
    backdropFilter: 'blur(10px)'
  };
});

// Update on window resize
const updatePopoverStyle = () => {
  popoverStyle.value.width = window.innerWidth < 768 ? '98vw' : 'fit-content';
};

onMounted(() => {
  window.addEventListener('resize', updatePopoverStyle);
});

// TODO: 1: 修改为本地存储logo; 2:使用SQLite存储数据

// 存储服务器信息的数组
const serverInfo = [
  {
    id: 'SJTU',
    name: '上海交通大学Minecraft社',
    community: 'SJMC',
    avatar: 'https://www.mualliance.cn/wp-content/uploads/2023/01/mcclub_%E9%80%8F%E6%98%8E%E8%83%8C%E6%99%AF-300x300.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/d/d5/SJTU_emblem.svg/400px-SJTU_emblem.svg.png',
    link: 'https://mc.sjtu.cn/',
    servers: {
      SJMC_HUB: 'hub.sjmc.club',
      SJMC_SMP: '\t1.19.sjmc.club',
      SJMC_SMP2: 'smp2.sjmc.club',
      Creative: 'creative.sjtu.cn',
      SJMC_BUILD: 'build.sjmc.club',
      SJRedStone: 'redstone.sjmc.club',
      MUA: 'lobby.mualliance.ltd'
    }
  },
  {
    id: 'NJU',
    name: '南京大学Minecraft社',
    community: 'NMO',
    avatar: 'https://www.mualliance.cn/wp-content/uploads/2023/01/b6b9c5d1b3f4e39978dd0d5e2949bb7953611c1b.jpg',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/f/fb/%E5%8D%97%E4%BA%AC%E5%A4%A7%E5%AD%A6%E6%A0%A1%E5%BE%BD.svg/360px-%E5%8D%97%E4%BA%AC%E5%A4%A7%E5%AD%A6%E6%A0%A1%E5%BE%BD.svg.png',
    link: 'https://www.nmo.net.cn/',
    servers: {
      Sevtech_Ages: 'mod1.nmo.net.cn:20481',
      Hypixel: 'hypixel.net',
      twoB2T: '2b2t.org',
      SMP2: 'smp2.sjmc.club',
      SEU_survival: 'mc.sjtu.cn:22626'
    }
  },
  {
    id: 'NPUCRAFT',
    name: '西北工业大学Minecraft创作协会',
    community: 'NPUCRAFT',
    avatar: 'https://www.mualliance.cn/wp-content/uploads/2023/01/600px-NPUcraft-300x291.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/a/ac/Northwestern_Polytechnical_University_badge.svg/420px-Northwestern_Polytechnical_University_badge.svg.png',
    link: 'https://community.npucraft.com/',
    servers: {
      GXUCraft: 'gxucraft.cn',
    }
  },
  {
    id: 'FDCRAFT',
    name: '复旦大学基岩社',
    community: 'FDCRAFT',
    avatar: 'https://www.mualliance.cn/wp-content/uploads/2023/04/%E5%A4%8D%E6%97%A6-300x300.jpg',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Fudan_University_Logo.svg/200px-Fudan_University_Logo.svg.png',
    link: 'https://fdcraft.github.io/',
    servers: {
      FDC: 'mc.fdc.jingyijun.xyz'
    }
  },
  {
    id: 'ZJUTMC',
    name: '浙江工业大学MC方块社',
    community: 'zjutmc',
    avatar: 'https://www.mualliance.cn/wp-content/uploads/2023/04/ZJUT_MC_LOGO_小图标-300x300.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/2/20/ZJUT_seal.svg/300px-ZJUT_seal.svg.png',
    link: 'https://zjutmc.club/',
    servers: {}
  },
  {
    id: 'BCL',
    name: '东南大学六朝松信标社',
    community: 'BCL',
    avatar: 'https://www.mualliance.cn/wp-content/uploads/2023/01/e0bedcf698b6720dc1b847b1d102859c9d568364.jpg',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/0/07/%E4%B8%9C%E5%8D%97%E5%A4%A7%E5%AD%A6logo.svg/400px-%E4%B8%9C%E5%8D%97%E5%A4%A7%E5%AD%A6logo.svg.png',
    link: 'https://www.mualliance.cn/archives/147',
    servers: {
      smp: 'smp.seu.littlehfox.top',
      mod: 'mod.seu.littlehfox.top',

    }
  },
  {
    id: 'DUTCRAFT',
    name: '大连理工大学Minecraft社',
    community: 'DUTCRAFT',
    avatar: 'https://www.mualliance.cn/wp-content/uploads/2023/04/%E5%A4%A7%E8%BF%9E%E7%90%86%E5%B7%A5.jpg',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/7/76/Dalian_University_of_Technology_logo.svg/400px-Dalian_University_of_Technology_logo.svg.png',
    link: 'https://mcweb.unsafe.top/',
    servers: {
      dggd: 'mc.outside.dlut.world:40066',
      IPV6: 'mc6.dlut.world:25568',
      IPV4: 'mc.outside.dlut.world:25568',
    }
  },
  {
    id: 'YSUMC',
    name: '燕山大学Minecraft学生同好者协会',
    community: 'YSUMC',
    avatar: 'https://www.mualliance.cn/wp-content/uploads/2023/04/%E9%B8%9F%E5%A4%A7%EF%BC%81.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/1/15/Yanshan_University_logo.svg/400px-Yanshan_University_logo.svg.png',
    link: 'https://www.ysumc.club/',
    servers: {},
  },
  {
    id: 'Amethyst-Craft',
    name: '同济大学Minecraft紫晶学生社',
    community: 'Amethyst Craft',
    avatar: 'https://www.mualliance.cn/wp-content/uploads/2023/10/%E5%BE%BD%E6%A0%87.jpg',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/f/f8/Tongji_University_Emblem.svg/400px-Tongji_University_Emblem.svg.png',
    link: 'https://www.tongji-mc.cn/',
    servers: {
      sdf: 'survival.tongji-mc.cn',
      mzf: 'survival.tongji-mc.cn',
      minigame: 'minigame.tongji-mc.cn',
      lhf: 'rbd.sitmc.club',
      mua: 'lobby.mualliance.ltd'
    },
  },
  {
    id: 'SDTBUcraft',
    name: '山东工商学院Minecraft煤炭社',
    community: 'SDTBUcraft',
    avatar: 'https://www.mualliance.cn/wp-content/uploads/2023/10/STDBUcraft-cyan-bg-w-300x300.png',
    avatar_university: 'https://img-ph-mirror.nosdn.127.net/qHzzfPZqvg16SPDMAQgdtw==/2189593843932474992.png',
    link: 'https://www.mualliance.cn/archives/463',
    servers: {}
  },
  {
    id: 'SJZUMC',
    name: '沈阳建筑大学筑方MC社',
    community: 'SJZUMC',
    avatar: 'https://www.mualliance.cn/wp-content/uploads/2023/05/沈阳建筑大学-1-300x300.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/8/87/%E6%B2%88%E9%98%B3%E5%BB%BA%E7%AD%91%E5%A4%A7%E5%AD%A6logo.png',
    link: 'https://www.mualliance.cn/archives/498',
    servers: {}
  },
  {
    id: 'SZTUMC',
    name: '深圳技术大学Minecraft社',
    community: 'SZTUMC',
    avatar: 'https://www.mualliance.cn/wp-content/uploads/2023/08/logov3-300x300.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/2/23/The_logo_of_SZTU.png',
    link: 'https://web.sztumc.top/',
    servers: {}
  },
  {
    id: 'SUESMC',
    name: '上海工程技术大学程园我的世界同好会',
    community: 'SUESMC',
    avatar: 'https://www.mualliance.cn/wp-content/uploads/2023/09/IMG_20230921_232209-300x300.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/3/30/Shanghai_University_Of_Engineering_Science.png',
    link: 'https://www.mualliance.cn/archives/577',
    servers: {}
  },
  {
    id: 'XAUATcraft',
    name: '西安建筑科技大学仙建世界协会',
    community: 'XAUATcraft',
    avatar: 'https://www.mualliance.cn/wp-content/uploads/2023/12/西安建筑科技大学-300x300.jpg',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/4/48/%E8%A5%BF%E5%AE%89%E5%BB%BA%E7%AD%91%E7%A7%91%E6%8A%80%E5%A4%A7%E5%AD%A6%E6%A0%A1%E5%BE%BD.jpg',
    link: 'https://www.xauatcraft.com/',
    servers: {
      main: 'play.xauatcraft.com',
    }
  },
  {
    id: 'XSUcraft',
    name: '西安石油大学烯煜工艺公社',
    community: 'XSUcraft',
    avatar: 'https://www.mualliance.cn/wp-content/uploads/2024/04/烯煜工艺终透明.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/c/cf/Xi%27an_Shiyou_University.jpg?20240326092124',
    link: 'https://www.mualliance.cn/archives/2363',
    servers: {}
  },
  {
    id: 'NCWUMC',
    name: '华北水利水电大学画梦方块社',
    community: 'NCWUMC',
    avatar: 'https://www.mualliance.cn/wp-content/uploads/2024/04/NCMCnormal外圈版本-300x300.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/4/4a/%E5%8D%8E%E5%8C%97%E6%B0%B4%E5%88%A9%E6%B0%B4%E7%94%B5%E5%A4%A7%E5%AD%A6%E6%A0%A1%E5%BE%BD.jpg',
    link: 'https://www.mualliance.cn/archives/587',
    servers: {}
  },
  {
    id: 'HDUART',
    name: '邯郸学院第九艺术游戏开发社',
    community: 'HDUART',
    avatar: 'https://www.mualliance.cn/wp-content/uploads/2024/04/邯郸学院.jpeg',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/9/9e/Handan_University_logo.jpg',
    link: 'https://www.mualliance.cn/archives/2323',
    servers: {}
  },
  {
    id: 'ZJUT_MINECRAFT',
    name: '中国矿业大学（北京）Minecraft社',
    community: 'ZJUT_MINECRAFT',
    avatar: 'https://www.mualliance.cn/wp-content/uploads/2024/03/c579a9ff597cb636dcd7c10842531653-300x300.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/f/fa/CUMT_logo.jpg',
    link: 'https://www.mualliance.cn/wp-content/uploads/2024/03/c579a9ff597cb636dcd7c10842531653-300x300.png',
    servers: {}
  },
  {
    id: 'SWPUMC',
    name: '西南石油大学Minecraft萤石社',
    community: 'SWPUMC',
    avatar: 'https://www.mualliance.cn/wp-content/uploads/2024/02/校徽mc-300x300.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/2/26/Southwest_Petroleum_University_logo.png',
    link: 'https://www.mualliance.cn/wp-content/uploads/2024/02/校徽mc-300x300.png',
    servers: {}
  },
  {
    id: 'CYMC',
    name: '重庆医科大学Minecraft组织',
    community: 'CYMC',
    avatar: "https://www.cqmu.online/wp-content/uploads/2024/10/%E4%B8%8B%E8%BD%BD__1_-removebg-preview.png",
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/e/e1/Chongqing_Medical_University_logo.svg/400px-Chongqing_Medical_University_logo.svg.png',
    link: 'https://www.cqmu.online',
    servers: {
      cqmua_main: 'mc.cqmua.cn',
      gz_test: 'gz.play.cymc.club',
      cd_node: 'cdp.play.cymc.club',
      sq_node: 'mc.cytouhou.top',
      mua_sc: 'sc.mua.cymc.club',
      mua_hb: 'hb.mua.cymc.club',
      mua_zj: 'zj.mua.cymc.club',
      mua_sh: 'sh.mua.cymc.club',
      mua_sx: 'sx.mua.cymc.club'
    }
  },
  {
    id: 'CQUcraft',
    name: '重庆大学服务器',
    community: 'CQUcraft',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/7/74/Chongqing_University_logo.svg/300px-Chongqing_University_logo.svg.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/7/74/Chongqing_University_logo.svg/300px-Chongqing_University_logo.svg.png',
    link: 'https://www.mualliance.cn/archives/1498',
    servers: {
      SMP: 'cqu.play.cqmua.cn',
      cqmua_main: 'mc.cqmua.cn',
    },
  },
  {
    id: 'SYUMC',
    name: '香港树仁大学Minecraft组织',
    community: 'SYUMC',
    avatar: 'https://www.mualliance.cn/wp-content/uploads/2024/01/84e9fc63fb77db2c9cadbec5a4f119c1-320x240.jpg',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/7/72/Hong_Kong_Shue_Yan_University_logo.svg/360px-Hong_Kong_Shue_Yan_University_logo.svg.png',
    link: 'https://mc.hksyu.com.cn/',
    servers: {},
  },
  {
    id: 'SD',
    name: '新疆大学服务器',
    community: 'ShinJ',
    avatar: 'https://www.mualliance.cn/wp-content/uploads/2023/05/%E6%96%B0%E7%96%86%E5%A4%A7%E5%AD%A6-360x240.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/4/4a/Xinjiang_University_logo.png',
    link: 'https://www.mualliance.cn/archives/527',
    servers: {},
  },
  {
    id: 'Cube of Posts',
    name: '西安邮电大学邮立方',
    community: 'Cube of Posts',
    avatar: 'https://p.qlogo.cn/gh/779877449/779877449/0/',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/3/35/%E8%A5%BF%E5%AE%89%E9%82%AE%E7%94%B5%E5%A4%A7%E5%AD%A6%E6%A0%87%E8%AF%86.jpg/300px-%E8%A5%BF%E5%AE%89%E9%82%AE%E7%94%B5%E5%A4%A7%E5%AD%A6%E6%A0%87%E8%AF%86.jpg',
    link: 'https://cop.cooo.site/',
    servers: {},
  },
  {
    id: 'XDUcraft',
    name: '西安电子科技大学服务器',
    community: 'XDUcraft',
    avatar: 'https://www.mualliance.cn/wp-content/uploads/2023/04/%E8%A5%BF%E5%AE%89%E7%94%B5%E5%AD%90%E7%A7%91%E6%8A%80%E5%A4%A7%E5%AD%A6-360x240.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/8/83/Xidian_University_Logo.svg/330px-Xidian_University_Logo.svg.png',
    link: 'https://www.mualliance.cn/archives/530',
    servers: {},
  },
  {
    id: 'XAUT',
    name: '西安理工大学服务器',
    community: '#',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/7/70/Xi%27an_University_of_Technology_logo.svg/300px-Xi%27an_University_of_Technology_logo.svg.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/7/70/Xi%27an_University_of_Technology_logo.svg/300px-Xi%27an_University_of_Technology_logo.svg.png',
    link: 'https://mualliance.cn/archives/530',
    servers: {},
  },
  {
    id: 'XJTUMC',
    name: '西安交通大学像素工坊',
    community: 'XJTUMC',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/e/e9/XJTU_emblem.svg/323px-XJTU_emblem.svg.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/e/e9/XJTU_emblem.svg/323px-XJTU_emblem.svg.png',
    link: 'https://www.mualliance.cn/archives/1559',
    servers: {},
  },
  {
    id: 'NWUcraft',
    name: '西北大学服务器',
    community: 'NWUcraft',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/2/26/Northwest_University_Logo.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/2/26/Northwest_University_Logo.png',
    link: 'https://skin.nwucraft.com/',
    servers: {},
  },
  {
    id: 'YNUMC',
    name: '云南大学Minecraft社区',
    community: 'YNUMC',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/c/ca/Yunnan_University_logo.svg/330px-Yunnan_University_logo.svg.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/c/ca/Yunnan_University_logo.svg/330px-Yunnan_University_logo.svg.png',
    link: 'https://www.mualliance.cn/archives/613',
    servers: {},
  },
  {
    id: 'SCNU',
    name: '四川农业大学Minecraft组织',
    community: 'SCNU',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/c/cf/Sichuan_Agricultural_University_logo.svg/300px-Sichuan_Agricultural_University_logo.svg.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/c/cf/Sichuan_Agricultural_University_logo.svg/300px-Sichuan_Agricultural_University_logo.svg.png',
    link: 'https://www.mualliance.cn/archives/2399',
    servers: {},
  },
  {
    id: 'Asyncraft',
    name: '成信大异步实验室Asyncraft社区',
    community: 'Asyncraft',
    avatar: 'https://www.mualliance.cn/wp-content/uploads/2024/03/c18dd088b46106cb9c3d8c62c7e6644b-360x240.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/9/94/Chengdu_University_of_Information_Technology_Logo.jpg/300px-Chengdu_University_of_Information_Technology_Logo.jpg',
    link: 'https://www.asyncraft.club/',
    servers: {},
  },
  {
    id: 'SWYSTMC',
    name: '西南科技大学星空社',
    community: 'SWYSTMC',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/2/28/Southwest_University_of_Science_and_Technology_logo.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/2/28/Southwest_University_of_Science_and_Technology_logo.png',
    link: 'https://www.mualliance.cn/archives/1734',
    servers: {},
  },
  {
    id: 'CDTer',
    name: '成都理工大学Minecraft组织',
    community: 'CDTer',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/c/c8/Chengdu_University_of_Technology_logo.svg/315px-Chengdu_University_of_Technology_logo.svg.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/c/c8/Chengdu_University_of_Technology_logo.svg/315px-Chengdu_University_of_Technology_logo.svg.png',
    link: 'https://www.mualliance.cn/archives/601',
    servers: {},
  },
  {
    id: 'Minecraft UESTC Community',
    name: '电子科技大学MC社区',
    community: 'Minecraft UESTC Community',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/1/15/University_of_Electronic_Science_and_Technology_of_China_Logo.svg/300px-University_of_Electronic_Science_and_Technology_of_China_Logo.svg.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/1/15/University_of_Electronic_Science_and_Technology_of_China_Logo.svg/300px-University_of_Electronic_Science_and_Technology_of_China_Logo.svg.png',
    link: 'https://www.mualliance.cn/archives/1566',
    servers: {},
  },
  {
    id: 'XNJUMC',
    name: '西南交通大学服务器',
    community: 'XNJUMC',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/d/dd/SWJTU_shield.svg/270px-SWJTU_shield.svg.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/d/dd/SWJTU_shield.svg/270px-SWJTU_shield.svg.png',
    link: 'https://www.mualliance.cn/archives/1128',
    servers: {},
  },
  {
    id: 'GLHTMC',
    name: '桂林航天工业学院Minecraft同好会',
    community: 'GLHTMC',
    avatar: 'https://www.mualliance.cn/wp-content/uploads/2024/02/log%E5%A4%A7%E5%9B%BE-360x240.jpg',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/4/43/GUAT_seal.svg/300px-GUAT_seal.svg.png',
    link: 'https://www.mualliance.cn/archives/2222',
    servers: {},
  },
  {
    id: 'GXUCraft',
    name: '广西大学Minecraft组织',
    community: 'GXUCraft',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/5/57/Guangxi_University_logo.jpg/300px-Guangxi_University_logo.jpg',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/5/57/Guangxi_University_logo.jpg/300px-Guangxi_University_logo.jpg',
    link: 'https://www.mualliance.cn/archives/802',
    servers: {},
  },
  {
    id: 'GDYSLMC',
    name: '广东以色列理工学院Minecraft团体',
    community: 'GDYSLMC',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/9/9b/Guangdong_Technion-Israel_Institute_of_Technology.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/9/9b/Guangdong_Technion-Israel_Institute_of_Technology.png',
    link: 'https://www.mualliance.cn/archives/1945',
    servers: {},
  },
  {
    id: '像素南科',
    name: '南科大矿工交流群',
    community: '像素南科',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/6/61/Southern_University_of_Science_and_Technology_logo.svg/330px-Southern_University_of_Science_and_Technology_logo.svg.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/6/61/Southern_University_of_Science_and_Technology_logo.svg/330px-Southern_University_of_Science_and_Technology_logo.svg.png',
    link: 'https://www.mualliance.cn/archives/1582',
    servers: {},
  },
  {
    id: 'SZIITcraft',
    name: '深圳信息职业技术学院服务器',
    community: 'SZIITcraft',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/e/ee/Log_of_SZIIT.jpg/300px-Log_of_SZIIT.jpg',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/e/ee/Log_of_SZIIT.jpg/300px-Log_of_SZIIT.jpg',
    link: 'https://www.mualliance.cn/archives/1022',
    servers: {},
  },
  {
    id: 'WYUMC',
    name: '五邑大学Minecraft组织',
    community: 'WYUMC',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/a/a1/Wuyi_University_Logo.png/270px-Wuyi_University_Logo.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/a/a1/Wuyi_University_Logo.png/270px-Wuyi_University_Logo.png',
    link: 'https://www.mualliance.cn/archives/2561',
    servers: {},
  },
  {
    id: 'ZHKU in Minecraft',
    name: '仲恺农业工程学院Minecraft组织',
    community: 'ZHKU in Minecraft',
    avatar: 'https://www.mualliance.cn/wp-content/uploads/2023/12/09534cf771fbab0b8d74d04f3eeef2d3-360x240.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/9/9b/Zhongkai_University_of_Agriculture_and_Engineering_Logo.png',
    link: 'https://www.mualliance.cn/archives/1886',
    servers: {},
  },
  {
    id: 'GZHHMC',
    name: '广州航海学院（广州交通大学）Minecraft服务器',
    community: 'GZHHMC',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/b/b0/Guangzhou_Maritime_University_logo.jpg/300px-Guangzhou_Maritime_University_logo.jpg',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/b/b0/Guangzhou_Maritime_University_logo.jpg/300px-Guangzhou_Maritime_University_logo.jpg',
    link: 'https://www.mualliance.cn/archives/1528',
    servers: {},
  },
  {
    id: 'SZUCRAFT',
    name: '深圳大学服务器',
    community: 'SZUCRAFT',
    avatar: 'https://www.mualliance.cn/wp-content/uploads/2023/05/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20230823022518-2-360x240.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/d/d7/Shenzhen_University_Logo.svg/300px-Shenzhen_University_Logo.svg.png',
    link: 'https://www.mualliance.cn/archives/563',
    servers: {},
  },
  {
    id: 'GPNUMCER',
    name: '广师方块爱好者',
    community: 'GPNUMCER',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/5/56/Guangdong_Polytechnic_Normal_University_Logo.png/270px-Guangdong_Polytechnic_Normal_University_Logo.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/5/56/Guangdong_Polytechnic_Normal_University_Logo.png/270px-Guangdong_Polytechnic_Normal_University_Logo.png',
    link: 'https://www.mualliance.cn/archives/1921',
    servers: {},
  },
  {
    id: 'GDPUMCER',
    name: '广药Amoxicillin方块社',
    community: 'GDPUMCER',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/6/60/Guangdong_Pharmaceutical_University_logo.jpg/300px-Guangdong_Pharmaceutical_University_logo.jpg',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/6/60/Guangdong_Pharmaceutical_University_logo.jpg/300px-Guangdong_Pharmaceutical_University_logo.jpg',
    link: 'https://www.mualliance.cn/archives/532',
    servers: {},
  },
  {
    id: 'GDHYUMC',
    name: '广东海洋大学Minecraft俱乐部',
    community: 'GDHYUMC',
    avatar: 'https://www.mualliance.cn/wp-content/uploads/2023/10/03423717f9a935d45055f0853ca6ab60-360x240.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/7/7e/Badge_of_Guangdong_Ocean_Univercity.svg/375px-Badge_of_Guangdong_Ocean_Univercity.svg.png',
    link: 'https://www.mualliance.cn/archives/1912',
    servers: {},
  },
  {
    id: '璃羽MC组',
    name: '华南农业大学Minecraft同好会',
    community: '璃羽MC组',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/b/ba/South_China_Agricultural_University_Logo.png/300px-South_China_Agricultural_University_Logo.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/b/ba/South_China_Agricultural_University_Logo.png/300px-South_China_Agricultural_University_Logo.png',
    link: 'https://www.mualliance.cn/archives/1215',
    servers: {},
  },
  {
    id: 'SCAE',
    name: '华南施工方舟帝国',
    community: 'SCAE',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/5/5e/South_China_University_of_Technology_Logo_%28Since_2022%29.svg/300px-South_China_University_of_Technology_Logo_%28Since_2022%29.svg.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/5/5e/South_China_University_of_Technology_Logo_%28Since_2022%29.svg/300px-South_China_University_of_Technology_Logo_%28Since_2022%29.svg.png',
    link: 'https://www.mualliance.cn/archives/573',
    servers: {},
  },
  {
    id: 'JNUcraft',
    name: '暨大MC方块社',
    community: 'JNUcraft',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/e/e6/Jinan_University_Logo.png/300px-Jinan_University_Logo.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/e/e6/Jinan_University_Logo.png/300px-Jinan_University_Logo.png',
    link: 'https://www.mualliance.cn/archives/1114',
    servers: {},
  },
  {
    id: 'DDMC',
    name: '中山大学逸仙学园Minecraft矿工同好会',
    community: 'DDMC',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/9/96/Sun_Yat-sen_Univ_Logo.svg/300px-Sun_Yat-sen_Univ_Logo.svg.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/9/96/Sun_Yat-sen_Univ_Logo.svg/300px-Sun_Yat-sen_Univ_Logo.svg.png',
    link: 'https://www.mualliance.cn/archives/517',
    servers: {},
  },
  {
    id: 'HNNU',
    name: '湖南师范大学HSMC社群',
    community: 'HSMC',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/d/d0/%E6%B9%96%E5%8D%97%E5%B8%AB%E7%AF%84%E5%A4%A7%E5%AD%B8%E6%A0%A1%E5%BE%BD.png/300px-%E6%B9%96%E5%8D%97%E5%B8%AB%E7%AF%84%E5%A4%A7%E5%AD%B8%E6%A0%A1%E5%BE%BD.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/d/d0/%E6%B9%96%E5%8D%97%E5%B8%AB%E7%AF%84%E5%A4%A7%E5%AD%B8%E6%A0%A1%E5%BE%BD.png/300px-%E6%B9%96%E5%8D%97%E5%B8%AB%E7%AF%84%E5%A4%A7%E5%AD%B8%E6%A0%A1%E5%BE%BD.png',
    link: 'https://www.mualliance.cn/archives/1120',
    servers: {},
  },
  {
    id: 'ZNLYKJUMC',
    name: '中南林业科技大学Minecraft组织',
    community: 'ZNLYKJUMC',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/f/f7/Central_South_University_of_Forestry_and_Technology_logo.png/300px-Central_South_University_of_Forestry_and_Technology_logo.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/f/f7/Central_South_University_of_Forestry_and_Technology_logo.png/300px-Central_South_University_of_Forestry_and_Technology_logo.png',
    link: 'https://www.mualliance.cn/archives/2459',
    servers: {},
  },
  {
    id: 'CSU-MC',
    name: '中南大学服务器',
    community: 'CSU-MC',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/a/af/%E4%B8%AD%E5%8D%97%E5%A4%A7%E5%AD%A6%E6%A0%A1%E5%BE%BD.svg/300px-%E4%B8%AD%E5%8D%97%E5%A4%A7%E5%AD%A6%E6%A0%A1%E5%BE%BD.svg.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/a/af/%E4%B8%AD%E5%8D%97%E5%A4%A7%E5%AD%A6%E6%A0%A1%E5%BE%BD.svg/300px-%E4%B8%AD%E5%8D%97%E5%A4%A7%E5%AD%A6%E6%A0%A1%E5%BE%BD.svg.png',
    link: 'https://www.mualliance.cn/archives/447',
    servers: {},
  },
  {
    id: 'PKUMC',
    name: 'PKUMinecraft同好会',
    community: 'PKUMC',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Peking_University_seal.svg/400px-Peking_University_seal.svg.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Peking_University_seal.svg/400px-Peking_University_seal.svg.png',
    link: 'https://www.mualliance.cn/archives/1190',
    servers: {},
  },
  {
    id: 'THUnion',
    name: '清华联盟工坊',
    community: 'THUnion',
    avatar: 'https://www.mualliance.cn/wp-content/uploads/2023/08/%E6%B8%85%E5%8D%8E-360x240.jpg',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Tsinghua_University_Logo.svg/400px-Tsinghua_University_Logo.svg.png',
    link: 'https://wiki.thunion.club/',
    servers: {},
  },
  {
    id: 'PKJUMC',
    name: '北京交通大学Minecraft组织',
    community: 'PKJUMC',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/3/3b/BJTU_emblem.svg/420px-BJTU_emblem.svg.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/3/3b/BJTU_emblem.svg/420px-BJTU_emblem.svg.png',
    link: 'https://www.mualliance.cn/archives/2609',
    servers: {},
  },
  {
    id: 'BJUTMC',
    name: '北京工业大学Minecraft同好会',
    community: 'BJUTMC',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/a/ac/Beijing_University_of_Technology.svg/400px-Beijing_University_of_Technology.svg.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/a/ac/Beijing_University_of_Technology.svg/400px-Beijing_University_of_Technology.svg.png',
    link: 'https://www.mualliance.cn/archives/982',
    servers: {},
  },
  {
    id: 'PKHKUMC',
    name: '北京航空航天大学服务器',
    community: 'PKHKUMC',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/a/a6/Beihang_University_Logo.svg/400px-Beihang_University_Logo.svg.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/a/a6/Beihang_University_Logo.svg/400px-Beihang_University_Logo.svg.png',
    link: 'https://www.mualliance.cn/archives/999',
    servers: {},
  },
  {
    id: 'PKLGUMC',
    name: '北京理工大学服务器',
    community: 'PKLGUMC',
    avatar: 'https://www.mualliance.cn/wp-content/uploads/2023/08/Bit_mc_logo-300x300.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/9/92/Beijing_Institute_of_Technology_Logo.svg/400px-Beijing_Institute_of_Technology_Logo.svg.png',
    link: 'https://www.mualliance.cn/archives/985',
    servers: {},
  },
  {
    id: 'PKKJUMC',
    name: '北京科技大学Minecraft组织',
    community: 'PKKJUMC',
    avatar: 'https://www.mualliance.cn/wp-content/uploads/2023/08/server-360x240.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/a/a5/University_of_Science_and_Technology_Beijing_logo.svg/420px-University_of_Science_and_Technology_Beijing_logo.svg.png',
    link: 'https://www.mualliance.cn/archives/1339',
    servers: {},
  },
  {
    id: 'PKYUMC',
    name: '北京邮电大学Straitia服务器',
    community: 'PKYUMC',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/b/bb/Emblem_of_Beijing_University_of_Posts_and_Telecommunications.svg/430px-Emblem_of_Beijing_University_of_Posts_and_Telecommunications.svg.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/b/bb/Emblem_of_Beijing_University_of_Posts_and_Telecommunications.svg/430px-Emblem_of_Beijing_University_of_Posts_and_Telecommunications.svg.png',
    link: 'https://www.mualliance.cn/archives/988',
    servers: {},
  },
  {
    id: 'CAUcraft',
    name: '中国农业大学',
    community: 'CAUcraft',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/0/07/CAU_Logo.svg/400px-CAU_Logo.svg.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/0/07/CAU_Logo.svg/400px-CAU_Logo.svg.png',
    link: 'https://www.mualliance.cn/archives/998',
    servers: {},
  },
  {
    id: 'PKLYUMC',
    name: '北京林业大学Minecraft组织',
    community: 'PKLYUMC',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/c/c0/Beijing_Forestry_University_logo_2021.svg/440px-Beijing_Forestry_University_logo_2021.svg.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/c/c0/Beijing_Forestry_University_logo_2021.svg/440px-Beijing_Forestry_University_logo_2021.svg.png',
    link: 'https://www.mualliance.cn/archives/2275',
    servers: {},
  },
  {
    id: 'MineCUC',
    name: '中国传媒大学Minecraft同好交流组织',
    community: 'MineCUC',
    avatar: 'https://www.mualliance.cn/wp-content/uploads/2024/03/e52be69e0b423c1baa7ee3458baa6052.jpg',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/8/87/Communication_university_of_China_logo.jpg',
    link: 'https://www.mualliance.cn/archives/2285',
    servers: {},
  },
  {
    id: 'ZYCJUMC',
    name: '中央财经大学Minecraft同好会',
    community: 'ZYCJUMC',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/d/dd/Central_University_of_Finance_and_Economics_logo.svg/400px-Central_University_of_Finance_and_Economics_logo.svg.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/d/dd/Central_University_of_Finance_and_Economics_logo.svg/400px-Central_University_of_Finance_and_Economics_logo.svg.png',
    link: 'https://www.mualliance.cn/archives/2296',
    servers: {},
  },
  {
    id: 'HBDLUMC',
    name: '华北电力大学Minecraft组织',
    community: 'HBDLUMC',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/7/72/%E5%8D%8E%E5%8C%97%E7%94%B5%E5%8A%9B%E5%A4%A7%E5%AD%A6%E6%A0%A1%E5%BE%BD.jpg',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/7/72/%E5%8D%8E%E5%8C%97%E7%94%B5%E5%8A%9B%E5%A4%A7%E5%AD%A6%E6%A0%A1%E5%BE%BD.jpg',
    link: 'https://www.mualliance.cn/archives/937',
    servers: {
      JYZF: 'mcbjbe.ncepu.club',
    },
  },
  {
    id: 'PKISUMC',
    name: '北京信息科技大学Minecraft社团',
    community: 'PKISUMC',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/d/d1/Beijing_Information_Science_%26_Technology_University_logo.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/d/d1/Beijing_Information_Science_%26_Technology_University_logo.png',
    link: 'https://www.mualliance.cn/archives/1358',
    servers: {},
  },
  {
    id: 'NKUMC',
    name: '南开大学Minecraft社区',
    community: 'NKUMC',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/8/8f/Seal_of_Nankai_University.svg/400px-Seal_of_Nankai_University.svg.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/8/8f/Seal_of_Nankai_University.svg/400px-Seal_of_Nankai_University.svg.png',
    link: 'https://www.mualliance.cn/archives/935',
    servers: {},
  },
  {
    id: 'TJUUS',
    name: '天津大学服务器',
    community: 'TJUUS',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/7/7f/Tianjin_University_logo.svg/400px-Tianjin_University_logo.svg.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/7/7f/Tianjin_University_logo.svg/400px-Tianjin_University_logo.svg.png',
    link: 'https://www.mualliance.cn/archives/1507',
    servers: {},
  },
  {
    id: 'CAUCraft',
    name: '中国民航大学服务器',
    community: 'CAUCraft',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/a/a6/Civil_Aviation_University_of_China_%28CAUC%29_badge.svg/430px-Civil_Aviation_University_of_China_%28CAUC%29_badge.svg.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/a/a6/Civil_Aviation_University_of_China_%28CAUC%29_badge.svg/430px-Civil_Aviation_University_of_China_%28CAUC%29_badge.svg.png',
    link: 'https://www.cauc.fun/',
    servers: {},
  },
  {
    id: 'HBGYUMC',
    name: '河北工业大学Minecraft组织',
    community: 'HBGYUMC',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/1/1b/Hebei_University_of_Technology_Badge.svg/400px-Hebei_University_of_Technology_Badge.svg.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/1/1b/Hebei_University_of_Technology_Badge.svg/400px-Hebei_University_of_Technology_Badge.svg.png',
    link: 'https://www.mualliance.cn/archives/2493',
    servers: {},
  },
  {
    id: 'HBLGUMC',
    name: '华北理工大学Minecraft组织',
    community: 'HBLGUMC',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/6/69/NCST_Logo_Since_2024.svg/400px-NCST_Logo_Since_2024.svg.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/6/69/NCST_Logo_Since_2024.svg/400px-NCST_Logo_Since_2024.svg.png',
    link: 'https://www.mualliance.cn/archives/1212',
    servers: {},
  },
  {
    id: 'CDYMC',
    name: '承医方块探险队',
    community: 'CDYMC',
    avatar: 'https://p3-sdbk2-media.byteimg.com/tos-cn-i-xv4ileqgde/2b639d197e524f3e9a6ef59f29da11cb~tplv-xv4ileqgde-resize-w:360.awebp',
    avatar_university: 'https://p3-sdbk2-media.byteimg.com/tos-cn-i-xv4ileqgde/2b639d197e524f3e9a6ef59f29da11cb~tplv-xv4ileqgde-resize-w:360.awebp',
    link: 'https://www.mualliance.cn/archives/2495',
    servers: {},
  },
  {
    id: 'HBJRMC',
    name: '河北金融学院Minecraft组织',
    community: 'HBJRMC',
    avatar: 'https://www.hbfu.edu.cn/wwwfile/newsimg/20210817101100057.png',
    avatar_university: 'https://www.hbfu.edu.cn/wwwfile/newsimg/20210817101100057.png',
    link: 'https://www.mualliance.cn/archives/603',
    servers: {},
  },
  {
    id: 'YJLGMC',
    name: '燕京理工学院MC技术构建协会',
    community: 'YJLGMC',
    avatar: 'https://img.gaoxiaojob.com/uploads/company_logo/20220304181004_17657.jpg',
    avatar_university: 'https://img.gaoxiaojob.com/uploads/company_logo/20220304181004_17657.jpg',
    link: 'https://www.mualliance.cn/archives/2520',
    servers: {},
  },
  {
    id: 'TYLGUMC',
    name: '太原理工大学呆梨服',
    community: 'TYLGUMC',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/3/33/Taiyuan_University_of_Technology_Logo.svg/400px-Taiyuan_University_of_Technology_Logo.svg.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/3/33/Taiyuan_University_of_Technology_Logo.svg/400px-Taiyuan_University_of_Technology_Logo.svg.png',
    link: 'https://www.mualliance.cn/archives/1513',
    servers: {},
  },
  {
    id: 'JZXYMC',
    name: '晋中学院MC建筑社（非官方）',
    community: 'JZXYMC',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/6/66/Jinzhong_University_logo.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/6/66/Jinzhong_University_logo.png',
    link: 'https://www.mualliance.cn/archives/1651',
    servers: {},
  },
  {
    id: 'IMUcraft-方块内大',
    name: '内蒙古大学似社非社Minecraft分部',
    community: 'IMUcraft-方块内大',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/6/69/Inner_Mongolia_University_logo.svg/400px-Inner_Mongolia_University_logo.svg.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/6/69/Inner_Mongolia_University_logo.svg/400px-Inner_Mongolia_University_logo.svg.png',
    link: 'https://www.imucraft.cn/',
    servers: {},
  },
  {
    id: 'LNUCraft',
    name: '辽宁大学Minecraft同好者协会',
    community: 'LNUCraft',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/1/14/Liaoning_University_logo.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/1/14/Liaoning_University_logo.png',
    link: 'https://www.mualliance.cn/archives/1009',
    servers: {},
  },
  {
    id: 'NEUMC',
    name: '东北大学Minecraft组织',
    community: 'NEUMC',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/f/f4/Northeastern_University_%28China%29_logo.svg/400px-Northeastern_University_%28China%29_logo.svg.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/f/f4/Northeastern_University_%28China%29_logo.svg/400px-Northeastern_University_%28China%29_logo.svg.png',
    link: 'https://www.mualliance.cn/archives/2392',
    servers: {},
  },
  {
    id: 'DLJTUMC',
    name: '大连交通大学大海啸MC服务器',
    community: 'DLJTUMC',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/c/ce/Logo_of_Dalian_Jiaotong_University.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/c/ce/Logo_of_Dalian_Jiaotong_University.png',
    link: 'https://mc.bobby.com.cn/',
    servers: {},
  },

  {
    id: 'DLUMC',
    name: '大连大学服务器',
    community: 'DLUMC',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/f/f2/Dalian_University.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/f/f2/Dalian_University.png',
    link: 'https://www.mualliance.cn/archives/1025',
    servers: {},
  },
  {
    id: 'NEUMCf',
    name: '东北大学秦皇岛分校minecraft同好会',
    community: 'NEUMCf',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/f/f4/Northeastern_University_%28China%29_logo.svg/400px-Northeastern_University_%28China%29_logo.svg.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/f/f4/Northeastern_University_%28China%29_logo.svg/400px-Northeastern_University_%28China%29_logo.svg.png',
    link: 'https://www.mualliance.cn/archives/2054',
    servers: {},
  },
  {
    id: 'JLUCraft',
    name: '吉林大学Minccraft同好会',
    community: 'JLUCraft',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/d/dd/Jilin_University_Logo.svg/400px-Jilin_University_Logo.svg.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/d/dd/Jilin_University_Logo.svg/400px-Jilin_University_Logo.svg.png',
    link: 'https://www.mualliance.cn/archives/1029',
    servers: {},
  },
  {
    id: 'CCZYYUMC',
    name: '长春中医药大学MC组织',
    community: 'CCZYYUMC',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/5/55/Changchun_University_of_Chinese_Medicine_logo.jpg',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/5/55/Changchun_University_of_Chinese_Medicine_logo.jpg',
    link: 'https://www.mualliance.cn/archives/1648',
    servers: {},
  },
  {
    id: 'HITMC',
    name: '哈尔滨工业大学服务器',
    community: 'HITMC',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/4/46/Harbin_Institute_of_Technology_logo.svg/440px-Harbin_Institute_of_Technology_logo.svg.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/4/46/Harbin_Institute_of_Technology_logo.svg/440px-Harbin_Institute_of_Technology_logo.svg.png',
    link: 'https://onesmp.org/',
    servers: {},
  },
  {
    id: 'HEUcraft',
    name: '哈尔滨工程大学Minecraft协会',
    community: 'HEUcraft',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/2/27/Harbin_Engineering_University_logo.svg/440px-Harbin_Engineering_University_logo.svg.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/2/27/Harbin_Engineering_University_logo.svg/440px-Harbin_Engineering_University_logo.svg.png',
    link: 'https://www.mualliance.cn/archives/784',
    servers: {},
  },
  {
    id: 'HDLGUMC',
    name: '华东理工大学方块乐享部',
    community: 'HDLGUMC',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/2/2a/ECUST_New_Logo.svg/400px-ECUST_New_Logo.svg.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/2/2a/ECUST_New_Logo.svg/400px-ECUST_New_Logo.svg.png',
    link: 'https://www.mualliance.cn/archives/2304',
    servers: {},
  },
  {
    id: 'DHUcraft',
    name: '东华大学Minecraft组织',
    community: 'DHUcraft',
    avatar: 'https://www.dhu.edu.cn/_upload/article/images/d2/8c/2137ec0c44238fd6fbd3ee28ff07/f0954537-44ad-44dc-9aae-4799b6b96411.png',
    avatar_university: 'https://www.dhu.edu.cn/_upload/article/images/d2/8c/2137ec0c44238fd6fbd3ee28ff07/f0954537-44ad-44dc-9aae-4799b6b96411.png',
    link: 'https://www.mualliance.cn/archives/1172',
    servers: {},
  },
  {
    id: 'SkyMinecraft',
    name: '上海电力大学SkyMinecraft社',
    community: 'SkyMinecraft',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/3/3e/%E4%B8%8A%E6%B5%B7%E7%94%B5%E5%8A%9B%E5%A4%A7%E5%AD%A6logo.jpg',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/3/3e/%E4%B8%8A%E6%B5%B7%E7%94%B5%E5%8A%9B%E5%A4%A7%E5%AD%A6logo.jpg',
    link: 'https://www.mualliance.cn/archives/2472',
    servers: {},
  },
  {
    id: 'SIT-Minecraft',
    name: '上海应用技术大学Minecraft六角恐龙社群',
    community: 'SIT-Minecraft',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/1/19/Shanghai_Institute_Of_Technology_LOGO.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/1/19/Shanghai_Institute_Of_Technology_LOGO.png',
    link: 'https://www.mualliance.cn/archives/786',
    servers: {},
  },
  {
    id: 'SHHYUMC',
    name: '上海海洋大学Minecraft组织',
    community: 'SHHYUMC',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/3/3b/Shanghai_Ocean_University_logo.svg/400px-Shanghai_Ocean_University_logo.svg.png',
    avatar_university:'https://upload.wikimedia.org/wikipedia/zh/thumb/3/3b/Shanghai_Ocean_University_logo.svg/400px-Shanghai_Ocean_University_logo.svg.png',
    link: 'https://www.mualliance.cn/archives/2141',
    servers: {},
  },
  {
    id: 'HDSFUMC',
    name: '华东师范大学Minecraft服务器',
    community: 'HDSFUMC',
    avatar: 'https://www.mualliance.cn/wp-content/uploads/2023/09/857ce8056c20e14d5581cfa46e493790-360x240.jpg',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/d/db/ECNU_Emblem.svg/400px-ECNU_Emblem.svg.png',
    link: 'https://www.mualliance.cn/archives/1178',
    servers: {},
  },
  {
    id: 'SHTechCraft',
    name: '上海科技大学服务器',
    community: 'SHTechCraft',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/8/8f/Logo_of_ShanghaiTech_University.svg/400px-Logo_of_ShanghaiTech_University.svg.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/8/8f/Logo_of_ShanghaiTech_University.svg/400px-Logo_of_ShanghaiTech_University.svg.png',
    link: 'https://www.mualliance.cn/archives/1085',
    servers: {},
  },
  {
    id: 'SHGMMC',
    name: '上海工艺美术职业学院工美Minecraft社区',
    community: 'SHGMMC',
    avatar: 'https://zjxhszh.com/__local/B/D6/35/170D323BA6716B2400EE726C879_2915A8A6_269FD.png?e=.png',
    avatar_university: 'https://zjxhszh.com/__local/B/D6/35/170D323BA6716B2400EE726C879_2915A8A6_269FD.png?e=.png',
    link: 'https://www.mualliance.cn/archives/1858',
    servers: {},
  },
  {
    id: 'MCSUDA',
    name: '苏州大学Minecraft组织',
    community: 'MCSUDA',
    avatar: 'https://www.mualliance.cn/wp-content/uploads/2023/09/%E7%AC%AC%E4%BA%94%E7%89%88%EF%BC%88%E6%AD%A3%E5%BC%8F%E5%BE%BD%E7%AB%A0%EF%BC%89-360x240.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/4/41/Soochow_University1.svg/400px-Soochow_University1.svg.png',
    link: 'https://www.mualliance.cn/archives/1463',
    servers: {},
  },
  {
    id: 'NHUMC',
    name: '南航MC爱好者组织',
    community: 'NHUMC',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/2/2b/Nanjing_University_of_Aeronautics_and_Astronautics.svg/400px-Nanjing_University_of_Aeronautics_and_Astronautics.svg.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/2/2b/Nanjing_University_of_Aeronautics_and_Astronautics.svg/400px-Nanjing_University_of_Aeronautics_and_Astronautics.svg.png',
    link: 'https://www.mualliance.cn/archives/436',
    servers: {},
  },
  {
    id: 'NJLGUMC',
    name: '南京理工大学Minecraft组织',
    community: 'NJLGUMC',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/f/f7/Nust.svg/400px-Nust.svg.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/f/f7/Nust.svg/400px-Nust.svg.png',
    link: 'https://www.mualliance.cn/archives/619',
    servers: {},
  },
  {
    id: 'JSKJUMC',
    name: '江苏科技大学Minecraft讨论小组',
    community: 'JSKJUMC',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/a/a3/Jiangsu_University_of_Science_and_Technology_logo.svg/440px-Jiangsu_University_of_Science_and_Technology_logo.svg.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/a/a3/Jiangsu_University_of_Science_and_Technology_logo.svg/440px-Jiangsu_University_of_Science_and_Technology_logo.svg.png',
    link: 'https://www.mualliance.cn/archives/1939',
    servers: {},
  },
  {
    id: 'NJTU-MC',
    name: '南京工业大学服务器',
    community: 'NJTU-MC',
    avatar: 'https://www.mualliance.cn/wp-content/uploads/2023/04/NJTU-MC_Logo.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/5/5d/Nanjing_Tech_University_logo.png',
    link: 'https://www.mualliance.cn/archives/428',
    servers: {},
  },
  {
    id: 'NJUUMC',
    name: '南京邮电大学Minecraft组织',
    community: 'NJUUMC',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/4/44/Logo_of_NJUPT.svg/400px-Logo_of_NJUPT.svg.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/4/44/Logo_of_NJUPT.svg/400px-Logo_of_NJUPT.svg.png',
    link: 'https://www.mualliance.cn/archives/955',
    servers: {},
  },
  {
    id: 'HHUMC',
    name: '河海大学服务器',
    community: 'HHUMC',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/3/3f/Hohai_University_logo.svg/400px-Hohai_University_logo.svg.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/3/3f/Hohai_University_logo.svg/400px-Hohai_University_logo.svg.png',
    link: 'https://www.mualliance.cn/archives/525',
    servers: {},
  },
  {
    id: 'NJFUcraft',
    name: '南京林业大学像素工坊',
    community: 'NJFUcraft',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/1/19/Nanjing_Forestry_University_badge.svg/420px-Nanjing_Forestry_University_badge.svg.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/1/19/Nanjing_Forestry_University_badge.svg/420px-Nanjing_Forestry_University_badge.svg.png',
    link: 'https://www.mualliance.cn/archives/1087',
    servers: {},
  },
  {
    id: 'JSUMC',
    name: '江苏大学Minecraft同好会',
    community: 'JSUMC',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/2/25/Ujsbadge.jpg',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/2/25/Ujsbadge.jpg',
    link: 'https://www.mualliance.cn/archives/2394',
    servers: {},
  },
  {
    id: 'NUIST Craft',
    name: '信带工艺',
    community: 'NUIST Craft',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/a/a4/NUIST.svg/400px-NUIST.svg.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/a/a4/NUIST.svg/400px-NUIST.svg.png',
    link: 'https://www.nuistcraft.com/',
    servers: {},
  },
  {
    id: 'NJMUMC',
    name: '南京医科大学Minecraft组织',
    community:'NJMUMC',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/f/fa/Nanjing_Medical_University_logo.jpg',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/f/fa/Nanjing_Medical_University_logo.jpg',
    link: 'https://www.mualliance.cn/archives/2491',
    servers: {},
  },
  {
    id: 'XZMUMC',
    name: '徐州医科大学Minecraft组织',
    community: 'XZMUMC',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/3/37/Xuzhou_Medical_University_logo.jpg',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/3/37/Xuzhou_Medical_University_logo.jpg',
    link: 'https://www.mualliance.cn/archives/940',
    servers: {},
  },
  {
    id: 'ZGMUMC',
    name: '中国药科大学Minecraft我的世界交流群',
    community: 'ZGMUMC',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/9/96/China_Medical_University_Logo.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/9/96/China_Medical_University_Logo.png',
    link: 'https://www.mualliance.cn/archives/1951',
    servers: {},
  },
  {
    id: 'SteaMC',
    name: '方块动力(原南京师范大学服务器)',
    community: 'SteaMC',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/c/c1/Nanjing_Normal_University.svg/400px-Nanjing_Normal_University.svg.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/c/c1/Nanjing_Normal_University.svg/400px-Nanjing_Normal_University.svg.png',
    link: 'https://www.mualliance.cn/archives/445',
    servers: {},
  },
  {
    id: 'JSJGMC',
    name: '江苏警官学院Minecraft组织',
    community: 'JSJGMC',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/4/48/Jiangsu_Police_Institute_Logo_2018.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/4/48/Jiangsu_Police_Institute_Logo_2018.png',
    link: 'https://www.mualliance.cn/archives/2396',
    servers: {},
  },
  {
    id: 'SZKJUMC',
    name: '苏州科技大学Minecraft组织',
    community: 'SZKJUMC',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/8/8d/%E8%8B%8F%E5%B7%9E%E7%A7%91%E6%8A%80%E5%A4%A7%E5%AD%A6logo.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/8/8d/%E8%8B%8F%E5%B7%9E%E7%A7%91%E6%8A%80%E5%A4%A7%E5%AD%A6logo.png',
    link: 'https://www.mualliance.cn/archives/2360',
    servers: {},
  },
  {
    id: 'NJITmc',
    name: '南京工程学院联谊服',
    community: 'NJITmc',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/a/a8/Nanjing_Institute_of_Technology_logo.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/a/a8/Nanjing_Institute_of_Technology_logo.png',
    link: 'https://www.mualliance.cn/archives/1259',
    servers: {},
  },
  {
    id: 'BBS',
    name: '泰州学院Minecraft组织',
    community: 'BBS',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/3/35/LOGO_of_Taizhou_University.svg/400px-LOGO_of_Taizhou_University.svg.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/3/35/LOGO_of_Taizhou_University.svg/400px-LOGO_of_Taizhou_University.svg.png',
    link: 'https://www.mualliance.cn/archives/780',
    servers: {},
  },
  {
    id: 'mczju',
    name: '浙江大学服务器',
    community: 'mczju',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/1/16/Zhejiang_University_Logo.svg/400px-Zhejiang_University_Logo.svg.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/1/16/Zhejiang_University_Logo.svg/400px-Zhejiang_University_Logo.svg.png',
    link: 'https://www.mualliance.cn/archives/1097',
    servers: {},
  },
  {
    id: 'HDUcraft',
    name: '杭电HDG&Stars社团MC交流群',
    community: 'HDUcraft',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/8/85/HDU_seal.svg/400px-HDU_seal.svg.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/8/85/HDU_seal.svg/400px-HDU_seal.svg.png',
    link: 'https://www.mualliance.cn/archives/1622',
    servers: {},
  },
  {
    id: 'JXUMC',
    name: '嘉兴大学方块社',
    community: 'JXUMC',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/f/f0/Jiaxing_University_logo.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/f/f0/Jiaxing_University_logo.png',
    link: 'https://www.mualliance.cn/archives/2641',
    servers: {},
  },
  {
    id: 'ZJWEU Craft',
    name: '浙江水利水电学院非官方科技模组生存服务器',
    community: 'ZJWEU Craft',
    avatar: 'https://www.mualliance.cn/wp-content/uploads/2023/07/%E5%9B%BE%E7%89%87-30.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/6/6f/Zhejiang_University_of_Water_Resources_and_Electric_Power_logo.png',
    link: 'https://www.mualliance.cn/archives/585',
    servers: {},
  },
  {
    id: 'NBUCraft',
    name: '宁波大学服务器',
    community: 'NBUCraft',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/8/88/Ningbo_University_logo.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/8/88/Ningbo_University_logo.png',
    link: 'https://www.mualliance.cn/archives/569',
    servers: {},
  },
  {
    id: 'HBSFmc',
    name: '合肥工业大学空调MC服务器',
    community: 'HBSFmc',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/6/6d/Hefei_University_of_Technology_logo.svg/400px-Hefei_University_of_Technology_logo.svg.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/6/6d/Hefei_University_of_Technology_logo.svg/400px-Hefei_University_of_Technology_logo.svg.png',
    link: 'https://www.mualliance.cn/archives/457',
    servers: {},
  },
  {
    id: 'AHUTcraft',
    name: '安徽工业大学MC服务器',
    community: 'AHUTcraft',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/b/bd/Anhui_University_of_Technology.jpg',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/b/bd/Anhui_University_of_Technology.jpg',
    link: 'https://www.mualliance.cn/archives/782',
    servers: {},
  },
  {
    id: 'AHLGUMC',
    name: '方块安理会',
    community: 'AHLGUMC',
    avatar: 'https://www.mualliance.cn/wp-content/uploads/2023/05/%E5%AE%89%E5%BE%BD%E7%90%86%E5%B7%A5%E5%A4%A7%E5%AD%A6-1.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/8/87/AUST_logo.svg/400px-AUST_logo.svg.png',
    link: 'https://www.mualliance.cn/archives/589',
    servers: {},
  },
  {
    id: 'XMUMC',
    name: '厦门大学MC同好会',
    community: 'XMUMC',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Xiamen_University_logo.svg/400px-Xiamen_University_logo.svg.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Xiamen_University_logo.svg/400px-Xiamen_University_logo.svg.png',
    link: 'https://www.mualliance.cn/archives/1099',
    servers: {},
  },
  {
    id: 'HQUCraft',
    name: '华侨大学服务器',
    community: 'HQUCraft',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/e/e2/Huaqiao_University_logo.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/e/e2/Huaqiao_University_logo.png',
    link: 'https://www.mualliance.cn/archives/553',
    servers: {},
  },
  {
    id: 'FZU server',
    name: '福州大学福袋村',
    community: 'FZU server',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/c/c4/Fuzhou_University_logo.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/c/c4/Fuzhou_University_logo.png',
    link: 'https://www.mualliance.cn/archives/1381',
    servers: {},
  },
  {
    id: 'FJUTmincraft',
    name: '福建理工大学Minecraft组织',
    community: 'FJUTmincraft',
    avatar: 'https://www.mualliance.cn/wp-content/uploads/2023/12/2f363fbcdb2bef326b24c850b0dad7ef_0-360x240.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/c/ce/Fujian_University_of_Technology_logo.jpg',
    link: 'https://www.mualliance.cn/archives/2079',
    servers: {},
  },
  {
    id: 'FJSFUMC',
    name: '福建师范大学Minecraft组织',
    community: 'FJSFUMC',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/e/e9/Fujian_Normal_University_logo.svg/400px-Fujian_Normal_University_logo.svg.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/e/e9/Fujian_Normal_University_logo.svg/400px-Fujian_Normal_University_logo.svg.png',
    link: 'https://www.mualliance.cn/archives/2375',
    servers: {},
  },
  {
    id: 'JMUMC',
    name: '集美大学Minecraft组织',
    community: 'JMUMC',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/8/8a/Jimei_University_seal.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/8/8a/Jimei_University_seal.png',
    link: 'https://www.mualliance.cn/archives/2694',
    servers: {},
  },
  {
    id: 'XMJYUMC',
    name: '厦门大学嘉庚学院MC同好会',
    community: 'XMJYUMC',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/8/80/Xiamen_university_tan_kah_kee_college_badge.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/8/80/Xiamen_university_tan_kah_kee_college_badge.png',
    link: 'https://www.mualliance.cn/archives/2380',
    servers: {},
  },
  {
    id: 'FJSFXHMC',
    name: '福建师范大学协和学院Minecraft组织',
    community: 'FJSFXHMC',
    avatar: 'https://www.shanghairanking.cn/_uni/logo-jpg/1064567100.jpg',
    avatar_university: 'https://www.shanghairanking.cn/_uni/logo-jpg/1064567100.jpg',
    link: 'https://www.mualliance.cn/archives/2696',
    servers: {},
  },
  {
    id: 'FJJXMC',
    name: '福建江夏学院Minecraft组织',
    community: 'FJJXMC',
    avatar: '123.png',
    avatar_university: '/123.png',
    link: 'https://www.mualliance.cn/archives/2565',
    servers: {},
  },
  {
    id: 'NCUMC',
    name: '南昌大学Minecraft橡木社',
    community: 'NCUMC',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/6/6f/Nanchang_University_logo.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/6/6f/Nanchang_University_logo.png',
    link: 'https://www.mualliance.cn/archives/1255',
    servers: {},
  },
  {
    id: 'NonCraft',
    name: '江西农业大学Minecraft组织',
    community: 'NonCraft',
    avatar: 'https://www.mualliance.cn/wp-content/uploads/2023/07/%E6%97%A0%E6%A0%87%E9%A2%98-1-360x240.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/a/ae/Jiangxi_Agricultural_University.png',
    link: 'https://www.mualliance.cn/archives/789',
    servers: {},
  },
  {
    id: 'JXSFUMC',
    name: '江西师范大学时杰Minecraft部',
    community: 'JXSFUMC',
    avatar: 'https://www.mualliance.cn/wp-content/uploads/2023/08/logo-360x240.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/d/d0/Jiangxi_Normal_University_seal.svg/400px-Jiangxi_Normal_University_seal.svg.png',
    link: 'https://www.mualliance.cn/archives/1125',
    servers: {},
  },
  {
    id: 'MinecraftJUFE',
    name: '江西财经大学MinecraftJUFE团队',
    community: 'MinecraftJUFE',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/%E8%B4%A2%E5%A4%A7%E6%A0%87%E5%BF%97%2B.jpg/400px-%E8%B4%A2%E5%A4%A7%E6%A0%87%E5%BF%97%2B.jpg',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/%E8%B4%A2%E5%A4%A7%E6%A0%87%E5%BF%97%2B.jpg/400px-%E8%B4%A2%E5%A4%A7%E6%A0%87%E5%BF%97%2B.jpg',
    link: 'https://www.mualliance.cn/archives/595',
    servers: {},
  },
  {
    id: 'NCGCMC',
    name: '南昌工程学院Minecraft组织',
    community: 'NCGCMC',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/5/5b/Nanchang_Institute_of_Technology_logo.svg/400px-Nanchang_Institute_of_Technology_logo.svg.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/5/5b/Nanchang_Institute_of_Technology_logo.svg/400px-Nanchang_Institute_of_Technology_logo.svg.png',
    link: 'https://www.mualliance.cn/archives/1936',
    servers: {},
  },
  {
    id: 'JDZYSZYUMC',
    name: '景德镇艺术职业大学Minecraft组织',
    community: 'JDZYSZYUMC',
    avatar: 'https://static-data.gaokao.cn/upload/logo/2437.jpg',
    avatar_university: 'https://static-data.gaokao.cn/upload/logo/2437.jpg',
    link: 'https://www.mualliance.cn/archives/2474',
    servers: {},
  },
  {
    id: 'GZSFMC',
    name: '赣州师范高等专科学校MC方块人之家',
    community: 'GZSFMC',
    avatar: 'https://nqgames.my.canvasite.cn/gzsz/images/8168cf3535904b111a288168dd893b53.png',
    avatar_university: 'https://static-data.gaokao.cn/upload/logo/2885.jpg',
    link: 'https://nqgames.my.canvasite.cn/gzsz',
    servers: {},
  },
  {
    id: 'SDKJUMC',
    name: '山东科技大学服务器',
    community: 'SDKJUMC',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/f/f7/Shandong_University_of_Science_and_Technology_logo.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/f/f7/Shandong_University_of_Science_and_Technology_logo.png',
    link: 'https://www.mualliance.cn/archives/823',
    servers: {},
  },
  {
    id: 'ZGSYUMCHD',
    name: '中国石油大学（华东）Minecraft组织',
    community: 'ZGSYUMCHD',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/d/d5/China_University_Of_Petroleum_badge.svg/420px-China_University_Of_Petroleum_badge.svg.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/d/d5/China_University_Of_Petroleum_badge.svg/420px-China_University_Of_Petroleum_badge.svg.png',
    link: 'https://www.mualliance.cn/archives/2607',
    servers: {},
  },
  {
    id: 'QUSTMC',
    name: '青岛科技大学MC协会',
    community: 'QUSTMC',
    avatar: 'https://www.mualliance.cn/wp-content/uploads/2023/05/%E5%9B%BE%E7%89%87-9-300x300.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/6/6c/Qingdao_University_of_Science_and_Technology_logo.svg/400px-Qingdao_University_of_Science_and_Technology_logo.svg.png',
    link: 'https://www.mualliance.cn/archives/579',
    servers: {},
  },
  {
    id: 'SDJZUcraft',
    name: '山东建筑大学Minecraft服务器',
    community: 'SDJZUcraft',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/2/22/%E5%B1%B1%E4%B8%9C%E5%BB%BA%E7%AD%91%E5%A4%A7%E5%AD%A6%E6%A0%A1%E5%BE%BDlogo.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/2/22/%E5%B1%B1%E4%B8%9C%E5%BB%BA%E7%AD%91%E5%A4%A7%E5%AD%A6%E6%A0%A1%E5%BE%BDlogo.png',
    link: 'https://www.mualliance.cn/archives/597',
    servers: {},
  },
  {
    id: 'NHPCA',
    name: '齐鲁工业大学Minecraft群组服',
    community: 'NHPCA',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/6/64/Qilu_University_of_Technology_logo.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/6/64/Qilu_University_of_Technology_logo.png',
    link: 'https://www.mualliance.cn/archives/615',
    servers: {},
  },
  {
    id: 'SDAUpixel',
    name: '像素山农',
    community: 'SDAUpixel',
    avatar: 'https://www.mualliance.cn/wp-content/uploads/2024/03/SDAUpixelLOGO-2-308x240.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/c/c6/Shandong_Agricultural_University_logo.png',
    link: 'https://www.mualliance.cn/archives/2372',
    servers: {},
  },
  {
    id: 'DZMC',
    name: '德州学院MC爱好者组织',
    community: 'DZMC',
    avatar: 'https://www.dzu.edu.cn/images/index/logo.png',
    avatar_university: 'https://www.dzu.edu.cn/images/index/logo.png',
    link: 'https://www.mualliance.cn/archives/2082',
    servers: {},
  },
  {
    id: 'ZZUMC',
    name: '郑州大学Minecraft协会',
    community: 'ZZUMC',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/e/ed/Zhengzhou_University.svg/400px-Zhengzhou_University.svg.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/e/ed/Zhengzhou_University.svg/400px-Zhengzhou_University.svg.png',
    link: 'https://www.mualliance.cn/archives/2456',
    servers: {},
  },
  {
    id: 'HNLGUMC',
    name: '河南理工大学服务器',
    community: 'HNLGUMC',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/0/06/Henanligong.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/0/06/Henanligong.png',
    link: 'https://www.mualliance.cn/archives/571',
    servers: {},
  },
  {
    id: 'HNKJUMC',
    name: '河南科技大学Minecraft组织',
    community: 'HNKJUMC',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/2/25/Hnkejidx.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/2/25/Hnkejidx.png',
    link: 'https://www.mualliance.cn/archives/1057',
    servers: {},
  },
  {
    id: 'ZYGXYMC',
    name: '中原工学院Minecraft组织',
    community: 'ZYGXYMC',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/4/46/Zhongyuan_University_of_Technology.jpg',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/4/46/Zhongyuan_University_of_Technology.jpg',
    link: 'https://www.mualliance.cn/archives/2463',
    servers: {},
  },
  {
    id: 'HNUMC',
    name: '触角MC服务器（河南大学MC服务器）',
    community: 'HNUMC',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/a/a7/Henan_University_logo.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/a/a7/Henan_University_logo.png',
    link: 'https://www.mualliance.cn/archives/1225',
    servers: {},
  },
  {
    id: 'HNSFUMC',
    name: '河南师范大学终末社',
    community: 'HNSFUMC',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/e/ec/Henannormalun.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/e/ec/Henannormalun.png',
    link: 'https://www.mualliance.cn/archives/2504',
    servers: {},
  },
  {
    id: 'NYSFMC',
    name: '南阳师范学院MC部',
    community: 'NYSFMC',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/f/f8/Nanyang_Normal_University_logo.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/f/f8/Nanyang_Normal_University_logo.png',
    link: 'https://www.mualliance.cn/archives/2514',
    servers: {},
  },
  {
    id: 'SQSFMC',
    name: '商丘师范学院Minecraft组织',
    community: 'SQSFMC',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/8/84/Shangqiu_Normal_University.jpg',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/8/84/Shangqiu_Normal_University.jpg',
    link: 'https://www.mualliance.cn/archives/1395',
    servers: {},
  },
  {
    id: 'LYLGMC',
    name: '洛理MC协会',
    community: 'LYLGMC',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/f/ff/Luoyang_Institute_of_Science_and_Technology.jpg',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/f/ff/Luoyang_Institute_of_Science_and_Technology.jpg',
    link: 'https://www.mualliance.cn/archives/2461',
    servers: {},
  },
  {
    id: '珞珈MC',
    name: '武汉大学服务器/珞珈MC',
    community: '珞珈MC',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/0/01/WHU_Logo_2022Ver.svg/420px-WHU_Logo_2022Ver.svg.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/0/01/WHU_Logo_2022Ver.svg/420px-WHU_Logo_2022Ver.svg.png',
    link: 'https://www.mualliance.cn/archives/1103',
    servers: {},
  },
  {
    id: 'HUstone',
    name: '华中科技大学服务器',
    community: 'HUstone',
    avatar: 'https://www.mualliance.cn/wp-content/uploads/2023/04/%E5%8D%8E%E4%B8%AD%E7%A7%91%E6%8A%80%E5%A4%A7%E5%AD%A6-360x240.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/a/ab/Huazhong_University_of_Science_%26_Technology_logo.svg/460px-Huazhong_University_of_Science_%26_Technology_logo.svg.png',
    link: 'https://www.mualliance.cn/archives/422',
    servers: {},
  },
  {
    id: 'MCUG',
    name: '中国地质大学（武汉）服务器',
    community: 'MCUG',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/3/32/CUGW_seal.svg/400px-CUGW_seal.svg.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/3/32/CUGW_seal.svg/400px-CUGW_seal.svg.png',
    link: 'https://www.mualliance.cn/archives/1109',
    servers: {},
  },
  {
    id: 'WHUTcraft',
    name: '武汉理工大学服务器',
    community: 'WHUTcraft',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/6/6e/Wuhan_University_of_Technology_logo.svg/400px-Wuhan_University_of_Technology_logo.svg.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/6/6e/Wuhan_University_of_Technology_logo.svg/400px-Wuhan_University_of_Technology_logo.svg.png',
    link: 'https://www.mualliance.cn/archives/1111',
    servers: {},
  },
  {
    id: 'GFKJUMC',
    name: '国防科技大学服务器',
    community: 'GFKJUMC',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/7/7a/National_University_of_Defense_Technology_logo.svg/400px-National_University_of_Defense_Technology_logo.svg.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/7/7a/National_University_of_Defense_Technology_logo.svg/400px-National_University_of_Defense_Technology_logo.svg.png',
    link: 'https://www.mualliance.cn/archives/536',
    servers: {},
  },
  {
    id: 'ZNMZUMC',
    name: '中南民族大学服务器',
    community: 'ZNMZUMC',
    avatar: 'https://www.mualliance.cn/wp-content/uploads/2023/04/中南民族大学-360x240.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/a/a8/Scnu_logo.png',
    link: 'https://www.mualliance.cn/archives/454',
    servers: {},
  },
  {
    id: 'HBYYMC',
    name: '湖医方块生活',
    community: 'HBYYMC',
    avatar: 'https://www.hbmu.edu.cn/images/logo.png',
    avatar_university: 'https://www.hbmu.edu.cn/images/logo.png',
    link: 'https://www.mualliance.cn/archives/2528',
    servers: {},
  },
  {
    id: 'TaruCraft',
    name: '塔里木大学胡杨方块社',
    community: 'TaruCraft',
    avatar: 'https://www.mualliance.cn/wp-content/uploads/2023/08/logo-1.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/f/f8/Tarim_University_logo.jpg',
    link: 'https://www.tarucraft.club/',
    servers: {
      main: 'taru.mualliance.cn',
      mua: 'union.tarucraft.club'
    },
  },
  {
    id: 'SDUcraft',
    name: '山东大学学生Minecraft社团',
    community: 'SDUcraft',
    avatar: 'https://www.mualliance.cn/wp-content/uploads/2023/12/5d6034a85edf8db1cb1311832471ca54564e9358de80.webp',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/9/94/Shandong_University.jpg',
    link: 'https://www.mualliance.cn/archives/1101',
    servers: {},
  },
  {
    id: 'SMUNW',
    name: '上海海事大学沙盒创造社',
    community: 'SMU Night Walker',
    avatar: 'https://www.mualliance.cn/wp-content/uploads/2024/01/QQ%E5%9B%BE%E7%89%8720240102003253-e1704263682840.jpg',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/8/89/Shanghai_Maritime_University.svg/440px-Shanghai_Maritime_University.svg.png',
    link: 'https://8888.band/index.html',
    servers: {
      SMU: '24.221.43.171:9000',
    },
  },

  {
    id: 'QUSTMC',
    name: '青岛科技大学Minecraft协会',
    community: 'QUSTMC',
    avatar: 'https://www.mualliance.cn/wp-content/uploads/2023/05/%E5%9B%BE%E7%89%87-9.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/6/6c/Qingdao_University_of_Science_and_Technology_logo.svg/400px-Qingdao_University_of_Science_and_Technology_logo.svg.png',
    link: 'https://www.mualliance.cn/archives/579',
    servers: {},
  },

  {
    id: 'SWPUMC',
    name: '西南石油大学Minecraft萤石社',
    community: 'SWPUMC',
    avatar: '',
    avatar_university: '',
    link: '',
    servers: {},
  },

  {
    id: 'WBC',
    name: '温州商学院Minecraft社',
    community: 'swustmc',
    avatar: 'https://www.mualliance.cn/wp-content/uploads/2024/02/0cd46f661e72113c6b00c3b2964e9426.png',
    avatar_university: 'https://img.gaoxiaojob.com/uploads/company_logo/20220326144205_89206.jpg',
    link: 'https://www.mualliance.cn/archives/1816',
    servers: {
      main: 'play.swustmc.fun'
    },
  },
  {
    id: 'MineCUG',
    name: '中国地质大学（武汉）岩石纪元Minecraft社团',
    community: 'MineCUG',
    avatar: 'https://www.mualliance.cn/wp-content/uploads/2023/08/Image_1724322400705.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/3/32/CUGW_seal.svg/400px-CUGW_seal.svg.png',
    link: 'https://minecug.github.io/',
    servers: {},
  },
  {
    id: 'CubeSWU',
    name: '西南大学兰樟Minecraft组织',
    community: 'SWUMC',
    avatar: '/swu-logo.svg',
    avatar_university: '/swu-logo.svg',
    link: 'https://www.mualliance.cn/archives/2777',
    servers: {
      main: 'mc.cqmua.cn',
      mobile: 'play.swumc.top',
      unicom: 'direct.swumc.top',
    },
  },
  {
    id: 'CQUSTMC',
    name: '重庆科技大学Minecraft组织',
    community: 'CQUSTMC',
    avatar: '/CQUST.png',
    avatar_university: '/CQUST.png',
    link: 'https://www.mualliance.cn/archives/2328',
    servers: {
      mc: 'mc.xfywz.cn:25672',
      main: 'mc.cqmua.cn',
    },
  },
  // {
  //   id: '',
  //   name: '',
  //   community: '',
  //   avatar: '',
  //   avatar_university: '',
  //   link: '',
  //   servers: {},
  // },
  // {
  //   id: '',
  //   name: '',
  //   community: '',
  //   avatar: '',
  //   avatar_university: '',
  //   link: '',
  //   servers: {},
  // },
  // {
  //   id: '',
  //   name: '',
  //   community: '',
  //   avatar: '',
  //   avatar_university: '',
  //   link: '',
  //   servers: {},
  // },
  // {
  //   id: '',
  //   name: '',
  //   community: '',
  //   avatar: '',
  //   avatar_university: '',
  //   link: '',
  //   servers: {},
  // },


  // {
  //   id: 'PlaceHolder',
  //   name: '',
  //   community: 'MUA',
  //   avatar: '#',
  //   avatar_university: '',
  //   link: 'https://www.mualliance.cn/',
  //   servers: {
  //     Test: "demo.mcstatus.io"
  //   }
  // },
];
</script>

<style scoped>
.muaservers {
  opacity: 0.7;
  transition: opacity 0.4s ease, filter 0.4s ease;
  pointer-events: auto;
  overflow-x: hidden;
}

.muaservers:hover {

  filter: drop-shadow(0 0 3em #01ffea);
}

</style>