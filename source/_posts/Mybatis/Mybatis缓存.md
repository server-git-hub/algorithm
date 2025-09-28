---
title: Mybatis缓存
date: 2025-06-25 17:50:51
tags:
categories: "Mybatis"
---


一级缓存，缓存在SqlSession中，默认开启
二级缓存，缓存在Mapper中，默认开启，但不实现
SqlSession调用close方法，会释放一级缓存PerpetualCache对象，并关闭一级缓存
SqlSession调用chearCache，会清空一级缓存PerpetualCache数据，但一级缓存仍可用
在执行DML操作时会清空一级缓存数据


二级缓存特点
映射文件中所有select语句将会被缓存
映射语句文件中的所有 insert、update 和 delete 语句会刷新缓存。
二级缓存是以 namespace 为单位的，不同 namespace 下的操作互不影响
如果在加入<cache/>标签的前提下让个别 select 元素不使用缓存，可以使用 useCache
属性，设置为 false。
缓存会使用默认的 Least Recently Used （LRU，最近最少使用的）算法来收回。
根据时间表，比如 No Flush Interval，（CNFI 没有刷新间隔），缓存不会以任何时间顺序
来刷新。
缓存会存储列表集合或对象(无论查询方法返回什么)的 1024 个引用
缓存会被视为是 read/write(可读/可写)的缓存，意味着对象检索不是共享的，而且可以
安全的被调用者修改，不干扰其他调用者或线程所做的潜在修改。

cache标签
type自定义缓存类，要求实现 org.apache.ibatis.cache.Cache接口
readOnly
是否只读
true:给所有调用者返回缓存对象的相同实例。因此这些对象不能被修改.
这提供了很重要的性能优势。
false:会返回缓存对象的拷贝(通过序列化)。这会慢一些,但是安全
eviction
缓存策略
LRU(默认)，-最近最少使用：移除最长时间不被使用的对象。
FIFO -先进先出：按对象进入缓存的顺序来移除它们。
SOFT -软引用：基于垃圾回收器状态和软引用规则移除对象。
WEAK -弱引用:更积极地基于垃圾收集器状态和弱引用规则移除对象
刷新间隔，毫秒为单位。默认为 null，也就是没有刷新间隔，只有执行update、insert、delete 语句才会刷新
size
缓存对象个数，默认1024个
blocking 
是否使用阻塞性缓存 BlockingCache
true:在查询缓存时锁住对应的 Key,如果缓存命中了则会释放对应的锁,否则会在查询数据库以后再释放锁,保证只有一个线程到数据库中查找指定 key 对应的数据
false：不使用阻塞性缓存，性能更好

