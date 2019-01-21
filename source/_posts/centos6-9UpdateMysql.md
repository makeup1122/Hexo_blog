---
title: centos6.9升级Mysql版本至5.7
date: 2018-03-01 16:41:25
tags:
- linux
- mysql
---

# 问题
最近习惯用Mysql5.7的Json字段类型了，而低于5.7版本的Mysql都不支持JSON字段类型。

# 升级Mysql
## 安装最新的Mysql的Yum源
1. 下载对应系统的mysql最新Yum源的rpm安装包，下载地址:https://dev.mysql.com/downloads/repo/yum/
2. 安装步骤1的rpm包,这样就安装好了Mysql最新的Yum源地址库：
```
# rpm -ivh mysql57-community-release-el6-11.noarch.rpmrpm ivh 
```
3. 查看当前mysql版本和Yum源中最新的mysql版本(是否满足需求)：
```
# yum list|grep mysql-community
```
4. 执行升级命令
```
# yum update mysql-server
```

# 遇到的问题
## 启动Mysqld失败
### 错误信息
mysql错误日志：
```
[ERROR] Fatal error: mysql.user table is damaged. Please run mysql_upgrade.
```
根据提示执行mysql_upgrade，继续报错：
```
[root]#  mysql_upgrade
mysql_upgrade: Got error: 2002: Can't connect to local MySQL server through socket '/var/lib/mysql/mysql.sock' (2) while connecting to the MySQL server
Upgrade process encountered error and will not continue.
```
### 错误原因
Mysql版本升级，却未执行mysql_upgrade所致。
### 解决方法
1. 登陆服务器，编辑/etc/my.cnf文件，找到`[mysqld]`模块，如下添加`skip-grant-tables`并保存退出
```
...
[mysqld]
skip-grant-tables
datadir=/var/lib/mysql
socket=/var/lib/mysql/mysql.sock
...
```
3. 启动mysqld服务
```
# service mysqld start
```
4. 执行`mysql_upgrade`命令
```
# mysql_upgrade
```
5. 执行完毕后，去掉(或注释)步骤1在/etc/my.cnf中添加的`skip-grant-tables`选项
6. 重启mysqld服务：
```
# service mysqld restart
```

