---
title: nginx
date: 2025-06-25 17:55:31
tags:
categories: "Nginx"
---


Nginx 是支持http协议的轻量级web服务。
    存放静态资源，html，css，javascript等，不能处理动态资源
    反向代理，服务器的代理对象
    负载均衡，按照配置进行多服务器分担压力


下载Nginx
    创建yum配置文件  sudo vim /etc/yum.repos.d/nginx.repo
    配置yum，下载最新Nginx
        [nginx-stable]
        name=nginx stable repo
        baseurl=http://nginx.org/packages/centos/$releasever/$basearch/
        gpgcheck=1
        enabled=1
        gpgkey=https://nginx.org/keys/nginx_signing.key
        module_hotfixes=true
        
        [nginx-mainline]
        name=nginx mainline repo
        baseurl=http://nginx.org/packages/mainline/centos/$releasever/$basearch/
        gpgcheck=1
        enabled=0
        gpgkey=https://nginx.org/keys/nginx_signing.key
        module_hotfixes=true

Nginx文件目录
    配置文件相关
        /etc/nginx/：主要的Nginx配置文件目录。
        /etc/nginx/nginx.conf：Nginx的主配置文件，包含全局配置信息。
        /etc/nginx/conf.d/：这个目录通常包含一些附加的配置文件，默认情况下主配置文件/etc/nginx/nginx.conf会引入该目录的所有文件。
    日志相关
        /var/log/nginx/：Nginx的日志文件目录，包括访问日志和错误日志。
        /var/log/nginx/access.log：访问日志，记录所有进入服务器的请求。
        /var/log/nginx/error.log：错误日志，记录服务器处理过程中的错误信息。
    页面文件
        /usr/share/nginx/html    存放静态资源页面


配置nginx中虚拟主机
    server{      //虚拟主机根标签
    listen 8080;     //虚拟主机访问端口(可以配置多个)
    server_name 192.168.6.101;   //虚拟主机访问地址(可以配置多个)

    underscores_in_headers on;    表示支持下划线

    location /hello-nginx{       //访问主机下的资源时，再去该路径下匹配其中的资源路径(可以配置多个)
            root /usr/share/nginx/html/;    //资源所属根文件夹
            index index.html;   //资源文件名
            //最终的匹配结果为 root + location，没写具体访问哪个资源时默认访问index
    }

    location /{       //访问主机下的资源时，再去该路径下匹配其中的资源路径(可以配置多个)
        proxy_pass http://www.atguigu.com;   配置反向代理,配置代理地址
    }

    }
    nginx -t     检查nginx配置文件是否有错误

setenforce 0    临时关闭VMware虚拟机安全模式

yum install fontconfig   安装字体

































































--------------------------------------------------------------------------------------------
nginx -s stop   立即停止服务，立刻停止进程
nginx -s quit   从容停止服务，等待进程完成当前工作后停止
killall nginx  强制停止服务  立刻杀死nginx进程
proxy_pass  设置访问的协议及upstream
upstream 自定义名称{ 
ip_hash;
server 地址 weight=2;}  
weight 是指定权重，数值越大访问概率越高，默认1，down表示不参与负载
fail_timeout  默认10s，max_fails  默认1，在10s中有1次请求失败，将节点标记为不可用，下次周期时重置
backup  其他非backup服务器down或忙的时候，请求backup服务器
ip_hash 每个ip固定访问一个服务器
location /favicon.ico{}  配置后，favican.ico请求会被大括号中内容处理