---
title: git自动部署实践
date: 2017-07-28 23:11:59
tags:
- git
- deploy
- hooks
---

## 服务端配置
#### ssh免密码登录
配置ssh-key或pem文件等，用以本地用户可以免密码登录到服务器。
#### 创建裸库
在服务器某目录(例：`/opt/git`)下执行如下命令，生成裸代码仓库：
```
    #>git clone --bare git@xxxx.com:test.git
```
该命令从远程库拷贝一份裸库到本地。

或者使用--mirror参数，生成镜像代码仓库
```
    #>git clone --mirror git@xxxx.com:test.git
```
镜像代码仓库也是裸代码仓库，它与裸代码仓库的区别在于：它不仅将源代码仓库的本地分支映射到目标代码仓库的本地分支，而且将所有引用（包括远程跟踪分支、备注等）都进行映射并建立refspec配置以使目标代码仓库的所有引用可被git remote update命令覆盖。

#### 编写服务端hooks
进入到版本库的hooks目录下，创建`post-receive`文件，添加执行权限：
```
    #>cd test.git/hooks && touch post-receive
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
另一个例子
```
#!/bin/sh
//给ECHO输出添加颜色
echo -e "\033[36m--------------Start Deploy--------------\033[0m"
WWW_DIR="/home/nginx/www-culture-mirror"
//目录不存在或无权限则退出脚本
cd $WWW_DIR ||exit
pwd
echo $GIT_DIR
//取消GIT_DIR变量，否则会出现错误：“fatal: not a git repository: '.'”
unset GIT_DIR
git pull origin develop
echo -e "\033[33m--------------Start Migrate ------------\033[0m"
./vendor/davedevelopment/phpmig/bin/phpmig migrate
echo -e "\033[36m--------------End Success---------------\033[0m"
```
#### 忽略线上或生产环境的配置文件
1. 首先正确修改你的项目中的配置文件。
2. 使用如下命令来告诉git暂时忽略该配置文件的修改：
```
    #> git update-index --assume-unchanged config.file
```
如果想反悔则：
```
    #> git update-index --no-assume-unchanged config.file
```
这样该文件就不会出现在`git status`中
3. 如果修改的配置文件较多，可以用`git ls-files`命令查询那些被`--assums-unchanged`忽略的文件
```
    #> git ls-files -v |grep '^h\+'
```
详情参考[git-ls-files文档](https://git-scm.com/docs/git-ls-files/)

## 客户端配置
#### 配置远程git库信息
```
    #> git remote add serverAlias sshUser@50.40.30.20:/opt/git/test.git
```
#### 推送至远程服务器
```
    #> git push serverAlias develop
```
## 其他
* 学习ssh config的配置方式和详细配置
* git参数`--bare`、`--work-tree`的理解
* git hooks脚本的类型和使用情景