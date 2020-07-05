---
title: node-image-server
date: 2020-06-15 11:50:38
tags:
---

使用koa2和sharp建立的简单图片服务



问题记录：

1. 自定义名称

   ```javascript
   const nameLength = 24
   const saveName = require('crypto').randomBytes(Math.ceil(nameLength / 2)).toString('hex').slice(0, nameLength) + path.extname(fileOriginName);
   ```

   

2. 静态文件

