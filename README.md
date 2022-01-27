# use-react-in-weapp

如何在微信小程序中使用 React。

## 原理

使用 `react-reconciler` 将 JSX 输出为 JSON 数据，利用小程序`template`的`is`属性，实现模板的自动展开。
> 使用`react-reconciler`主要是保证各生命周期的一致性

## 目录介绍

```
/miniprogram  小程序源码
  /components 基于React编写的组件
  /ReactRenderer 重要，React组件渲染及连接器
  /pages 小程序入口页面
  /utils
  ...
```

## 如何使用

### Step1: 编写 `React` 组件

```tsx
// components/Index
import React from 'react'

export function Index() {
  const [count, update] = React.useState(1)

  return (
    <div>
      <button onClick={() => update(count + 1)}>+</button>
      <div className="center">{count}</div>
      <button onClick={() => update(count - 1)}>-</button>
      <button
        className="mt10"
        onClick={() => {
          wx.navigateTo({
            url: '../logs/logs',
          })
        }}
      >
        查看启动日志
      </button>
    </div>
  )
}
```

### Step2: 小程序入口 JS 文件中引入 React 组件并渲染

```ts
import { Index } from '../../components/Index'
import { connect } from '../../ReactRenderer/connect'

Page({
  data: {
    $root: null,
  },

  onLoad() {
    // 渲染关联到当前页面
    const render = connect(this)
    render(Index)
  },
})
```

> `connect` 后 React 渲染数据会自动设置到 Page 的`data.$root`上。

### Step3: 小程序的 wxml 文件中引入 base.wxml

```xml
<!--index.wxml-->
<import src="../../base.wxml" />
<template is="root" data="{{node: $root}}" />
```

## 扩展 base.wxml

当前示例中只使用了基础的标签，有需要可自行扩展。

> template 标签不支持递归，base.wxml 会有不同 name 但内容相同的模板，相关问题：https://developers.weixin.qq.com/community/develop/doc/000a404c3281300849272cecf51800

## 关于小程序动态渲染页面

基于该示例，微信小程序也可做到动态加载 JS 代码并渲染页面。关于小程序动态解析 JS 可参考 `eval5`。

## Dev

`npm start`
