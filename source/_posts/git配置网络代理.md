title: git配置网络代理
author: makeup1122
tags:
  - git
categories:
  - code
date: 2020-02-19 23:45:00
---
从github使用git clone下载repo时，由于网络问题经常会失败或者速度很慢，而我正巧有科学上网的代理工具，所以配置一下git命令的参数，使得clone走代理即可。
## 配置参数
[http] 和 [https]

## 参数位置
1. 系统全局参数
～/.gitconfig
2. 当前项目
.git/config

## 配置修改
```
$ git config [--global] http.proxy=socks5://127.0.0.1:1080
$ git config [--global] https.proxy=socks5://127.0.0.1:1080
```