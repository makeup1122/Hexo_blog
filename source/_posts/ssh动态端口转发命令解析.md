---
title: ssh动态端口转发命令解析
date: 2016-10-27 22:38:36
tags:
- ssh
---
#### 命令全貌：
        ssh -qfTnN -D 0.0.0.0:1080 SSH_SERVER -l user -o ServerAliveInterval=60

#### 参数说明：

* `-q`   静默模式(Quiet mode).
* `-f`    将SSH命令变为后台服务(Requests ssh to go to background just before command execution).
* `-T`  不启用为终端，即不占用 shell 了(Disable pseudo-tty allocation).
* `-n`  用/dev/null来当ssh的输入，阻止ssh读取本地的标准输入内容(Redirects stdin from /dev/null (actually, prevents reading from stdin). This must be used when ssh is run in the background.).
* `-N`  Do not execute a remote command. This is useful for just forwarding ports (protocol version 2 only).
* `-D`  动态端口转发，在指定端口建立基于SOCKs4和SOCKs5协议的SOCKS服务。默认绑定IP地址为”localhost”，0.0.0.0或者”*”表示接受所以地址的请求。
* `SSH_SERVER`  ssh服务器地址
* `-l`  指定登录远程服务器(SSH_SERVER )的用户名
* `-o`  参数选项(以配置文件的形式)。
* `ServerAliveInterval=60`   number of seconds that the client will wait before sending a null packet to the server (to keep the connection alive).默认为0，设置为0即关闭该选项。
    其他类似的相关选项还有：
    * `ClientAliveInterval` 60 ＃server每隔60秒发送一次请求给client，然后client响应，从而保持连接
    * `ClientAliveCountMax` 3 ＃server发出请求后，客户端没有响应得次数达到3，就自动断开连接，正常情况下，client不会不响应
    * `ServerAliveInterval` 60 ＃client每隔60秒发送一次请求给server，然后server响应，从而保持连接
    * `ServerAliveCountMax` 3  ＃client发出请求后，服务器端没有响应得次数达到3，就自动断开连接，正常情况下，server不会不响应