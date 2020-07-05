---
title: curl证书认证问题
date: 2020-07-03 13:31:08
tags:
 - errors
 - php
 - curl
---
# 问题
近期突然有一个项目php后台使用微信SDK[oveovertrue/wechat](https://github.com/overtrue/wechat/)的调用发生错误了，日志显示错误信息：
```
[ error ] [0]cURL error 77: Problem with the SSL CA cert (path? access rights?) (see http://curl.haxx.se/libcurl/c/libcurl-errors.html)
```
# 原因
错误由底层的curl抛出，显示证书错误。
# 解决
centos 7.x环境：
```
sudo yum reinstall openssl ca-certificates -y
```
更改底层内容时，记得要重启php或者php-fpm才能生效。
# 参考
无