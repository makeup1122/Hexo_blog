---
title: CentOS安装Google BBR
date: 2018-01-31 10:21:58
tags:
- centos
- google
---

### 准备工作
1. 我的服务器是Vultr的东京机房VPS，系统是CentOS7 64bit版本。
2. 检查Linux内核版本。Google BBR要求linux内核最低版本为4.9,如果版本低于4.9请先升级内核版本。

### 安装Google BBR
1. 复制并执行以下代码
```
#> echo 'net.core.default_qdisc=fq' | sudo tee -a /etc/sysctl.conf
#> echo 'net.ipv4.tcp_congestion_control=bbr' | sudo tee -a /etc/sysctl.conf
#> sysctl -p
```
执行结果：
```
[root@goingmerry ~]# uname -sr
Linux 4.15.0-1.el7.elrepo.x86_64
[root@goingmerry ~]# echo 'net.core.default_qdisc=fq' | sudo tee -a /etc/sysctl.conf
net.core.default_qdisc=fq
[root@goingmerry ~]# echo 'net.ipv4.tcp_congestion_control=bbr' | sudo tee -a /etc/sysctl.conf
net.ipv4.tcp_congestion_control=bbr
[root@goingmerry ~]# sysctl -p
net.ipv6.conf.all.accept_ra = 2
net.ipv6.conf.eth0.accept_ra = 2
net.core.default_qdisc = fq
net.ipv4.tcp_congestion_control = bbr
[root@goingmerry ~]#
```

2. 检查安装是否成功
```
[root@goingmerry ~]# sysctl net.ipv4.tcp_available_congestion_control
net.ipv4.tcp_available_congestion_control = reno cubic bbr
[root@goingmerry ~]# sysctl -n net.ipv4.tcp_congestion_control
bbr
[root@goingmerry ~]# lsmod | grep bbr
tcp_bbr                20480  5
```

##### PS
1. [Github:google/bbr](https://github.com/google/bbr)
2. [参考文章](http://vultr.aicnm.com/CentOS%E5%AE%89%E8%A3%85Google-BBR%E5%8A%A0%E9%80%9F%E5%B7%A5%E5%85%B7%E5%9B%BE%E6%96%87%E6%95%99%E7%A8%8B/)