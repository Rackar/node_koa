## 抓取步骤

1. 修改 token 

let Basic =``
修改为 token

2. 修改查询参数

国土云进行一次查询，拷贝查询参数，使用 vlist 中的 payload 。
替换 getOnePage 方法中的 data，，注意其后有以下语句，不用手动修改payload。

```js
data.pageSize = pageSize;
data.pageIndex = pageIndex;
```

3. 调试
开启F5调试，通过gty.http发送 test API 请求，检查断点中数据是否正确。