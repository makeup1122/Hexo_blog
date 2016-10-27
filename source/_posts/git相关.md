---
title: git 参数学习
date: 2016-10-27 10:57:07
tags: 
- git
---
工作实践中遇到了许多很有用的参数，在这里记录一下。
### 全局
* `--git-dir` .git目录(默认为当前路径)  
1. 一般我们都是`cd`到相应的代码库目录下进行操作，设置该参数即可从任何位置进行git操作。
2. `--git-dir`传入的一定是git的路径，也就是用`git init --bare`创建的目录，或者`.git`目录。
3. 对应的环境变量:`GIT_DIR`，可以在脚本中使用。 

* `--work-tree`  工作目录(默认为当前路径)
1. 这个命令配合`git checkout`命令，可以方便的在生产环境导出不带`.git`目录的生产代码目录。
2. 对应的环境变量:`GIT_WORK_TREE`，可以在脚本中使用。

* `-q --quiet` 只输出错误信息。

### git init 
* `--bare` 创建一个空的git库。如`GIT_DIR `未设置，则在当前目录创建。
    该选项创建的git库只包含git文件而不包含实际项目的源文件，所以不允许进行一般的git操作，会收到` This operation must be run in a work tree`的错误，可见并非工作目录。
    所以一般远端仓库都是该命令初始化，可减少冲突。

### git clone
* `--depth <depth>` 指定日志深度。
    因为经常使用[Could9 IDE](http://c9.io),又因为硬盘免费空间只有1GB,所以经常因为.git目录过大导致无法使用。 

### git checkout
* `-f
--force` 强制切换分支

### git reset
* `[<tree-ish>] <paths>` 切换所有`<paths>`文件或目录到`<tree-ish>`的状态。但并不会影响当前工作目录(working tree)或者当前分支。
配合`git checkout`命令，可以实现还原单个文件历史状态的目的。

### Bash中的git
git源码中有几个比较有用Shell脚本的插件，但是这些插件并不是默认打开的。
* `git-completion.bash` 该脚本可以通过<tab>键自动补全shell中的git命令。
* `git-prompt.sh` 该脚本可以自定义用户的Shell提示符（prompt)，显示当前目录下的Git仓库信息。
这个非常有用，尤其是当我们在Shell中操作多个分支时，免驱不断重复用`git status`查看分支的烦恼。
* 这些脚本的下载地址[https://github.com/git/git/blob/master/contrib/completion/git-completion.bash]()
* 脚本的安装方法,[点击这里](https://git-scm.com/book/zh/v2/%E5%85%B6%E5%AE%83%E7%8E%AF%E5%A2%83%E4%B8%AD%E7%9A%84-Git-Bash-%E4%B8%AD%E7%9A%84-Git)。
