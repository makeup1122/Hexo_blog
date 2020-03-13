title: Hexo-admin服务器部署
author: makeup1122
tags:
  - hexo
  - pm2
  - github pages
categories: []
date: 2019-10-22 17:57:00
---
hexo有个很好用的工具[hexo-admin](https://github.com/jaredly/hexo-admin)，可以将常规的hexo命令(new、deploy等)可视化，并且提供了一个在线的markdown编辑器，使得编写hexo blog脱离了本地开发环境和IDE，从而变得更灵活。
# 安装hexo-admin
```
npm install --save hexo-admin
```
安装之后，hexo服务启动参数添加`-d`选项即可同时启动hexo-admin界面：
```
hexo server -d
```
成功启动后即可访问hexo-admin的界面：http://localhost:4000/admin/

# 配置hexo服务
我使用pm2来管理管理hexo服务进程，使用nginx反向代理来处理请求。

### 使用pm2管理hexo服务
###### 1.安装pm2
```
npm install pm2 -g
```

###### 2. 添加启动文件
使用pm2管理hexo服务，需要在代码根目录下创建`run.js`脚本文件，内容如下
```
const { exec } = require('child_process')
exec('hexo server -p 50003 -d & ',(error, stdout, stderr) => {
	if(error){
                console.log('exec error: ${error}')
                return
        }
        console.log('stdout: ${stdout}');
        console.log('stderr: ${stderr}');
})
```
###### 3. 启动服务
```
pm2 start ./run.js --name HexoBlog
```
### 配置Nginx反向代理
添加一个nginx配置文件`/etc/nginx/conf.d/my-domain.com.conf`，内容大致如下：
```
server{
	listen 80;
	server_name my-domain.com;
	location /
    {
    	proxy_pass http://127.0.0.1:50003;
        index  index.html index.htm;
    }
}
```
记得重载nginx服务使之生效。
# 问题记录
### Hexo-admin 配置
##### 1. 登录权限
为了保证安全，将hexo-admin部署到公网时，可以添加一组用户名/密码来验证用户权限。

在本地通过hexo-admin界面提供的生成工具来生成相关参数，访问http://localhost:4000/admin/#/auth-setup，填写相关参数后，将下面自动生成的配置参数，拷贝至hexo的_config.yml配置文件中，
```
# 其他hexo参数
... ...
...

# hexo-admin authentification 参数
admin:
  username: makeup1122
  password_hash: xxxxxxxxxxx
  secret: my super secret phrase
```
重启hexo服务后，再次访问http://localhost:4000/admin/就会出现登录界面。

##### 2. 部署命令
hexo-admin同时提供了hexo deploy的界面部署方式，访问http://localhost:4000/admin/#/deploy就可以看到。

使用方法：
1. 添加./hexo_deploy.sh部署脚本：

```
#!/bin/sh
hexo clean
hexo deploy

```

2. 在_config.yml中添加admin.deployCommand配置项：

```
# hexo-admin authentification 参数
admin:
  username: makeup1122
  password_hash: xxxxxxxxxxx
  secret: my super secret phrase
  deployCommand: /root/Hexo_blog/hexo_deploy.sh
```
deployCommand需使用绝对路径。


### Github Pages自定义域名问题
这个问题和hexo-admin没什么关系。

使用自定义域名访问Github Pages，会在你的github pages库的根目录中添加一个CNAME文件，文件中保存了你设定的自定义域名。
只需要在Hexo_blog代码目录的source文件夹中创建CNAME文件并写入自定义域名即可。