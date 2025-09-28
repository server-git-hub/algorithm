---
title: Linux
date: 2025-06-24 23:38:14
tags:
categories: "Linux"
---



目录结构：/  作为根目录
home  root  私有文件目录，root是超级管理员root账号自己的文件，home中会存其他用户的文件
opt   公共文件目录
var   随时间不断变化的文件，如日志
tmp   临时文件目录
usr   按照软件默认安装的位置
etc   存储配置文件



Linux命令
ls    显示当前目录下的文件夹和文件
    -a  显示隐藏内容
cp  复制文件或文件夹
rm  删除文件或文件夹
    -f  强制

vi/vim  编辑文本命令
    一般模式：
    1.复制和删除
        dd   删除光标当前行
        dnd  删除n行
        u    撤销上一步
        x/X  删除一个字母Delete/删除一个字母Backspace
        yy   复制光标当前行
        p    粘贴
        dw   删除一个词
        yw   复制一个词
    2.光标移动操作
        shift+6  移动到行头
        shift+4  移动到行尾
        1+shift+g  移动到页尾，数字
        shift+g   移动到页尾
        数字+shift+g  移动到目标行
    编辑模式：(编辑)
        i  当前光标前
        a  当前光标后
        o  当前光标行的下一行
        I  光标所在行最前
        A  光标所在行最后
        O  当前光标行的上一行
    命令模式：
        :w   保存
        :q   退出
        :!   强制执行
        /要查找的词   n查找下一个，N查找上一个
        :noh   取消高亮显示
        :set nu   显示行号
        :set nonu   关闭行号
        :%s/old/new/g  替换内容 /g 替换匹配到的所有内容  old为旧内容，new为新内容


systemctl restart network  重启网络服务
systemctl restart NetworkManager 重启网络服务(centos8)

vim /etc/hostname  修改主机名
reboot -h now   重启
shutdown -h now  关机

系统服务命令：
systemctl start 服务名    开启服务
systemctl stop 服务名    关闭鼓舞
systemctl restart 服务名    重启服务
systemctl status 服务名    查看服务
systemctl --type service    查看正在运行的服务
systemctl enable 服务名        打开自启动
systemctl disable 服务名        关闭自启动
systemctl is-enabled 服务名     查看服务是否自启动
systemctl list-unit-files     查看所有服务自启动配置



服务：
    firewalld    防火墙服务
    network  网络服务
    NetworkManage 网络管理服务


文件命令：
    pwd  查看当前所在文件夹绝对路径
        -l   显示逻辑路径
        -p   显示实际物理地址
        -version   显示版本信息
        -help   显示帮助信息
    ls  查看路径下的文件和文件夹，后面加需要查看的文件夹，默认不写查看当前文件夹
        -a   显示所有文件和文件夹，包含隐藏文件和文件夹
        -l   查看详细信息
    cd  切换目录，不写路径默认跳转到用户目录
        -   回到上一次的目录
        ..  回到上一级目录
        -p  跳转到实际物理路径，而非逻辑路径
        /   回到系统根目录
    mkdir   创建文件夹
        -m  创建时设置权限
        -p  递归创建多级目录
    rmdir   删除空文件夹
        -p  删除多级目录
        -v  显示删除过程
    touch   创建文件
    echo "" > 文件名    追加内容到文件中，没有则创建
    cp      复制文件/文件夹
        -r  复制文件夹操作
        特殊：文件夹/*   表示文件夹下的所有文件
    rm      删除文件/文件夹
        -f  不询问直接删除
        -r  删除多级目录 
    mv      剪切操作
    cat     显示文件内容
        -n  显示行号
    move    文件分屏查看器
        操作：
            q  离开
            ebter 向下翻一行
            空格   向下翻一页
            ctrl+f  向下滚动一屏
            ctrl+b  向上滚动一屏
            =     输出当前行的行号
            :f    输出文件名和当前的行号
    less    文件分屏查看器
        操作：
            空格  向下翻动一页
            [pagedown] 向下翻动一页
            [pageup]  向上翻动一页
            /字符串   向下搜寻[字符串]的功能;n向下查找，N向上查找
            ?字符串   向上搜寻[字符串]的功能;n向上查找，N向下查找
            q   离开
    head    从头开始查看   
        -n   查看多少行
    tail    从尾开始查看
        -n   查看多少行
        -f   动态追加内容，动态查看内容
    history   查看命令行历史记录
    echo     输出
    >       将左侧的内容覆盖到右侧内
    >>      将左侧的内容追加到右侧内
    ln   为文件/文件夹添加软链接
        -s  固定搭配

用户管理命令：
    id  账号    查看账户
    cat /etc/passwd   查看所有用户(查询配置文件)
    who am  i   查看当前用户信息
    useradd     创建账户
        -g   组名   指定组
    passwd   设置密码
    su    切换用户
        -  重新登录
    exit  退出到上一个用户
    usermod  -g 组名 用户名     将用户添加到该组下
    groupadd    创建组
    cat /etc/group   查看全部组信息
    groupdel    删除组

超级管理员权限：
    修改权限赋予文件：
        vim /etc/sudoers账号 ALL=(ALL) NOPASSWD:ALL
    行使超级权限：
        sudo mkdir 账号     基于：在根路径下创建文件夹演示获得超级管理员权限
        userdel  账号   删除账号不删除账号相关内容，例如home下的文件夹不删除
        userdel -r 账号     删除账号同时删除账号相关的数据   

权限：
    十位的权限标识：
        rwx：
            文件：
                r：代表可读，查看cat
                w：代表可写，可以修改单不能删除该文件，对该文件所在的目录有些权限才能删除
                x：代表可执行，可以被系统执行
            文件夹：
                r：可以读取，ls查看目录内容
                w：可以修改，目录内创建，删除，重命名文件夹
                x：可以进入该目录
        第一位：标识文件类型
            -  代表文件
            d  代表目录
            l  代表软链接
        第二到四位标识所属者的权限：
            分别为rwx 读，写，执行，- 代表没有当前位置权限
        第五到七位标识所属者的权限：
            分别为rwx 读，写，执行，- 代表没有当前位置权限
        第八到十位标识所属者的权限：
            分别为rwx 读，写，执行，- 代表没有当前位置权限
    chmod g+x o+x u+x 文件名  为当前组，其他用户，当前用户添加x权限(可以通过+ - =修改权限)
        o为其他用户权限
        g为组权限
        u为当前用户权限
        a为全部权限
    chmod 766 文件名  二进制选择权限，例如rw- 为110=6
    chown -R 所属者:所属组 文件/文件夹   //修改所属者和所属组
    chown -R 所属者   //文件/文件夹 修改所属者
    chown -R :所属组   //文件/文件夹 修改所属组


find   查找命令，可以使用正则表达式
    -name  匹配名称
    -perm  匹配文件权限
    -user  匹配文件所属用户
    -group   匹配文件所属组
    -mtime  匹配最后修改文件内容时间
    -atime  匹配最后读取文件内容时间
    -ctime  匹配最后修改文件属性时间
    -nouser  匹配无所属用户的文件
    -nogroup 匹配无所属组的文件
    -newer   匹配比指定文件更新的文件
    -type  匹配文件类型
    -size   匹配文件大小
    -prune  不搜索指定目录
    -exec...{}\;    进一步处理搜索结果
    例如 find . -name *.conf  查找当前目录.conf结尾的文件
| 和 grep
    |     将结果二次筛选
    grep 条件    进行结果筛选 

    例：
    使用find查找当前目录下所有.txt文件，并在这些文件中使用grep查找包含error的行
    1. find . -type f -name "*.txt" -exec grep "error" {} +
    查找所有以.log结尾的文件，并统计每个文件中包含warning的行数
    2. find /var/log -type f -name "*.log" -exec grep -c "warning" {} +




压缩与解压：
    gzip/gunzip压缩(只能压缩文件)
        gzip 文件    压缩，后缀名为.gz
        gunzip 文件   解压缩
    zip/unzip压缩
        zip [选项] xxx.zip 将要压缩的内容    //压缩文件和目录的命令
        unzip [选项] xxx.zip   解压缩文件
            -d  指定压缩/解压缩后的位置
    tar(多文件归纳，多文件压缩，压缩算法默认使用gzip)(重要)
        -z   压缩/解压
        -c   打包
        -v   显示详细信息
        -f   指定压缩后的文件名
        -x   解压.tar文件

        归纳后缀名为.tar
        归纳压缩后缀名为.tar.gz


进程：
1.查看运行的进程
    ps -aux  //查看当前进程信息
    ps -ef   //查看父进程信息
    ps -aux | grep 关键字    //指定搜索
2.关闭对应的进程
    kill -9 pid  //根据进程id关闭
    systemctl stop 服务名
3.根据端口号查询进程
    lsof -i:端口号   根据端口号查询进程

磁盘：
    df -h  查看磁盘分区
    fdisk -l   查看存储情况



rpm工具(手动安装，依赖不全会安装失败)
rpm -qa        查询所安装的所有rpm软件包
rpm -ql 服务名    查看安装位置
rpm -ivh RPM包全名   安装
rpm -e 软件包   卸载软件，但被其他软件依赖时无法删除
rpm -e --nodeps 软件包   卸载软件，卸载后依赖他的其他软件不再可用

yum工具
yum -y install 软件名     安装并安装相关依赖
    update    更新rpm软件包
    check-update   检测是否有可用的更新rpm软件包
    remove   删除指定的rpm软件包
    list    显示软件包信息
    clean   清理yum过期的缓存
    deplist   显示yum软件包的所有依赖关系


wget 地址      可以下载网络资源，不指定下载到当前文件夹



sudo wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo   切换yum为阿里源




































-----------------------------------------------------------------------------------------------------------------


<b>Linux命令</b>
pwd   显示当前所在目录
cd  切换目录，  "." 切换到当前目录，".." 返回上一级，绝对/相对路径，跳转到绝对/相对路径。
ls  列举当前目录，ls-a  查看当前目录所有内容，包括隐藏内容，ls-l  查看当前目录内容，显示大小，权限，日期，符号等信息

clear  清空屏
touch  创建空白文件
cat  显示文件中的全部内容
more 分屏显示内容，q键退出分屏，ctrl+c退出命令
head -number  显示文件的前多少行，默认10行
tail -number 显示文件的末尾多少行，默认10行
mkdir -p root/dd/cc  创建目录 -p表示创建多级目录，路径可以是绝对/相对路径
cp -p 目标文件 目标目录
拷贝文件到目标目录中，如果未命名会用目标文件名字替代，-p表示多级拷贝(拷贝目录)
rm  删除资源
rm /usr/local/aa -rf 删除usr/local/aa，-f表示删除时不询问，-r用来删除目录
mv  移动或重命名资源
mv /usr/local/aa /root/a1   将/usr/local/aa资源移动到/root下并改名为a1
vi/vim dd   进入文本编辑器，编辑dd文件，如果没有dd就新建一个
reboot  重启Linux系统
halt  关闭Linux系统
date  查看当前时间
tzselect  获取当前时区配置
ifconfig  获取系统网络信息
nmcli c up ens33  开启网络
vim /etc/sysconfig/network-scripts/ifcfg-ens33    该文件是Linux系统中的网络配置，修改可默认开启网络
yum install lrzsz -y  yum是基于RPM包的管理工具，对RPM命令的封装，自动去服务器下载RPM包并安装，install表示自动安装，-y表示下载时自动选择yes
lrzsz中rz命令  
rz 文件名   将文件上传到客户端
sz   将文件下载到服务器

关闭防火墙
service firewalld stop
禁用防火墙
systemctl disable firewalld
启动防火墙
systemctl enable firewalld

groupadd mysql  创建用户组，mysql为用户组名称
useradd -r -g mysql mysql -r表示创建用户 -g表示将用户添加到用户组中，第一个mysql为用户名称，第二mysql表示添加到哪个用户组

chgrp -R mysql .  给用户组授权
chown -R mysql . 给用户授权
chmod 777 server.sh   给文件改属性，777表示可读可写可执行

systemctl enable mysql   开机自启动，mysql是服务的名称
wget 链接      下载链接中的文件  

netstat -ntpl   查看所有基于tcp协议监听的端口
source  重新加载资源

etc/sysconfig/network-scripts   网卡配置文件
BOOTPROTO="static"   将分配方式从动态IP改为静态(默认动态)


nginx中用到的命令
yum -y install gcc make automake prce-devel zlib zlib-devel openssl openssl-devel  
gcc   gcc环境，用来编译nginx源码
pcre-devel  是perl库，包括perl兼容的正则表达式库，nginx的http模块使用pcre来解析正则表达式。
zlib zlib-devel   zlib库提供很多种压缩和解压缩的方式，nginx使用zlib对http包内容进行gzip
openssl openssl-devel  openssl是一个强大的安全套接字层密码库，包括主要是的密码算法，常用的密钥和证书封装管理功能及ssl协议，提供丰富的应用程序供测试或其他目的使用，nginx不仅支持http也支持https(即在ssl协议上传输http)



