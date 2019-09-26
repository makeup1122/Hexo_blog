---
title: webpack4.x使用UglifyJS出错问题
date: 2018-10-12 16:37:40
tags:
- webpack
- javascript
---

# 问题
webpack中使用UglifyJS压缩代码时，出现如下错误：
```
ERROR in admin.b996c1979478ca946548.bundle.js from UglifyJs
Unexpected token: keyword (const) [src/components/Alerts.vue:36,0][admin.b996c1979478ca946548.bundle.js:740,6]

```
# 原因
1. 从出错信息来看，是UglifyJS不支持ES6的语法。理论上不应该啊...
2. 于是Google之，发现uglifyjs-webpack-plugin 2.0版本的Release日志中，明确提示重新切换回到[uglify-js](https://github.com/mishoo/UglifyJS2)，因为uglify-es被废弃了，如果需要ES6代码压缩，请使用[terser-webpack-plugin](https://github.com/webpack-contrib/terser-webpack-plugin)
# 解决
1. 方法一：使用Babel将ES6转换为ES5。
2. 方法二：安装并使用[terser-webpack-plugin]：(https://github.com/webpack-contrib/terser-webpack-plugin)
```
$ npm install terser-webpack-plugin --save-dev
```
在webpack中，添加如下配置：
```
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  //...
  optimization: {
    minimizer: [new TerserPlugin()]
  }
};
```
# 参考
1. [terser-webpack-plugin](https://github.com/webpack-contrib/terser-webpack-plugin)
2. [UglifyJS 2.0 Release信息](https://github.com/webpack-contrib/uglifyjs-webpack-plugin/releases/tag/v2.0.0)