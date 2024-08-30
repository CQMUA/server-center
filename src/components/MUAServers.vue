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
        <el-divider>在线服务器</el-divider>
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
    avatar_university: 'https://img.sogoucdn.com/v2/thumb/crop/xy/ai/x/0/y/0/w/132/h/132/iw/30/ih/30/t/0/ir/3/retype_exclude_gif/ext/auto/q/80?t=2&appid=201115&url=https%3A%2F%2Fpic.baike.soso.com%2Fugc%2Fbaikepic2%2F6611%2Fcut-20210713155323-1750234654_jpg_427_536_36877.jpg%2F300',
    link: 'https://wiki.nmo.net.cn/',
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
    link: 'https://space.bilibili.com/1377901474',
    servers: {}
  },
  {
    id: 'DUTCRAFT',
    name: '大连理工大学Minecraft社',
    community: 'DUTCRAFT',
    avatar: 'https://www.mualliance.cn/wp-content/uploads/2023/04/%E5%A4%A7%E8%BF%9E%E7%90%86%E5%B7%A5.jpg',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/7/76/Dalian_University_of_Technology_logo.svg/400px-Dalian_University_of_Technology_logo.svg.png',
    link: 'https://mcweb.unsafe.top/',
    servers: {}
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
    servers: {}
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
    avatar: "https://www.mualliance.cn/wp-content/uploads/2024/06/cropped-cropped-logo-Photoroom-768x768.png",
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/e/e1/Chongqing_Medical_University_logo.svg/400px-Chongqing_Medical_University_logo.svg.png',
    link: 'https://www.cqmu.online',
    servers: {
      MYCQMU: 'mc.cqmu.online',
      Test: 's10.s100.vip:33860',
      Creative: 'dev.cqmu.online',
      HUB: 'hub.cqmu.online',
      MOD: 'mod.cqmu.online',
      MOD_TecH: 'tech.mod.cqmu.online',
      Cherry: "cherry.cqmu.online",
    }
  },
  //   模板文件
  {
    id: '**',
    name: '',
    community: '',
    avatar: '',
    avatar_university: '',
    link: '',
    servers: {},
  },
  {
    id: 'PlaceHolder',
    name: '',
    community: 'MUA',
    avatar: '#',
    avatar_university: '',
    link: 'https://www.mualliance.cn/',
    servers: {
      Test: "demo.mcstatus.io"
    }
  },
  {
    id: 'CQUcraft',
    name: '重庆大学服务器',
    community: 'CQUcraft',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/7/74/Chongqing_University_logo.svg/300px-Chongqing_University_logo.svg.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/7/74/Chongqing_University_logo.svg/300px-Chongqing_University_logo.svg.png',
    link: 'https://www.mualliance.cn/archives/1498',
    servers: {},
  },
  {
    id: 'SYUMC',
    name: '香港树仁大学Minecraft组织',
    community: 'SYUMC',
    avatar: 'https://www.mualliance.cn/wp-content/uploads/2024/01/84e9fc63fb77db2c9cadbec5a4f119c1-320x240.jpg',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/7/72/Hong_Kong_Shue_Yan_University_logo.svg/270px-Hong_Kong_Shue_Yan_University_logo.svg.png',
    link: 'http://mc.hksyu.com.cn/',
    servers: {},
  },
  {
    id: 'SYUMC',
    name: '新疆大学服务器',
    community: 'SYUMC',
    avatar: 'https://www.mualliance.cn/wiki/%E6%96%87%E4%BB%B6:XJUCraft-logo.jpg',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/4/4a/Xinjiang_University_logo.png',
    link: 'https://www.mualliance.cn/archives/527',
    servers: {},
  },
  {
    id: 'Cube of Posts',
    name: '西安邮电大学邮立方',
    community: 'Cube of Posts',
    avatar: 'http://p.qlogo.cn/gh/779877449/779877449/0/',
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
    id: '#',
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
    link: 'http://xn--ynumc-sz7hy31cx4tct7anyf2us.net/',
    servers: {},
  },
  {
    id: '#',
    name: '四川农业大学Minecraft组织',
    community: '#',
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
    avatar: '',
    avatar_university: '',
    link: 'https://www.swustmc.fun/',
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
    id: '#',
    name: '西南交通大学服务器',
    community: '#',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/d/dd/SWJTU_shield.svg/270px-SWJTU_shield.svg.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/d/dd/SWJTU_shield.svg/270px-SWJTU_shield.svg.png',
    link: 'https://discord.com/invite/t8SmMScF',
    servers: {},
  },
  {
    id: '#',
    name: '桂林航天工业学院Minecraft同好会',
    community: '#',
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
  }, {
    id: '#',
    name: '广东以色列理工学院Minecraft团体',
    community: '#',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/9/9b/Guangdong_Technion-Israel_Institute_of_Technology.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/9/9b/Guangdong_Technion-Israel_Institute_of_Technology.png',
    link: 'https://www.mualliance.cn/archives/1945',
    servers: {},
  }, {
    id: '像素南科',
    name: '南科大矿工交流群',
    community: '像素南科',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/6/61/Southern_University_of_Science_and_Technology_logo.svg/330px-Southern_University_of_Science_and_Technology_logo.svg.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/6/61/Southern_University_of_Science_and_Technology_logo.svg/330px-Southern_University_of_Science_and_Technology_logo.svg.png',
    link: 'https://www.mualliance.cn/archives/1582',
    servers: {},
  }, {
    id: 'SZIITcraft',
    name: '深圳信息职业技术学院服务器',
    community: 'SZIITcraft',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/e/ee/Log_of_SZIIT.jpg/300px-Log_of_SZIIT.jpg',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/e/ee/Log_of_SZIIT.jpg/300px-Log_of_SZIIT.jpg',
    link: 'https://www.mualliance.cn/archives/1022',
    servers: {},
  }, {
    id: '#',
    name: '五邑大学Minecraft组织',
    community: '#',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/a/a1/Wuyi_University_Logo.png/270px-Wuyi_University_Logo.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/a/a1/Wuyi_University_Logo.png/270px-Wuyi_University_Logo.png',
    link: '',
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
    id: '#',
    name: '广州航海学院（广州交通大学）Minecraft服务器',
    community: '#',
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
    id: '#',
    name: '广东海洋大学Minecraft俱乐部',
    community: '#',
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
    id: '#',
    name: '湖南师范大学HSMC社群',
    community: '#',
    avatar: 'https://upload.wikimedia.org/wikipedia/zh/thumb/d/d0/%E6%B9%96%E5%8D%97%E5%B8%AB%E7%AF%84%E5%A4%A7%E5%AD%B8%E6%A0%A1%E5%BE%BD.png/300px-%E6%B9%96%E5%8D%97%E5%B8%AB%E7%AF%84%E5%A4%A7%E5%AD%B8%E6%A0%A1%E5%BE%BD.png',
    avatar_university: 'https://upload.wikimedia.org/wikipedia/zh/thumb/d/d0/%E6%B9%96%E5%8D%97%E5%B8%AB%E7%AF%84%E5%A4%A7%E5%AD%B8%E6%A0%A1%E5%BE%BD.png/300px-%E6%B9%96%E5%8D%97%E5%B8%AB%E7%AF%84%E5%A4%A7%E5%AD%B8%E6%A0%A1%E5%BE%BD.png',
    link: 'https://www.mualliance.cn/archives/1120',
    servers: {},
  },
  {
    id: '#',
    name: '中南林业科技大学Minecraft组织',
    community: '#',
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

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.46s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0.23;
}

.fade-enter-to, .fade-leave-from {
  opacity: 1;
}

</style>