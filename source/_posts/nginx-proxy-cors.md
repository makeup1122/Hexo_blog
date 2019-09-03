---
title: nginx_proxy_cors
date: 2019-08-16 13:28:34
tags:
- nginx
---
解决前后分离跨域问题和跨域图片、文件访问
1. 设置nginx
proxy_pass URI URL问题
目录规则问题
2. nginx 504问题
一般是由于代理服务器发生了内部错误
可以配置代理超时参数
proxy_connect_timeout 60s
proxy_read_timeout 60s
proxy_send_timeout 60s
改成127
3. 域名解析
hosts hostname
DNS设置
系统设置
/etc/resolve.conf
动态设置
server {
  resovler 8.8.8.8;
}
