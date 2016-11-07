---
title: php.ini配置文件
tags:
  - linux
  - php
date: 2016-11-07 16:53:30
---

最近做服务器迁移时，忘记在新的服务器上配置php的`upload_max_filesize`配置项，导致前台上传超过默认值(2MB)的附件时，会发生错误从而无法上传。
很久之前配置过这个选项，而且遇到了很多问题，但未进行记录，这次记录一下。
### 找到php.ini文件
* 编译安装php时，`'—with-config-file-path`选项可以指定`php.ini`文件的搜索路径，默认为`PREFIX/lib`。
* 官方手册中，加载php.ini的搜索路径如下(按顺序);
    * SAPI 模块所指定的位置（Apache 2 中的 PHPIniDir 指令，CGI 和 CLI 中的 -c 命令行选项，NSAPI 中的 php_ini 参数，THTTPD 中的 PHP_INI_PATH 环境变量）。
    PHPRC 环境变量。在 PHP 5.2.0 之前，其顺序在以下提及的注册表键值之后。
    * 自 PHP 5.2.0 起，可以为不同版本的 PHP 指定不同的 php.ini 文件位置。将以下面的顺序检查注册表目录：[HKEY_LOCAL_MACHINE\SOFTWARE\PHP\x.y.z]，[HKEY_LOCAL_MACHINE\SOFTWARE\PHP\x.y] 和 [HKEY_LOCAL_MACHINE\SOFTWARE\PHP\x]，其中的 x，y 和 z 指的是 PHP 主版本号，次版本号和发行批次。如果在其中任何目录下的 IniFilePath 有键值，则第一个值将被用作 php.ini 的位置（仅适用于 windows）。
    * [HKEY_LOCAL_MACHINE\SOFTWARE\PHP] 内 IniFilePath 的值（Windows 注册表位置）。
    * **当前工作目录（对于 CLI）。**
    * web 服务器目录（对于 SAPI 模块）或 PHP 所在目录（Windows 下其它情况）。
    * Windows 目录（C:\windows 或 C:\winnt），或 --with-config-file-path 编译时选项指定的位置。

* 无论是php命令还是Php-fpm命令：
    * 都可以通过`-i`选项打印所加载的`php.ini`内容，没找到`php.ini`时，全部采用默认配置。可以参考php源码目录中的`php.ini-production`和`php.ini-development`
    * 都可以通过`-c`选项在CLI启动时手动指定php.ini的位置或者文件名称。
* 通过`php --ini`命令查询加载的php.ini文件。奇怪的是当我执行`php --ini`后，得到的结果是：  


    Configuration File (php.ini) Path: /usr/local/lib
但是，我把php.ini文件放到这个/usr/local/lib目录下，再次执行`php --ini`时，依旧无法找到，所以我只能按照官方文档的方式，放到当前工作目录，即与Php命令放在同一目录下。

### 修改php.ini文件
修改附件上传限制，可能需要修改的参数：

    upload_max_filesize = 8M
    post_max_size = 8M
### 生效
如果是使用的php-fpm，则直接reload即可
  
    #> service php-fpm reload