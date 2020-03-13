title: Centos7防火墙设置命令
tags:
  - ssh
  - shadowsocks
date: 2018-01-26 22:40:41
---


## CentOS 7.x的firewall
1. 添加新的防火墙端口配置
```
#> firewall-cmd --zone=public --add-port=99999/tcp --permanent
```
2. 生效配置
```
#> firewall-cmd --reload
```
3. 检查配置
```
#> firewall-cmd --list-port
```
4. 删除某个端口配置
```
#> firewall-cmd --zone=public --remove-port=99999/tcp --permanent
``` 
记得要执行reload生效修改。