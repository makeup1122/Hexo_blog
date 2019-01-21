---
title: PHP项目自动部署简单脚步
date: 2019-01-21 23:46:49
tags:
  - php
  - linux
---

## 部署脚本
使用git管理的php项目，可以通过下面的脚本配合webhook，实现自动部署。
```
<?php
$pwd = getcwd();
$command = 'cd ' . $pwd . ' && git pull';
$output = shell_exec($command);
print $output;

?>
```
将该脚本保存至服务器端web项目的目录下，命名为`deploy.php`，然后再配置好项目的webhook。这样每次push时，webhook会自动触发`http://www.test.com/deploy.php`, 即可自动触发这个脚本实现部署。


## 问题：shell_exec命令无法从浏览器端执行
首先遇到的问题就是从浏览器端无法执行shell_exec。原因有很多种，如果可以从日志看到错误信息，那么还好解决一下，如果没有php错误日志，或者nginx和apache的错误日志，那么调试问题就很麻烦了，但基本都是权限设置的问题。

## 排查及解决方法
### 1. 首先在服务器端，本地执行`deploy.php`脚本，查看能否顺利执行，检查脚本书写是否有误：
```
#> php deploy.php
```
### 2. 查询php-fpm的运行用户
```
#> ps -ef|grep php-fpm
```
假设php-fpm的运行用户是`nobody`，则使用nobody用户再次执行php deploy.php
```
#>sudo -Hu nobody php deploy.php
```
### 3. php-fpm用户无.git目录的操作权限
解决办法比较暴力
```
chmod 777 -R .git
```
### 4. php-fpm用户无访问远程origin的权限
创建php-fpm用户的ssh-key并添加至远程repo。
### 5. php-fpm用户无执行git命令的权限
修改`/etc/sudoers`文件，假设php-fpm的运行用户是nobody，则添加如下行
```
nobody ALL=NOPASSWD: /usr/bin/git
```