# 饱了么

> 饱了么 商家端

## Preresquisite

* Node.js >= `8.0.0`
* Chrome

## 组件树

```
└─App：挂载整个应用
   ├─ErrorModal: 全局错误提示框组件
   ├─auth:【权限界面】
   │  ├─Header: 权限界面顶部组件
   │  ├─Footer: 权限界面底部组件
   │  ├─Login:【登录界面】
   │  ├─LoginBox: 登录框组件
   │  ├─Register:【注册界面】
   │  ├─RegisterBox: 注册框组件
   │  └─Modal: 权限界面提示框组件
   └─main:【主界面】的基本结构
      ├─Menu: 主界面导航组件
      ├─TopLine: 主界面顶部组件
      ├─Main: 【概览界面】
      ├─order: 订单管理
      │  ├─OrderMenu: 订单界面导航栏组件
      │  ├─Ordering:【进行中订单界面】
      │  ├─Ordered:【已完成订单界面】
      │  ├─OrderAll:【全部订单界面】
      │  ├─TrackOrder:【查询订单界面】
      │  └─OrderDetail: 订单详细框组件
      ├─dish: 菜品管理
      │  ├─Management:【菜品管理主界面】
      │  └─NewDish: 【新建/编辑菜品界面】
      ├─QRcode:【二维码管理界面】
      └─self: 商家信息
         ├─ChangePW:【修改密码界面】
         └─Info:【修改商家信息界面】
```

## 文件结构

```
├─build：构建用到的相关文件
├─config：构建的配置文件
├─node_modules：相关依赖文件
├─my_theme：自定义主题相关文件
├─src：前端开发源码
│	├─assets：静态资源如矢量图等
│	├─component：前端组件
│	├─lib：axios预配置相关文件
│	├─router：前端路由
│	├─store：vuex的store
│	├─App.vue：应用的外层结构
│	└─main.js：应用的入口文件
└─static：前端开发过程中用到的静态文件
```



## 项目构建启动

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
