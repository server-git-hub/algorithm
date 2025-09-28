---
title: git
date: 2025-06-24 23:36:51
tags:
categories: "Git"
---

全局范围的签名设置
  git config --global user.name 用户名      配置用户名
  git config --global user.email 邮箱地址   配置邮箱

git config --list   输出所有配置信息


git init   使用git管理当前项目
git status  查看当前文件状态


暂存区相关：
git add .    写 . 代表提交所有文件到暂存区
版本库相关：
git commit -m "描述" 文件名    提交到版本库，-m后面写描述，然后写提交的文件名称，不写默认提交所有文件
git log  查看版本库中历史记录
  参数 -n 2   查看历史记录最近的两条记录
git reflog  简单查看版本库中历史记录
  参数 -n 2   查看历史记录最近的两条记录
git reset --hard "版本号"   回滚到该版本号的历史版本

分支相关：
git branch 分支名   创建分支
git branch -v      查看分支
git checkout 分支名    切换分支
git checkout -b 分支名    切换分支并创建分支
git merge 分支名   把指定的分支合并到当前分支上
git branch -d | -D 分支名  命令可以删除不再需要的分支，-d只能删除合并后的分支，-D可以删除合并或未合并的分支
git log --graph   命令可以查看分支之间的提交历史记录


远程仓库相关：
  关联和断开远程仓库
  git remote add 别名 远程仓库的ssh | https地址
  git remote -v       //查看关联远程仓库信息
  git remote remove 别名    //取消远程仓库关联
  推送数据到远程仓库
  git push 别名 本地分支名    //会在远程仓库创建一个同名的分支
  git push 别名 本地分支名：远程分支名   //将本地分支推送到远程仓库的指定分支
  克隆远程仓库内容(第一次连接远程仓库)
  git clone 远程仓库地址(1.创建远程仓库同名文件夹 2.初始化仓库 3.关联远程仓库默认别名origin 4.拉取现有远程仓库的内容)
  拉取远程仓库内容
  git pull 别名 远程仓库中的分支名   //远程分支会和当前所在的分支进行合并


ssh-keygen -t ed25519 -C "xxxxx@xxxxx.com"   生成公钥和私钥

























---------------------------------------------------------------------------------------------------------------


config  上下文配置
--global   全局性的
init  配置本地仓库位置
add text.txt  将text.txt添加到Git管理列表中
commit -m "" 将管理的文件上传到本地仓库，-m表示文件注释
status  查看被管理的目录中还有没有文件未提交
diff  比较提交的版本和未提交的现版本的区别
log --pretty=oneline   查看日志信息 --pretty为可选参数 oneline表示每个日志信息集中在一行
reflog  引用日志 唯一标识显示前七位字符，简短的日志信息
reset --hard 唯一标识    恢复文件到以前的版本，--hard需要给要恢复的版本的唯一标识或简短标识
cat  查看全部文件内容(与Linux命令通用)
checkout -- text.txt  --表示读取仓库 从仓库中读取一个最新文件，如果文件更改且没有提交，则会覆盖修改文件
branch  a1  创建分支a1，master为主分支
checkout a1  切换分支到a1
branch -v   -v表示查看所有
branch -d a1  -d表示删除，执行删除a1分支操作
merge a1  合并a1到当前分支中
ssh-keygen -t rsa -C ""   -t 指定密钥类型  -C 为密钥创建一个唯一标识
ssh -T git＠git.oschina.net  发起连接

clone https://gitee.com/qq-com1/text.git
  clone 克隆命令，将远程仓库下载到本地(下载仓库及其内容)，嗯哼是访问的用户名，text是访问的库
echo "" >> text.java     将内容写进text.java文件中
push https://gitee.com/qq-com1/text.git master   将本地仓库内容推送到远程仓库，master是指定分支，可省略
pull https://gitee.com/qq-com1/text.git  将远程仓库text中的内容下载到本地仓库

remote -v  本地对服务器的日志信息
remote add my_text https://gitee.com/qq.com1/text.git  给远程仓库地址起一个别名为my_text
remove my_text 删除别名

pull https://gitee.com/qq-com1/text.git master --allow-unrelated-histories  从地址中获取master分支中的内容，--allow-unrelated-histories为忽略不同步的数据，强行合并

push -f   -f表示目录及目录下的所有文件和子目录中所有文件