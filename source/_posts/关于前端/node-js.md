---
title: node.js
date: 2025-09-11 22:59:33
tags:
categories: "前端"
---

Node.js
    单线程，轻量级，模块化
    是运行前端代码的环境

npm：(相当于java的maven)
    npm config list   查看所有配置信息
    npm install -g npm@9.6.6   不指定版本默认更新到最新版本
    常用命令：
        npm init   初始化项目，后续需要配置参数
        npm init -y   默认初始化
        npm install 包名    安装依赖
        npm install 包名@版本号   安装依赖
        npm install -g 包名   安装依赖，-g表示全局安装   
        npm install    安装package.json中所有所需依赖
        npm update 包名  更新依赖为最新版本
        npm uninstall 包名   卸载依赖
        npm ls   查看依赖
        npm ls -g   查看全局依赖
        npm run  运行命令