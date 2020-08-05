---
title: 通过rsync将Linux服务器数据备份到群晖
date: 2020-08-04 22:15:25
tags:
  - synology
  - rsync
---
# DSM准备工作
## 配置DSM的群晖服务
[群晖官方rsync服务设置说明](https://www.synology.com/zh-cn/knowledgebase/DSM/help/DSM/AdminCenter/file_rsync)
## 启用rysnc服务和用户

# linux主机同步命令
## 1. 使用加密的rsync服务传输数据(ssh加密)
使用加密rsync，其实就是使用ssh传输，所以可以不用启动群晖的rsync daemon服务，可以设置ssh免密登录或者账户密码的形式就行账户权限验证，并保证DEST有写权限。
```
rsync -av -e 'ssh -p 2222' /local/backup_dir/ rsync_user@nas://var/services/NetBackup/
```
## 2. 不使用加密的rsync服务
由于我的linux服务器用户不止我一个，而通过加密传输会暴露我的nas用户的密码或着还得设置ssh免密登录，虽然可以通过设置rsync_user的权限来控制，但还是很麻烦，所以我使用单独的rsync同步用户来执行同步命令：
```
rsync -av  --password-file=/etc/rsync_pass.txt  /local/backup_dir/ rsync://rsync_user@nas:/NetBackup/
```
这里的`/etc/rsync_pass.txt`是存储daemon用户的文件，格式很简单，只有文件的第一行是有效内容，直接用来存储密码即可，记得文件的权限必须是600。
# 问题
## @ERROR: Unknown module 'volume1'

nas的远程路径不对，rsync的manual手册里有这么一段话：
```
Usage: rsync [OPTION]... SRC [SRC]... DEST
  or   rsync [OPTION]... SRC [SRC]... [USER@]HOST:DEST
  or   rsync [OPTION]... SRC [SRC]... [USER@]HOST::DEST
  or   rsync [OPTION]... SRC [SRC]... rsync://[USER@]HOST[:PORT]s/DEST
  or   rsync [OPTION]... [USER@]HOST:SRC [DEST]
  or   rsync [OPTION]... [USER@]HOST::SRC [DEST]
  or   rsync [OPTION]... rsync://[USER@]HOST[:PORT]/SRC [DEST]
The ':' usages connect via remote shell, while '::' & 'rsync://' usages connect
to an rsync daemon, and require SRC or DEST to start with a module name.
```
使用':'表示连接的是shell的路径，如果使用rsync://去连接一个rsync服务，则源地址(SRC)或者目的地(DEST)是以一个module的名称开头的，而这个module是由rsync daemon的配置文件(/etc/rsyncd.conf)定义的，举个例子：
```
#motd file = /etc/rsyncd.motd
#log file = /var/log/rsyncd.log
pid file = /var/run/rsyncd.pid
lock file = /var/run/rsync.lock
use chroot = no
#[NetBackup]
#path = /var/services/NetBackup
#comment = Network Backup Share
#uid = root
#gid = root
#read only = no
#list = yes
#charset = utf-8
#auth users = root
#secrets file = /etc/rsyncd.secrets
```
这里面的`NetBackup`就是module名了，如果是使用ssh加密方式传输，则DEST应该是：`rsync_user@nas:/var/services/NetBack/`，这个里面的`/var/services/NetBack`是shell的目录路径，如果是使用非加密方式，则DEST是`rsync://rsync_user@nas:/NetBackup/`，这里面的`NetBackup`是模块名称，模块的后面是相对模块目录的路径。
## @ERROR: service disabled
查看群晖的日志发现如下：
```
2020-08-04T22:11:22+08:00 nas rsyncd[20901]: rsync error: service disabled (code 52) at authenticate.c(633) [Receiver=3.0.9]
```
查了半天，不知所以，没办法重启了一下nas。。。解决了。。。

# 参考
* [如何将 Linux 计算机备份到 Synology NAS](https://www.synology.com/zh-cn/knowledgebase/DSM/tutorial/Backup/How_to_back_up_Linux_computer_to_Synology_NAS)
* [VPS通过rsync同步到群晖](https://tanst.net/178.html)
* [使用 rsync 同步](https://blog.csdn.net/tswisdom/article/details/7647243)
* [rsync](https://download.samba.org/pub/rsync/rsync.1)