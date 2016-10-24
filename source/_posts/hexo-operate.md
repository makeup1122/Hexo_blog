---
title: hexo基本操作
date: 2016-10-24 03:45:02
tags:
- hexo
- github
---
### 基本操作

初始化
`hexo init`

新建文章
`hexo new [layout]<title>`
如果layout为空，则使用配置文件_config.yml中的`default_layout`(默认为:post)。

生成静态文件
`hexo generate `

发表草稿
`hexo publish [layout] <filename>`

部署
`hexo deploy`
如果配置好_config.yml中的deploy，即可自动发布的github.io

获取文件列表
`hexo list <type>`
type为post/draft/page等

清理工作目录
`hexo clean`

启动本地服务
`hexo server -p 8090`

***

### 问题
1. hexo在本地测试运行重启后页面一直空白，提示 ： `WARN No layout: index.html`
确定theme目录下，相应的目录是否存在或为空

2. 部署时出现 `error deployer not found:git`错误 
 可以能是未安装`hexo-deployer-git`模块
 执行 ：`npm install hexo-deployer-git --save`即可。 
