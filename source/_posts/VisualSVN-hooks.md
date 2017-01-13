---
title: VisualSVN中的hooks
date: 2017-01-13 14:39:15
tags:
- svn
- hooks
---
&#160; &#160; &#160; &#160;使用VisualSVN做SVN的服务端时，在服务端也可以写hooks脚本，比如自动部署到测试环境的apache中，或者强制用户提交commit message等等。由于我们的测试服务器和SVN服务器现在放在一起，所以直接在服务端写脚本进行自动部署，不过这中间遇到几个问题：
### 脚本无法执行
* 现象：脚本不执行，没有任何效果。
* 原因：我们的服务器是windows Server ,所以所有的hooks script应该修改为以`.bat`后缀结尾的文件，才能被调用。
* 解决：修改文件后缀为`.bat`或者`.exe`即可，其实示例脚本的注释里都有些，只是没仔细看=.=。
### 脚本执行错误
* 现象：当提交commit到服务器时，提示'readonly'或者'no access'等内容。
* 原因：在windows环境安装VisualSVN后，在系统服务中，VisualSVN Server是以 Network Server登陆启用的，所以权限很小。没有相应目录或文件的读写权限。
* 解决：在"服务"->"VisualSVN Server"->"属性"->"登陆"中修改以本地用户登陆然后重启服务即可。

PS：在windows的hook script中最好不要直接调用其他bat脚本。
