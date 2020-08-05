---
title: puppeteer
date: 2020-07-24 17:11:10
tags:
---

# Node is either not visible \or not an HTMLElement
元素不可见，selector选择到了多个element，并且第一个不可见
曲线救国：
```
await page.evaluate(() => {
  document.querySelector('#selector').click();
});
```

参考：https://github.com/puppeteer/puppeteer/issues/2977