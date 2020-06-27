---
title: Hapi学习和踩坑记录
tags:
  - hapi
date: 2020-04-12 00:06:54
---

#  问题

## 版本问题

Hapi当前最新版本是19.1.1，我按照Tutorials的server.js代码总是显示如下错误

```javascript
$ node server.js
/Users/makeup1122/oschina/GoingMerry/fortuna/back-end-hapi/node_modules/@hapi/hapi/lib/core.js:51
    actives = new WeakMap();                                                   // Active requests being processed
            ^

SyntaxError: Unexpected token =
    at new Script (vm.js:80:7)
    at createScript (vm.js:274:10)
    at Object.runInThisContext (vm.js:326:10)
    at Module._compile (internal/modules/cjs/loader.js:664:28)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:712:10)
    at Module.load (internal/modules/cjs/loader.js:600:32)
    at tryModuleLoad (internal/modules/cjs/loader.js:539:12)
    at Function.Module._load (internal/modules/cjs/loader.js:531:3)
    at Module.require (internal/modules/cjs/loader.js:637:17)
    at require (internal/modules/cjs/helpers.js:22:18)
```

原因：最新的v19.x需要nodejs v12以上的版本，而我的nodejs是v10

参考：https://github.com/hapijs/hapi/issues/4035

# 官方文档

官方的中文文档比英文文档要滞后一些，所以直接看英文文档会好一些！