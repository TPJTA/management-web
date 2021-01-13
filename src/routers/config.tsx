import React, { lazy, LazyExoticComponent } from "react";
export interface routeItem {
  name: string;
  show: boolean;
  exact: boolean;
  path?: string;
  component?: React.FC<any> | React.ComponentClass<any, any>;
  redirect?: string;
  icon?: React.ComponentClass | React.FC;
  children?: routeItem[];
}
export const routers: routeItem[] = [
  {
    name: "登录",
    path: "/login",
    show: true,
    exact: true,
    component: lazy(() => import("@/pages/login")),
  },
  {
    name: "404",
    path: "/404",
    show: true,
    exact: true,
    component: lazy(() => import("@/pages/Exception/404")),
  },
  {
    name: "403",
    path: "/403",
    show: true,
    exact: true,
    component: lazy(() => import("@/pages/Exception/403")),
  },
  {
    name: "500",
    path: "/500",
    show: true,
    exact: true,
    component: lazy(() => import("@/pages/Exception/500")),
  },
  {
    name: "基本布局",
    path: "/",
    show: true,
    exact: false,
    component: lazy(() => import("@/components/layOut")),
    children: [
      {
        name: "主页",
        path: "/",
        show: true,
        exact: true,
        component: lazy(() => import("@/pages/main")),
      },
      {
        name: "管理页面",
        path: "/manage",
        show: true,
        exact: false,
        children: [
          {
            name: "商品管理",
            path: "/manage/goods",
            show: true,
            exact: true,
            component: lazy(() => import("@/pages/manage/goods")),
          },
          {
            name: "信息管理",
            path: "/manage/basicMessage",
            show: true,
            exact: true,
            component: lazy(() => import("@/pages/manage/basicMessage")),
          },
          {
            name: "管理页跳转",
            path: "/manage",
            show: true,
            exact: true,
            redirect: "/manage/goods",
          },
          {
            name: "404跳转",
            show: true,
            exact: true,
            redirect: "/404",
          },
        ],
      },
      {
        name: "数据分析",
        exact: true,
        show: true,
        path: "/analysis",
        component: lazy(() => import("@/pages/analysis")),
      },
      {
        name: "系统设置",
        path: "/setting",
        show: true,
        exact: false,
        children: [
          {
            name: "用户设置",
            path: "/setting/user",
            show: true,
            exact: true,
            component: lazy(() => import("@/pages/setting/userSetting")),
          },
          {
            name: "权限设置",
            path: "/setting/access",
            show: true,
            exact: true,
            component: lazy(() => import("@/pages/setting/accessSetting")),
          },
          {
            name: "系统设置跳转",
            path: "/setting",
            exact: true,
            show: true,
            redirect: "/setting/user",
          },
          {
            name: "404跳转",
            show: true,
            exact: true,
            redirect: "/404",
          },
        ],
      },
      {
        name: "404跳转",
        show: true,
        exact: true,
        redirect: "/404",
      },
    ],
  },
];
