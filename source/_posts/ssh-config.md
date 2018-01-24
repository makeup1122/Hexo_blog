---
title: 使用ssh config配置文件
date: 2018-01-24 21:44:21
tags:
- ssh
- linux
---
# ssh的config配置参数说明
### 位置
* ～/.ssh/config 用户配置文件。
* /etc/ssh/ssh_config 系统配置文件。

### 一般格式
```
Host *
    	ControlMaster auto
    	ControlPath ~/.ssh/%h-%p-%r
    	ControlPersist yes
Host server-alias
    	HostName        129.12.12.122
    	Port            22
    	User            root
        IdentityFile    ~/mykey/SSH/id_rsa
Host text.com
	    Port	22222
	    User	text
```
### 参数

##### 普通参数
* HostName ：ip或域名。当Host参数已经指明时可以不用指定该参数。
* User ：用户名。
* Port ：ssh端口号，默认22。

##### 连接参数
* ServerAliveInterval ：发送心跳包到服务器的时间间隔(秒)。当ssh连接不稳定或不可靠时，你希望知道链接是否可用。
* LogLevel ：客户端记录日志的级别。对无需记录日志或者调试ssh链接时非常有用，可选参数从无到繁分别是：`QUIET, FATAL, ERROR, INFO, VERBOSE, DEBUG1, DEBUG2, and DEBUG3`。
* StrictHostKeyChecking ：是否自动校验服务端的host key并写入know_hosts。默认是询问(`ask`)，设置为`no`则会自动写入，当你需要链接大量服务器端时很有用，但也会产生安全问题，所以请谨慎使用。
* UserKnownHostsFile ：know_hosts的存放位置。一般无需单独配置该项，当`StrictHostKeyChecking`设置为'no'时，可以设置为`/dev/null`。
* VisualHostKey ：设置为`yes`可以告诉服务端以ASCII的格式返回服务器host key。我不知道有啥用，那个ASCII图不太能看懂。
* Compression ：开启数据压缩。当你的链接很慢或者需要scp时会很有用，一般用户无需这个参数。
* ConnectTimeout ：设置超时时间来覆盖系统默认的TCP连接超时时间。

##### 转发参数
略

##### 关于key的参数
* IdentityFile ：为每个链接指定私钥文件的位置。当你的私钥文件不在默认位置(比如`~/.ssh/id_rsa`)或者你有多个不同功能的私钥文件时会很有用。
* IdentitiesOnly ：强制使用config文件内配置的某一私钥文件。当你有2个以上的私钥文件可用时会用到这个参数。
* IdentityAgent ：Specifies the UNIX-domain socket used to communicate with the authentication agent.

##### 多路复用单个TCP链接
这个很有用，可以大幅提升ssh连接速度。
* ControlMaster ：当多路复用可用时是否开启。设置为`auto`即可启用。
* ControlPath ：设置socket文件的位置和文件名格式，比如可以设置为`~/.ssh/%h-%p-%r`。参考TOKEN的内容。
* ControlPersist ：复用链接的持续时间。可设置位为整数(秒)、`4h`(小时)、`yes`(长时间)等。

##### 权限认证
* PasswordAuthentication ：设置是否开启密码认证。可选参数只能为`yes`或者`no`(默认为no)。
* PubkeyAuthentication：设置是否开启密钥认证。可选参数只能为`yes`或者`no`(默认为yes)。

##### 执行命令 
* LocalCommand ：连接服务器成功时在本地执行的命令。除非启用下面的PermitLocalCommand，否则该参数会被直接忽略。
* PermitLocalCommand ：运行本地执行命令。
* RemoteCommand ：连接服务器成功时在服务器端执行的命令。比如启动`tmux`。

### TOKEN
Arguments to some keywords can make use of tokens, which are expanded at runtime:
```
    %%    A literal `%'.
    %C    Shorthand for %l%h%p%r.
    %d    Local user's home directory.
    %h    The remote hostname.
    %i    The local user ID.
    %L    The local hostname.
    %l    The local hostname, including the domain name.
    %n    The original remote hostname, as given on the command line.
    %p    The remote port.
    %r    The remote username.
    %u    The local username.
```
1. Match exec accepts the tokens %%, %h, %L, %l, %n, %p, %r, and %u.
2. CertificateFile accepts the tokens %%, %d, %h, %l, %r, and %u.
3. ControlPath accepts the tokens %%, %C, %h, %i, %L, %l, %n, %p, %r, and %u.
4. HostName accepts the tokens %% and %h.
5. IdentityAgent and IdentityFile accept the tokens %%, %d, %h, %l, %r, and 1. %u.
6. LocalCommand accepts the tokens %%, %C, %d, %h, %l, %n, %p, %r, and %u.
7. ProxyCommand accepts the tokens %%, %h, %p, and %r.
8. RemoteCommand accepts the tokens %%, %C, %d, %h, %l, %n, %p, %r, and %u.

### PS
1. [内容参考链接](https://www.digitalocean.com/community/tutorials/how-to-configure-custom-connection-options-for-your-ssh-client)
2. 完整内容可使用如下命令查看：
```
#> man ssh_config
```