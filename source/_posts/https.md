---
title: Apache部署https的自签证书
date: 2017-10-24 14:25:51
tags:
---
### WampServer(3.0.6 64bit) 部署https问题

1. Apache添加ssl_module后无法启动

使用`httpd -t`命令测试配置文件，结果如下：
```
Cannot load modules/mod_ssl.so into server: The operating system cannot
run %1.
```

原因是OpenSSL版本的问题，应该是我之前装过wmap 32bit版本的原因。到[这里](http://slproweb.com/products/Win32OpenSSL.html)下载合适的版本安装即可。我安装了`Win64 OpenSSL v1.0.2L Light`后就可以了。

2. 缺少`mod_socache_shmcb`模块
安装好openssl后apache依旧有错误
```
SSLSessionCache: 'shmcb' session cache not supported (known names: ). Maybe you need to load the appropriate socache module (mod_socache_shmcb?).
```
继续操作httpd.conf打开mod_socache_shmcb模块的注释。

3. 修改或者创建httpd-ssl.conf中的logs目录

4. https://localhost 404错误
因为我的wamp设置了多个vhost，都只设置了`*:80`端口，而未设置https的443端口。在extra/httpd-vhost.conf配置文件中添加
```
# https
<VirtualHost *:443>
	ServerName localhost
	DocumentRoot D:/wamp64/www
	<Directory  "D:/wamp64/www/">
		Options +Indexes +Includes +FollowSymLinks +MultiViews
		AllowOverride All
		Require all granted
	</Directory>
</VirtualHost>
```

5. 此网站无法提供安全连接
继续修改httpd-vhost.conf配置文件:
```
<VirtualHost *:443>
	ServerName localhost
	DocumentRoot D:/wamp64/www
	<Directory  "D:/wamp64/www/">
		Options +Indexes +Includes +FollowSymLinks +MultiViews
		AllowOverride All
		Require all granted
		# Require local
	</Directory>
	SSLEngine on
	SSLCertificateFile "E:/libing/https/private/localhost.crt"
	SSLCertificateKeyFile "E:/libing/https/private/private.key"
</VirtualHost>
```
其实`extra/httpd-ssl.conf`就是以vhost的形式配置的，可以删除上面步骤4和5的过程，直接修改`extra/httpd-ssl.conf`中的`ServerName`和`DocumentRoot`即可解决上面的问题。
如果要在一个IP地址上部署多个SSL网站，可以设置多个不同的SSL端口或者多个网站和域名都使用同一个证书。这是因为SSL握手协议过程中,是通过IP+Port来进行通信，一个IP的一个端口只能返给客户一张SSL证书（即使有多张证书，也只能返回第一张，因为无法分辨用户会需要返回哪张证书）。

### 关于Let's Encrypt

1. 自动部署SSL
2. 自动续期（测试Synology） 

## 参考
1. [Stackoverflow关于ssl_module的问题。](https://stackoverflow.com/questions/40017498/cannot-load-modules-mod-ssl-so-into-server)
2. [Let's Encrypt](https://letsencrypt.org)