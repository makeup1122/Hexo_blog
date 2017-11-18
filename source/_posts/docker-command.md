---
title: docker常用命令
date: 2017-11-13 09:41:15
tags:
- docker
---
{% raw %}
<table>
    <tr>
        <th>范围</th>
        <th>命令</th>
        <th>说明</th>
        <th>常用参数</th>
    </tr>
    <tr>
        <td rowspan=7>镜像</td>
        <td>docker images</td>
        <td>列出本地镜像</td>
        <td></td>
    </tr>
    <tr>
        <td>docker inspect</td>
        <td>获取镜像元数据</td>
        <td></td>
    </tr>
    <tr>
        <td>docker build</td>
        <td>构建镜像</td>
        <td></td>
    </tr>
    <tr>
        <td>docker tag</td>
        <td>设置镜像标签(别名)</td>
        <td></td>
    </tr>
    <tr>
        <td>docker history</td>
        <td>查看指定镜像的创建历史</td>
        <td></td>
    </tr>
    <tr>
        <td>docker save/import </td>
        <td>保存镜像到文件/从本地文件导入镜像</td>
        <td></td>
    </tr>
    <tr>
        <td>docker rmi</td>
        <td>删除本地镜像</td>
        <td><b>-f</b> :强制删除</td>
    </tr>
    <tr>
        <td rowspan=6>容器</td>
        <td>docker ps</td>
        <td>列出容器</td>
        <td><b>-a</b>:列出所有容器，包括未运行</td>
    </tr>
    <tr>
        <td>docker create</td>
        <td>创建容器</td>
        <td></td>
    </tr>
    <tr>
        <td>docker start/stop/restart</td>
        <td>管理容器状态</td>
        <td></td>
    </tr>
    <tr>
        <td>docker run</td>
        <td>创建一个新的容器并运行一个命令</td>
        <td>
            <b>-i</b>: 以交互模式运行容器，通常与 -t 同时使用；<br>
            <b>-t</b>: 为容器重新分配一个伪输入终端，通常与 -i 同时使用；
        </td>
    </tr>
    <tr>
        <td>docker rm</td>
        <td>删除一个容器</td>
        <td></td>
    </tr>
    <tr>
        <td>docker exec</td>
        <td>容器中执行命令</td>
        <td></td>
    </tr>
    <tr>
        <td>docker commit</td>
        <td>提交对容器的修改</td>
        <td></td>
    </tr>
    <tr>
        <td rowspan=3>仓库</td>
        <td>docker search</td>
        <td>搜索仓库镜像</td>
        <td><b>-f</b> stars=100 :搜索100颗星以上的镜像<br>
            --filter=stars=100
        </td>
    </tr>
    <tr>
        <td>docker pull/push</td>
        <td>拉取/推送镜像到仓库</td>
        <td></td>
    </tr>
    <tr>
        <td>docker login</td>
        <td>登陆仓库</td>
        <td></td>
    </tr>
    <tr>
        <td rowspan=2>其他</td>
        <td>docker version</td>
        <td>显示版本信息</td>
        <td></td>
    </tr>
    <tr>
        <td>docker info</td>
        <td>显示系统信息</td>
        <td></td>
    </tr>
</table>
{% endraw %}