---
title: Centos7安装Docker与配置SS
date: 2019-09-03 11:06:34
tags:
- centOS
- shadowsocks
- Docker
---
# 安装Docker
## 安装依赖
`sudo yum install -y yum-utils device-mapper-persistent-data lvm2`
## 安装库
`sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo`
## 安装Docker
`yum -y install docker-ce docker-ce-cli containerd.io `
## 启动Docker服务
`sudo systemctl start docker`

# 安装Shadowsocks镜像
`docker pull mritd/shadowsocks`

# 启动Shadowsocks服务
`docker run -dt --name ssserver -p 22339:22339 mritd/shadowsocks -m "ss-server" -s "-s 0.0.0.0 -p 22339 -m chacha20 -k PASSWORD --fast-open" -x -e "kcpserver" -k "-t 127.0.0.1:22339 -l :26500 -mode fast2"`

# 开机自启动
## 开机自启动Docker服务设置
1. 添加Docker服务到系统自启动
`systemctl enable docker`
2. 将指定用户添加到用户组
`usermod -aG docker USERNAME`
## 开机自启动Dokcer容器
1. 容器启动时添加  ` --restart=always`参数
2. 对已经创建的容器用docker update 更新:
`docker update --restart=always  NAME|ID`

# 其他相关命令
## 查看容器信息
`docker ps -a --no-trunc`
## 检查容器所有内容
`docker inspect NAME|ID`
# 参考
## Docker安装
https://docs.docker.com/install/linux/docker-ce/centos/#install-docker-ce
## Shadowsock镜像说明
https://hub.docker.com/r/mritd/shadowsocks/