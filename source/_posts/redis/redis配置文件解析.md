---
title: redis配置文件解析
date: 2025-08-15 11:14:40
tags:
categories: "redis"
---


port   设置端口号

tcp-backlog 511   连接队列

timeout 0   超时时间，0表示永不超时

tcp-keepalive 300    连接心跳检测，对访问客户端的一种心跳检测，每n秒检测一次，单位为秒

include    引入其他配置文件

daemonize yes    设置为yes为后台运行

databases 16    默认库的数量


requirepass    设置密码   
auth       认证(输入密码认证) 


maxclients 10000    客户端最大连接数量

maxmemory      设置最大内存占用

maxmemory-policy   置换策略
    noeviction  当内存达到最大值时，redis拒绝新的写操作
    allkeys-lru  当内存达到最大值时，redis会优先选择最近最少使用的键进行删除
    allkeys-lfu   当内存达到最大值时，redis会优先选择最不经常使用的键进行删除
    allkeys-random  当内存达到最大值时，redis会随机选择删除键值
    volatile-lru   当内存达到最大值时，redis会优先选择最近最少使用的带有过期时间的键进行删除
    volatile-lfu   当内存达到最大值时，redis会优先选择最不经常使用的带有过期时间的键进行删除
    volatile-random 当内存达到最大值时，redis会随机选择要删除的带有过期时间的键

maxmemory-samples
    设置样本数量(一般设置3-7)




dbfilename dump.rdb    设置RDB持久化的缓存文件名称
dir ./    设置缓存文件的位置,这个 ./ 启动时的文件夹

save 60 10000    设置RDB自动缓存条件，60为60秒，10000为10000次更新key，60秒时且更新10000次key会出发自动缓存



appendfilename "appendonly.aof"   配置AOF缓存文件名
appenddirname "appendonlydir"  配置AOF缓存文件夹位置，位置会在配置的dir下创建文件夹

appendonly yes    配置开启AOF开启

appendfsync always   总是触发缓存
appendfsync everysec  每秒触发缓存，(推荐使用)
appendfsync no   不自动触发

auto-aof-rewrite-percentage:100%   设置重写基准值的百分比(相对上次增长的百分比，达到后并满足auto-aof-rewrite-min-size后重写)
auto-aof-rewrite-min-size:100MB   设置重写基准值(当文件达到min设置的基准值时，触发重写)