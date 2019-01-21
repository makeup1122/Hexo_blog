---
title: windows下的Git Hooks执行错误
date: 2018-07-24 10:05:28
tags:
- git
- hooks
---

# 问题
windows系统下git(mingw)的hooks脚本不执行，返回如下错误
```
error: cannot spawn .git/hooks/post-merge: No error
```
# 原因
git hooks在windows环境中不像SVN hooks会自动寻找xxxx.bat类的Hook文件来执行，所以必须指定shebang来载入脚本解释器。
# 解决
在hook脚本首行插入shebang，如下：
```
#!/bin/sh   #添加解释器
echo -e "--------Start Migrating--------"
cd ./back-end/
php think migrate:run
echo -e "--------End   Migrating--------"
```
# 参考
1. https://stackoverflow.com/questions/5697210/msysgit-error-with-hooks-git-error-cannot-spawn-git-hooks-post-commit-no-su
# 学习
1. [Shebang](https://zh.wikipedia.org/zh-hans/Shebang)