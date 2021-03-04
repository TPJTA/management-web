# 项目说明

`management-web`是一个电商后台管理系统的前端项目，基于React+Antd实现。主要包括商品管理、商品查看、订单管理、数据分析，权限设置等功能。

## 技术选型

技术 | 说明
----|----
[React](https://zh-hans.reactjs.org/) | 前端框架
[React-router](https://reactrouter.com/) | 路由框架
[Redux](https://redux.js.org/) | 全局状态管理框架
[TypeScript](https://www.typescriptlang.org/) | JavaScript的超集
[Less](http://lesscss.org/) | CSS预处理语言
[Antd](https://ant.design/) | 前端UI框架
[Echarts](https://echarts.apache.org/zh/index.html) | 图表框架
[Js-cookie](https://github.com/js-cookie/js-cookie) | cookie管理工具

## 项目布局
```
├─ src
│  ├─ assets -- 静态图片资源文件
│  ├─ components -- 组件封装
│  ├─ libs -- 工具函数
│  ├─ pages
│  │  ├─ analysis -- 数据分析页面
│  │  ├─ Exception -- 错误页面
│  │  ├─ login -- 登录页面
│  │  ├─ main -- 主页
│  │  ├─ manage -- 管理中心页面
│  │  └─ setting -- 设置页面
│  ├─ routers -- router路由配置及渲染
│  └─ stores -- Redux的状态管理
```

## 运行项目（nodejs 6.0+）

```
 npm i  或者运行  yarn(推荐)
  
 npm start

 npm run build （发布）
```

# 总结

## 个人感悟

1. react-hook方便了我对代码的读写。同时由于在函数中，我不需要修改函数的this也能直接访问到state和props。同时如果一段代码需要在初次渲染和再次渲染中都执行，在class中需要写componentDidMount和componentDidUpdate两个生命周期，而现在只需要写一个useEffect就能实现。

2. 在学习了vue-router后，我才发现react-router的实现方式十分原始，需要自己渲染出路由组件，并且没有像vue-router那样有导航守卫和路由原信息。所以当使用权限控制时,需要通过当前状态自动生成该用户的访问路由。

3. Less的使用方便我对css的编写，css的嵌套书写极大的方便了我对结构层级的理解。同时如果同一级的子元素每个都用自己不一样的样式，还可以通过Less的递归方式来快速实现。

4. TypeScript进一步提高了代码的基本逻辑，我可以使用接口来设置我想要得到对象，从而对props和state进行约束。同时如果该属性是可选的，也需要我使用in来进行判断才能使用，如果在js中我可能会直接访问，然后在用if判断是否为undefined后使用。

5. eslint规范了我的代码，在此之前我的代码规范全靠自觉，如果有一段代码十分复杂，那我有时候就会忘记遵守有些代码规范，而使用eslint会提示我哪些地方需要写空格，那些需要换行，使用这种菜鸟也能写出规范的代码。

## 项目的不足
1. 没有使用mock来模拟后台，有些需要请求后台的异步函数都是通过定时器来模拟实现的，不太符合实际需求。

2. 在有些地方为了图方便而使用any，这个情况主要出现在为第三方组件传递回调函数的情况，由于不想查看该函数可以会传递的参数，所以直接使用将参数表示为any。

# 部分截图
## 登录

<img src="https://github.com/TPJTA/management-web/blob/master/screen/%E7%99%BB%E5%BD%95.jpg"/>

## 主页

<img src="https://github.com/TPJTA/management-web/blob/master/screen/%E4%B8%BB%E9%A1%B5.jpg"/>

## 商品管理

<img src="https://github.com/TPJTA/management-web/blob/master/screen/%E5%95%86%E5%93%81%E7%AE%A1%E7%90%861.jpg"/>
<img src="https://github.com/TPJTA/management-web/blob/master/screen/%E5%95%86%E5%93%81%E7%AE%A1%E7%90%862.jpg"/>

## 订单管理

<img src="https://github.com/TPJTA/management-web/blob/master/screen/%E8%AE%A2%E5%8D%95%E7%AE%A1%E7%90%861.jpg"/>
<img src="https://github.com/TPJTA/management-web/blob/master/screen/%E8%AE%A2%E5%8D%95%E7%AE%A1%E7%90%862.jpg"/>

## 数据分析

<img src="https://github.com/TPJTA/management-web/blob/master/screen/%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90.jpg"/>

## 权限设置

<img src="https://github.com/TPJTA/management-web/blob/master/screen/%E6%9D%83%E9%99%90%E8%AE%BE%E7%BD%AE1.jpg"/>
<img src="https://github.com/TPJTA/management-web/blob/master/screen/%E6%9D%83%E9%99%90%E8%AE%BE%E7%BD%AE2.jpg"/>
