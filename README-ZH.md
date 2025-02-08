# 介绍

使用Vue3和Element Plus构建的Java版我的世界服务器在线状态监控界面，生产环境用于CQMUA服务器和MUA服务器的状态监控，API提供方为api.mcstatus.io



# 开发环境

> 推荐使用[nvm](https://github.com/nvm-sh/nvm)进行node.js的版本管理
>
> node.js >= 18.20.2



## 项目配置

```bash
nvm install lts
npm install
npm run dev
```



## 自定义主题

See `src/styles/element/index.scss`



# 开发计划

- [ ] 按ID查询
- [ ] 省份分类
- [x] 接入渝高联联合服
    - [x] 模板设计
- [ ] OAuth2认证
    - [ ] CQMUA Account
        - [ ] 管理员CRUD
    - [ ] JWT by Union CAS-logto
- [x] 性能优化
    - [x] 首次进入页面不请求 api
    - [x] 只在用户单击学校图标时进行请求
    - [x] 翻转动画周期完成不再请求

