---
title: 学习 .htaccess中的Rewirte
date: 2017-03-01 15:23:11
tags:
- apache
---
## 前言
使用.htaccess的Rewrite规则，需开启apache的rewrite模块。

## 指令
* **RewriteEngine *on|off* **
    关闭或者打开Rewirte功能
* **RewriteBase *基准路径* **
    设置目录级重写的基准URL
* **RewriteCond *字符串参数(Pattern)*    *匹配参数* **
    定义重写发生的条件。仅当设定的条件满足时，才会执行后面RewriteCond命令。
* **RewriteRule *匹配参数* *替换参数* *[flags]* **
为RewirteEngine定义重写规则。
第三个*flags*参数为可选参数,格式为逗号分隔的一个数组，常用内容:
    1. 'nocase|NC' (no case) 忽略大小写
    2. 'passthrough|PT'    传递参数到下一个规则,主要是为了给*Alias, ScriptAlias, Redirect等指令传递参数。
    3. 'qsappend|QSA' 
    4. 'last|L' 最后一条规则，执行完成立即停止Rewirte。
    5. 'redirect|R [=code]' 跳转的状态码，默认位302(暂时性转移Temporarily Moved)。

### 例子
* 去掉php中的index.php
{% codeblock %}
    <IfModule mod_rewrite.c>
        RewriteEngine On
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteRule ^(.*)$ index.php/$1 [QSA,PT,L]
    </IfModule>
{% endcodeblock %}
* 匹配手机等移动端
{% codeblock %}
    <IfModule mod_rewrite.c>
        RewriteEngine On
        RewriteCond %{HTTP_USER_AGENT} "android|blackberry|googlebot-mobile|iemobile|ipad|iphone|ipod|opera mobile|palmos|webos" [NC]
        RewriteRule ^(.*)$ /mobile/$1 [L,R=302]
    </IfModule>
{% endcodeblock %}

### 其他用到过的指令
* **ErrorDocument *错误码* *错误页面文档路径***
{% codeblock %}
    ErrorDocument 403 /error_page/zjn403.html
    ErrorDocument 404 /error_page/zjn404.html
{% endcodeblock %}
* **Options +FollowSymlinks -Multiviews**
Options指令用于启用/关闭某些特性。`+FollowSymLinks`表示服务器允许在此目录中使用符号连接。`-Multiviews`不允许使用mod_negotiation提供内容协商的"多重视图"。`Options FollowSymLinks`必须伴随`RewriteEngine On`出现。
参考:http://man.chinaunix.net/newsoft/Apache2.2_chinese_manual/mod/directives.html