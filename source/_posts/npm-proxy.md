Title: npm设置代理



因为项目需要，要下载`prerender-spa-plugin`这个包，但是总是下载失败：

```
ERROR: Failed to download Chromium r686378! Set "PUPPETEER_SKIP_CHROMIUM_DOWNLOAD" env variable to skip download.
```

看来应该是这个插件用了google的Headless chrome插件：[`puppeteer`](https://github.com/puppeteer/puppeteer)，而这个插件又需要下载chromium，没有科学上网工具，就会下载失败，正好我有梯子～

只要设置npm的代理参数即可：

```
npm config set proxy=http://127.0.0.1:9999
```



下载完成后删除代理设置：

```
npm config delete proxy
```

