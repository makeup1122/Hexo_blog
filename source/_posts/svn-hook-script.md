---
title: svn中使用hook script
date: 2016-12-20 16:08:11
tags:
- svn
---
### svn与git
最近又回归到使用svn做版本控制，其实svn在权限控制和安全控制方面还是比git有优势的，而且git的学习成本有点高，很难快速上手。相比来说svn有良好的GUI，适合团队管理，而git更适合做纯代码管理。

### 问题
以前使用git时，git有各种hook脚本，在实际生产中非常有用，比如自动推送线上代码的webhooks，再比如每次git pull后自动执行数据库迁移程序来同步数据库更新内容。
最近发现svn也有hook script的功能，可以与git的hook功能完成相同的任务。

### 设置
添加hook脚本：
空白位置鼠标右键->TortoiseSVN->setting->Hook Script->add
![setting](http://ww3.sinaimg.cn/large/77e84037jw1faxcv0p9qqj20li0huwic.jpg)
其中的Hook Type大概有以下几种:
* start-commit 它在提交事务产生前已运行，通常用来判定一个用户是否有权提交。
* pre-commit   在事务完成提交之前运行。
* post-commit  它在事务完成后运行。大多数人用这个钩子来发送关于提交的描述性电子邮件，或者作为版本库的备份。
* post-update  它在update操作完成后运行。我用这个执行迁移脚本。
...

### 我的hook script
    cd /d %~dp0  
    cd ..
    php think migrate:run
该文件保存为post-update-hook.bat
* `cd /d %~dp0`   执行结果：切换至脚本所在目录
    * `/d`   切换目录的同时切换盘符
    * `%0`   代表批处理本身
    * `%~d0` 将 %0 扩充到一个驱动器号
    * `%~p0` 将 %0 扩充到一个路径
* `php think migrate:run` tp5的数据库迁移命令

