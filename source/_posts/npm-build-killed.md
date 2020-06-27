Title: 使用npm的问题记录



# build被killed问题

## 问题

在vue项目构建时，执行npm run build的进程总是被killed，npm日志也没什么信息：

```
Building for production...Killed

```



## 原因：

综合各种google，大概率是内存不足或者交换分区不足，因为我用的是1GB的虚拟主机，而且也未设置swap交换分区。

## 解决：

1. 使用`--max-old-space-size=300参数来限制内存使用`：不管用。
2. 设置交换分区：管用。