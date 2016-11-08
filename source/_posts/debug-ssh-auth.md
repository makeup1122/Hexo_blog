---
title: 调试ssh免密码登录
date: 2016-11-08 09:44:28
tags:
- ssh
- linux
- synology
---
### 问题及解决
我的DS215j在升级到DSM6.0后，ssh免密码登录就一直失效，提示
  
    Using username "admin".
    Server refused our key
    admin@172.16.5.249's password:

确定公钥没问题后，很长时间没找到问题，后来在synology论坛看到大神解决方法，找到了问题所在。
原来免密码登录需涉及到服务端***3个***目录或文件的权限问，分别是：
  
    #>chmod 0755 /home/admin
    #>chmod 0700 /home/admin/.ssh
    #>chmod 0600 /home/admin/.ssh/authorized_keys

之前一直以为只要`.ssh`目录和`authorized_keys`文件的权限正确即可，没有想的DSM再升级6.x后，修改了家目录权限。
修正家目录的权限，去掉组用户(groups)和其他用户的(others)写权限后，即可免密码登录。

### 解决思路
大神的发现问题的方法是建立了一个debug模式的sshd临时服务：
  
    #> /bin/sshd -d -p xxxx
* xxx为调试用的端口号
* sshd执行需要使用绝对路径
* `-d`为调试模式，可输出调试信息
当家目录权限不正确时，会有如下提示:
  
  
    Authentication refused: bad ownership or modes for directory /home/admin

论坛链接:https://forum.synology.com/enu/viewtopic.php?t=116726



