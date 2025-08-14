# Introduction

使用 Vue3 和 Element Plus 构建的 Java 版 Minecraft 服务器在线状态监控接口，用于生产环境中监控 CQMUA 与 MUA 服务器状态，API 为 api.mcstatus.io。

# 开发环境

> 建议使用 [nvm](https://github.com/nvm-sh/nvm) 进行 Node.js 版本管理。
>
> Node.js >= 18.20.2

## 项目设置

```bash
nvm install lts
npm install
npm run dev
```

## 自定义主题

见 `src/styles/element/index.scss`

# Development Plan

- [ ] Query by ID
~~- [ ] Add support for BedRock Edition~~ (very few)
- [ ] Auto Fetch new urls of orgs
~~- [ ] Province Classification~~
- [x] Integration with YuGaoLian Joint Server
    - [x] Template Design
- [ ] OAuth2 Authentication
    - [ ] CQMUA Account
        - [ ] Admin CRUD
- [x] Performance Optimization
    - [x] No API requests on first page load
    - [x] Requests only made when user clicks on school icon
    - [x] No further requests after flip animation cycle completes
