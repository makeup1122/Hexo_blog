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

### node.js版服务端测试代码
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
    
参考文档:https://developer.github.com/webhooks/