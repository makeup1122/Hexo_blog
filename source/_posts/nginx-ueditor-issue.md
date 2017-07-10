---
title: Nginx问题记录
date: 2017-07-10 15:10:49
tags:
- nginx
- ueditor
---


### 前言
在nginx使用过程中，会有很多问题，在此做记录。

### 由于请求header过大导致的**502**错误
测试在一个上传附件图片的功能时，每次上传一个附件会在cookie里缓存附件的路径，当缓存的内容超过1KB时，再次请求后台即会发生502错误。
nginx的错误日志如下：
```
[error] 9892#0: *79051 upstream sent too big header while reading response header from upstream
```
原因是nginx配置项中的`proxy_buffer_size`参数默认是1KB，请求头部内容超过这个默认值就会报错显示502，在配置文件中添加或修改相应的数值即可。
