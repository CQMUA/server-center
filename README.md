# Introduction

An online status monitoring interface for Java Edition Minecraft servers built with Vue3 and Element Plus. It is used in production environments for monitoring the status of CQMUA servers and MUA servers, with the API provided by api.mcstatus.io.

# Development Environment

> It is recommended to use [nvm](https://github.com/nvm-sh/nvm) for Node.js version management.
>
> Node.js >= 18.20.2

## Project Setup

```bash
nvm install lts
npm install
npm run dev
```

## Customizing Themes

See `src/styles/element/index.scss`

# Development Plan

- [ ] Query by ID
- [ ] Add support for BedRock Edition
- [ ] Auto Fetch new urls of orgs
- [ ] Province Classification
- [x] Integration with YuGaoLian Joint Server
    - [x] Template Design
- [ ] OAuth2 Authentication
    - [ ] CQMUA Account
        - [ ] Admin CRUD
    - [ ] JWT by Union CAS-logto
- [x] Performance Optimization
    - [x] No API requests on first page load
    - [x] Requests only made when user clicks on school icon
    - [x] No further requests after flip animation cycle completes
