---
title: 在Vue中使用Tinymce5遇到的问题记录
date: 2019-09-25 22:13:37
tags:
- Vue
- TinyMCE
---
# 基本使用
1. 安装并使用官方的[vue集成组件](https://www.tiny.cloud/docs/integrations/vue/)
```
$ npm install @tinymce/tinymce-vue
```
2. 加载组件
```
import Editor from '@tinymce/tinymce-vue';
```
3. 使用组件
```
<editor api-key="API_KEY" :init="{plugins: 'wordcount'}"></editor>
```
4. 其他配置参见[官方文档](https://www.tiny.cloud/docs/integrations/vue/#configuringtheeditor)
# 加载用户自定义插件
1. 我使用了由[tinymce.ax-z.cn](http://tinymce.ax-z.cn/)提供的[首行缩进](http://tinymce.ax-z.cn/more-plugins/indent2em.php)和[设置行高](http://tinymce.ax-z.cn/more-plugins/lineheight.php)两个插件
2. 在Tinymce-vue组件中，使用init配置的[setup](https://www.tiny.cloud/docs/configure/integration-and-setup/#setup)参数来加载自定义插件文件，我的一个列子：
```
  ...
this.init = {
  setup: function() {
    import('./plugins/lineheight.js')
    import('./plugins/indent2em.js')
  },
  height: this.height,
  menubar: false,
  ...
}
```
# 在多层弹出框中,TinyMCE的插件输入框无法获取焦点问题

1. 如果tinymce-vue组件在多层dialog框中调用，会出现部分带有输入框的插件无法获取焦点从而无法输入内容的情况，因为大部分模态(modal)窗口阻止来获取焦点的行为。可以根据相应的框架进行调整。比如我是用来VuetifyJS的Dialog组件，使用组件提供的`retain-focus`参数即可解决以上问题。

2. 参考文档：https://stackoverflow.com/questions/36279941/using-tinymce-in-a-modal-dialog

