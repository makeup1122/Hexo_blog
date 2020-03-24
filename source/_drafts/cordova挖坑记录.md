title: cordova挖坑记录
author: makeup1122
date: 2020-03-21 21:01:10
tags:
---
# Version
* Cordova 9.0.0 (cordova-lib@9.0.1)
* Android Studio 3.6.1

# 问题记录
## Android
1. android: Command failed with exit code ENOENT
检测依赖性时有如下错误：
```
android: Command failed with exit code ENOENT
```
解决：在Android Studio中安装Android SDK Tools(Obsolete)，版本是26.1.1
2. 自定义图标的src相对目录是cordova项目的根目录。


## Vue项目打包
1. 打包路径
vue的项目一般打包后，默认的路径是为服务器设置的绝对路径，要和Cordova搭配，需要把默认路径改成相对路径(./)就可以了，就是这么简单。具体一点就是打包后，可以通过index.html启动项目。
2. 网络请求
浏览器和后端通信要注意跨域限制，但是当使用cordova时，项目是运行在app里的，不存在跨域限制,可喜可贺。但是需要小心的是在浏览 器上能正常工作的cookie，就不能在app里使用了，因为打包后的项目实际上在File协议下运行，所以通过sessionID来保证登录的方案 不可行（当然没打包前是可以的，这才是最迷惑的），建议使用token放在请求头部使用，来保证登录，然后使用本地缓存token来保证持久登录。
3. vue-router
cordova不支持history模式。