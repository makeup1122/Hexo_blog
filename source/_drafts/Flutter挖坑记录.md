title: Flutter挖坑记录
author: makeup1122
date: 2020-03-21 20:33:06
tags:
---
# Version
* Flutter 1.12.13+hotfix.8 • channel stable • https://github.com/flutter/flutter.git
* Framework • revision 0b8abb4724 (6 weeks ago) • 2020-02-11 11:44:36 -0800
* Engine • revision e1e6ced81d
* Tools • Dart 2.7.0
* Android Studio 3.6.1

# 问题记录
1. flutter doctor 检测如下：
```
✗ Android license status unknown.
```
解决：
在Android Studio中`Preferences`->`Android SDK`，选择`SDK Tools`标签，去掉`Hide Obsolete Packages`的对勾，选择安装`Android SDK Tools（Obsolete）`，版本26.1.1。安装完后执行如下命令即可：
```
flutter doctor --android-licenses
```
参考：https://github.com/flutter/flutter/issues/51670
