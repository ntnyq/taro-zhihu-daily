# taro-zhihu-daily

Taro 版本的知乎日报小程序，暂仅支持微信小程序端。

## 踩坑记录

### 生命周期

- **componentDidMount** 推荐在此生命周期进行数据请求，请求后通过 `setState` 重新渲染 View。

### 页面

页面设置 `height: 100%; overflow-y: auto;` 后会出现滑动不流畅，解决方案： `-webkit-overflow-scrolling: touch;`。

### taro-ui 组件库

**AtIcon** 组件的 `size` 属性渲染后单位为 `px`，而不是小程序端的 `rpx`，且无法直接用 `wxss` 来覆盖。若设置字符串格式且带单位如 `<AtIcon size='32rpx' />`，`rpx` 单位会被忽略，仍然被渲染为 32px。

解决方案:

```jsx
<AtIcon size="" />
```

设置 `size` 为空，则会被渲染为 NAN，行内样式失效，此时 `wxss` 内的样式会起作用。
