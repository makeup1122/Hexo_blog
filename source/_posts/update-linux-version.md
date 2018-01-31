---
title: 升级CentOS7的Linux版本至最新稳定版
date: 2018-01-31 09:28:13
tags:
- linux
- centos
---

### 添加ELRepo第三方仓库[ELRepo](http://elrepo.org)（ELRepo是什么？）。

### 安装ELRepo仓库的命令

```
[root@goingmerry ~]# rpm --import https://www.elrepo.org/RPM-GPG-KEY-elrepo.org
[root@goingmerry ~]# rpm -Uvh http://www.elrepo.org/elrepo-release-7.0-3.el7.elrepo.noarch.rpm (external link)
-bash: syntax error near unexpected token `('
[root@goingmerry ~]# rpm -Uvh http://www.elrepo.org/elrepo-release-7.0-3.el7.elrepo.noarch.rpm
Retrieving http://www.elrepo.org/elrepo-release-7.0-3.el7.elrepo.noarch.rpm
Preparing...                          ################################# [100%]
Updating / installing...
   1:elrepo-release-7.0-3.el7.elrepo  ################################# [100%]
[root@goingmerry ~]#

```

### 查看ELRepo仓库中可用内核版本信息

```
[root@goingmerry ~]#  yum --disablerepo="*" --enablerepo="elrepo-kernel" list available
Loaded plugins: fastestmirror
elrepo-kernel                                                                                                                                                                   | 2.9 kB  00:00:00
elrepo-kernel/primary_db                                                                                                                                                        | 1.7 MB  00:00:01
Loading mirror speeds from cached hostfile
 * elrepo-kernel: ftp.yz.yamagata-u.ac.jp
Available Packages
kernel-lt.x86_64                                                                                   4.4.113-1.el7.elrepo                                                                   elrepo-kernel
kernel-lt-devel.x86_64                                                                             4.4.113-1.el7.elrepo                                                                   elrepo-kernel
kernel-lt-doc.noarch                                                                               4.4.113-1.el7.elrepo                                                                   elrepo-kernel
kernel-lt-headers.x86_64                                                                           4.4.113-1.el7.elrepo                                                                   elrepo-kernel
kernel-lt-tools.x86_64                                                                             4.4.113-1.el7.elrepo                                                                   elrepo-kernel
kernel-lt-tools-libs.x86_64                                                                        4.4.113-1.el7.elrepo                                                                   elrepo-kernel
kernel-lt-tools-libs-devel.x86_64                                                                  4.4.113-1.el7.elrepo                                                                   elrepo-kernel
kernel-ml.x86_64                                                                                   4.15.0-1.el7.elrepo                                                                    elrepo-kernel
kernel-ml-devel.x86_64                                                                             4.15.0-1.el7.elrepo                                                                    elrepo-kernel
kernel-ml-doc.noarch                                                                               4.15.0-1.el7.elrepo                                                                    elrepo-kernel
kernel-ml-headers.x86_64                                                                           4.15.0-1.el7.elrepo                                                                    elrepo-kernel
kernel-ml-tools.x86_64                                                                             4.15.0-1.el7.elrepo                                                                    elrepo-kernel
kernel-ml-tools-libs.x86_64                                                                        4.15.0-1.el7.elrepo                                                                    elrepo-kernel
kernel-ml-tools-libs-devel.x86_64                                                                  4.15.0-1.el7.elrepo                                                                    elrepo-kernel
perf.x86_64                                                                                        4.15.0-1.el7.elrepo                                                                    elrepo-kernel
python-perf.x86_64                                                                                 4.15.0-1.el7.elrepo                                                                    elrepo-kernel
[root@goingmerry ~]#

```
其中的`kernel-ml.x86_64`行即为主线稳定版本的内核信息。

### 安装最新主线稳定内核

```
#>  yum --enablerepo=elrepo-kernel install kernel-ml
```

### 生效最新安装

内核升级完毕后，目前内核还是默认的版本，如果此时直接执行reboot命令，重启后使用的内核版本还是默认的3.10，不会使用新的内核版本。
首先，查看默认内核启动顺序：
```
[root@goingmerry ~]#  awk -F\' '$1=="menuentry " {print $2}' /etc/grub2.cfg
CentOS Linux 7 Rescue dc2d89f844734877bc176dcb9b3bcb6d (4.15.0-1.el7.elrepo.x86_64)
CentOS Linux (4.15.0-1.el7.elrepo.x86_64) 7 (Core)
CentOS Linux (3.10.0-693.11.6.el7.x86_64) 7 (Core)
CentOS Linux (3.10.0-693.el7.x86_64) 7 (Core)
CentOS Linux (0-rescue-c73a5ccf3b8145c3a675b64c4c3ab1d4) 7 (Core)
[root@goingmerry ~]#

```
由上面可以看出新内核(4.15.0)目前位置在0，原来的内核(3.10.0)目前位置在1，所以如果想生效最新的内核，还需要我们修改内核的启动顺序为0：
```
#> vim /etc/default/grub
```
将其中的`GRUB_DEFAULT=saved`修改为`GRUB_DEFAULT=0`
```
GRUB_TIMEOUT=5
GRUB_DISTRIBUTOR="$(sed 's, release .*$,,g' /etc/system-release)"
GRUB_DEFAULT=saved   => GRUB_DEFAULT=0
GRUB_DISABLE_SUBMENU=true
GRUB_TERMINAL_OUTPUT="console"
GRUB_CMDLINE_LINUX="consoleblank=0 crashkernel=auto rhgb quiet"
GRUB_DISABLE_RECOVERY="true"

```
或者使用如下命令修改：
```
grub2-set-default 1
```
接着运行grub2-mkconfig命令来重新创建内核配置，如下：
```
#> grub2-mkconfig -o /boot/grub2/grub.cfg
```
最后重新启动服务器
```
#> reboot
```
重启之后查看当前linux版本
```
[root@goingmerry ~]# uname -sr
Linux 4.15.0-1.el7.elrepo.x86_64
```
至此内核升级完毕。