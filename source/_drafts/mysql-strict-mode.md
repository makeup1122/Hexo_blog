title: Mysql相关知识点
tags:
  - mysql
date: 2017-12-14 22:36:06
---
# 严格模式
字段类型为date或者datetime时，mysql为严格模式下，必须指定默认值
# find_in_set函数
```
FIND_IN_SET(str,strList)
```
* str 要查询的字符串
* strList 字段名，参数以“,”分隔，如(1,2,6,8)
* 查询字段(strList)中包含的结果，返回结果null或记录。


# utf8mb4
带有emoji表情的字符串数据，字段类型要用utf8mb4才能正确显示表情内容，否则为'?'。同时数据库连接的字符串也要修改为utf8mb4才能保证写入和读取正确。

# 文件导出/导入
into file
load file

# IFNULL函数
IFNULL() 函数用于判断第一个表达式是否为 NULL，如果为 NULL 则返回第二个参数的值，如果不为 NULL 则返回第一个参数的值。

IFNULL() 函数语法格式为：
```
IFNULL(expression, alt_value)
```
# json字段
## JSON_EXTRACT函数
## JSON_CONTAINS函数

# 转换函数：CAST和CONVERT
## CAST
```
... Order by CAST(string_field as SIGNED);
```
## CONVERT