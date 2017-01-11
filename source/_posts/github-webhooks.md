---
title: git-webhooks
date: 2016-10-28 17:03:40
tags:
- git
---
### 前言
git的webhooks是个好东西呀，怎么没早点发现!github和git.oschina 也早已都支持了，看来是我out了。
原理是当设置了某个线上git代码库的webhooks后，当代码库发生指定事件(比如push、pull、create、delete等等)时，就会向指定的URL链接发起请求(POST)，
这样就可以发挥想象力做很多事件，最常见的应该就是当有push操作时，同步更新线上的代码。省去了登录线上服务器，进行pull代码等重复操作。
下文皆以github为例子，其他代码托管网站应该都类似的。
### 添加webhooks
1. 参数
    `Payload URL`是必填参数，即发生指定事件时要通知的链接。
    `Content type` 发送请求的内容类型，有json格式和form data两种。
    `secret` 自定义密钥，被加载请求中一并发给`Payload URL`，保存在header的X-Hub-Signature中，可以用作验证请求。
2. 可用事件:https://developer.github.com/webhooks/#events
### 服务器配置
添加完webhooks后，hook已经准备好了，但服务器端的配置才是最重要的。
#### ngrok
这个是github官网介绍的一个小工具，用来给内网用户设置一个外网访问地址的，用法也很简单，[下载](https://ngrok.com/download)ngrok程序，只有一个exe文件，直接双击就可以进入命令行，执行如下命令即可启动服务：
    `ngrok http 80`
启动后可以登录http://localhost:4040 就可以看到生成的外网URL链接，还可以看到请求和响应的内容。
ngrok的1.0版本是免费的，如过注册了ngrok的用户，还可以生成安全口令、创建TCP连接，开启多通道等等功能。
但是ngrok毕竟是国外的，服务很不稳定，原因你懂得。但是1.0版本是开源的，国内友人仿照版本，可自行查找。

#### node.js版服务端测试代码
{% codeblock lang:nodejs %}
    var http = require('http');
    var child_process = require("child_process");
    http.createServer(function(req, res) {
        var post_data = '';
        req.on('data', function(chunk) {
            post_data += chunk;
        });
        req.on('end', function() {
            var result = child_process.execSync('git pull origin master');
        });
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('get push post!');
    }).listen(8888);
 {% endcodeblock %}
#### 第三方工具
npm上有很多github Webhooks的第三方的中间件，可以拿来直接用的。

参考文档:https://developer.github.com/webhooks/