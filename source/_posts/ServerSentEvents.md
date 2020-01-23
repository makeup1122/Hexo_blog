---
title: 关于ServerSentEvents(服务器发送事件)中的EventSource添加Header认证的问题
date: 2020-01-18 00:18:00
tags:
- javascript
---

# EventSource
关于EventSource的介绍和实例就不多说了，网上一大堆。

# 后台权限认证
- 原生EventSource接口过于简单，看样子是个半成品的内容，更没有迹象表明会在未来有任何变化...

由于原生EventSource接口，没有任何配置参数或者方法可以设置请求的header内容。所以对于后台接口需要权限认证的接口来说，就比较麻烦了，以下是我了解到的几种解决方法或者说妥协方式：
1. 使用fetch()方法替换EventSource
  - 缺点：
    1. fetch接口要比EventSource复杂的多
    2. 部分浏览器对fetch() streaming的支持不足
    3. 没有重连机制
2. 使用query参数来设置自定义header
  - 缺点：
    1. 对既有的后台服务器认证方式，可能增加额外的开发工作
    2. 降低安全性
3. 使用cookie
4. 使用第三方的polyfill版本的EventSource，比如这个[Yaffle
/
EventSource](https://github.com/Yaffle/EventSource/)

# 参考
https://github.com/whatwg/html/issues/2177
https://stackoverflow.com/questions/28176933/http-authorization-header-in-eventsource-server-sent-events
