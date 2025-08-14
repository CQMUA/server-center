# 介绍

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

## 主对象字段

| 字段名            | 类型   | 说明                   | 示例值 |
|-------------------|--------|------------------------|--------|
| `id`             | string | 社团唯一标识符          | "SJTU" |
| `name`           | string | 社团全称               | "上海交通大学Minecraft社" |
| `community`      | string | 社区/组织简称          | "SJMC" |
| `avatar`         | string | 社团LOGO图片URL        | "https://.../mcclub_透明背景-300x300.png" |
| `avatar_university` | string | 所属大学校徽图片URL    | "https://.../SJTU_emblem.svg.png" |
| `link`           | string | 社团官网链接           | "https://mc.sjtu.cn/" |

## servers 服务器列表

嵌套对象，键名格式为 `[SERVER_ID]`，值为服务器域名：

| 服务器ID         | 类型   | 说明                | 示例域名            |
|------------------|--------|---------------------|---------------------|
| `SJMC_HUB`      | string | 中心服务器          | "hub.sjmc.club"     |
| `SJMC_SMP`      | string | 生存服务器1         | "1.19.sjmc.club"    |
| `SJMC_SMP2`     | string | 生存服务器2         | "smp2.sjmc.club"    |
| `Creative`      | string | 创造服务器          | "creative.sjtu.cn"  |
| `SJMC_BUILD`    | string | 建筑服务器          | "build.sjmc.club"   |
| `SJRedStone`    | string | 红石服务器          | "redstone.sjmc.club"|
| `MUA`           | string | 跨校联盟服务器       | "lobby.mualliance.ltd" |

# Development Plan

- [ ] 按组织/学校 ID查询
- [ ] 自动从 MUA 获取新组织信息
- [x] 渝高联服务器
    - [x] 模板设计
