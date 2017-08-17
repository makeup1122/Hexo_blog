---
title: git自动部署实践
date: 2017-07-28 23:11:59
tags:
- git
---

## 服务端配置
#### ssh免密码登录
配置ssh-key或pem文件等，用以本地用户可以免密码登录到服务器。
#### 创建裸库
在服务器某目录(例：`/opt/git`)下执行：
```
    #>git clone --bare git@xxxx.com:test.git
```
该命令从远程库拷贝一份裸库到本地。
#### 编写服务端hooks
进入到版本库的hooks目录下，创建`post-receive`文件，添加执行权限：
```
    #>cd test.git && touch post-receive
    #>chmod +x post-receive
```
接下来就是编辑你自己的`post-receive`文件内容了，也就是自动化部署的过程脚本，我的一个tp5的例子：
```
#!/bin/sh
WORK_TREE=/usr/share/nginx/html
echo ${WORK_TREE}
git --work-tree=${WORK_TREE} checkout  develop --force 
cd ${WORK_TREE} && php think migrate:run
```
## 客户端配置
#### 配置远程git库信息
```
    #> git remote add serverAlias sshUser@50.40.30.20:/opt/git/test.git
```
#### 推送至远程服务器
```
    #> git push serverAlias develop
```
## 其他
* 学历ssh config的配置方式和详细配置
* git参数`--bare`、`--work-tree`的理解
* git hooks脚本的类型和使用情景