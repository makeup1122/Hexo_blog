---
title: PHP中的引号问题
date: 2017-02-11 15:40:51
tags:
- php
---
&#160; &#160; &#160; &#160;最近用php模拟telnet连接路由器发送指令时，fwrite发送指令后，再次发送回车符("\n")和换行符("\r")执行当前指令时，并没有按照预想的产生任何效果：

    fwrite($socket_handle,'sys reboot');
    fwrite($socket_handle,'\r\n');
&#160; &#160; &#160; &#160;查询了一番才发现，php代码中用单引号包含的内容如果含有转义字符，那么转义字符不会被转义，而是当作字符串被处理。换成双引号即可。另外单双引号的区别就是，在单引号内的变量不会被解释执行，其他都一样，使用时保持一致即可。

1. [回车符和换行符的区别](http://www.cnblogs.com/yunf/archive/2011/04/20/2021830.html)
2. [常用转义字符](http://baike.baidu.com/link?url=gOWNyWAZ5bkGwrbA1koAZ6Z0cDNjXvn7HyDOykHR8y-QMzS0j3RriKRfvtCTfFTDi4ZJ_z8jVKDcL_5c05Sl_XnHt82LB7Yul4Zz9pLKHr7GUm8xRuTcRvx7Rph3KcGh)
<!--![](http://d.hiphotos.baidu.com/zhidao/wh%3D450%2C600/sign=f8180c7aae64034f0f98ca029af35507/18d8bc3eb13533fa31685189add3fd1f40345bbf.jpg)-->