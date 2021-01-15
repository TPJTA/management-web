import React, { lazy, LazyExoticComponent } from "react";
import { hasOneOf } from "@/libs/tool";
import {
  HomeOutlined,
  FormOutlined,
  BarChartOutlined,
  SettingOutlined,
} from "@ant-design/icons";
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

export const routers = (
  isLogin: boolean,
  access: string[] = []
): routeItem[] => [
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
    show: isLogin,
    exact: false,
    component: lazy(() => import("@/components/layOut")),
    children: [
      {
        name: "主页",
        path: "/",
        show: true,
        exact: true,
        icon: HomeOutlined,
        component: lazy(() => import("@/pages/main")),
      },
      {
        name: "管理页面",
        path: "/manage",
        show: hasOneOf(["商品管理", "信息管理"], access),
        icon: FormOutlined,
        exact: false,
        children: [
          {
            name: "商品管理",
            path: "/manage/goods",
            show: access.includes("商品管理"),
            exact: true,
            component: lazy(() => import("@/pages/manage/goods")),
          },
          {
            name: "信息管理",
            path: "/manage/basicMessage",
            show: access.includes("信息管理"),
            exact: true,
            component: lazy(() => import("@/pages/manage/basicMessage")),
          },
          {
            name: "管理页跳转",
            path: "/manage",
            show: true,
            exact: true,
            redirect: access.includes("商品管理")
              ? "/manage/goods"
              : "/manage/basicMessage",
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
        show: access.includes("数据分析"),
        path: "/analysis",
        icon: BarChartOutlined,
        component: lazy(() => import("@/pages/analysis")),
      },
      {
        name: "系统设置",
        path: "/setting",
        show: hasOneOf(["用户设置", "权限设置"], access),
        icon: SettingOutlined,
        exact: false,
        children: [
          {
            name: "用户设置",
            path: "/setting/user",
            show: access.includes("用户设置"),
            exact: true,
            component: lazy(() => import("@/pages/setting/userSetting")),
          },
          {
            name: "权限设置",
            path: "/setting/access",
            show: access.includes("权限设置"),
            exact: true,
            component: lazy(() => import("@/pages/setting/accessSetting")),
          },
          {
            name: "系统设置跳转",
            path: "/setting",
            exact: true,
            show: true,
            redirect: access.includes("用户设置")
              ? "/setting/user"
              : "/setting/access",
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
  {
    name: "404跳转",
    show: true,
    exact: true,
    redirect: "/404",
  },
];
