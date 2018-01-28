---
title: shadowsocksOnVultr
date: 2018-01-26 22:40:41
tags:
- ssh
- shadowsocks
---

## 在vultr上安装shadowsocks

#### 注册开通vultr

#### 安装shadowsocks server

#### 防火墙设置
##### vultr的firewall

##### CentOS 7.x的firewall
1. 添加新的防火墙端口配置
```
#> firewall-cmd --zone=public --add-port=99999/tcp --permanent
```
2. 生效配置
```
#> firewall-cmd --reload
```
3. 检查配置
```
#> firewall-cmd --list-port
```
4. 删除某个端口配置
```
#> firewall-cmd --zone=public --remove-port=99999/tcp --permanent
``` 
记得要执行reload生效修改。

