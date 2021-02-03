import React, { lazy } from "react";
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
export type accessTy = "商品管理" | "订单管理" | "数据分析" | "权限设置";

export const routers = (
  isLogin: boolean,
  access: Array<accessTy> = []
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
        name: "管理中心",
        path: "/manage",
        show: hasOneOf(["商品管理", "订单管理"], access),
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
            name: "订单管理",
            path: "/manage/order",
            show: access.includes("订单管理"),
            exact: true,
            component: lazy(() => import("@/pages/manage/order")),
          },
          {
            name: "订单详细",
            path: "/manage/order/:id",
            show: access.includes("订单管理"),
            exact: true,
            component: lazy(() => import("@/pages/manage/order/orderDetails")),
          },
          {
            name: "管理页跳转",
            path: "/manage",
            show: true,
            exact: true,
            redirect: access.includes("商品管理")
              ? "/manage/goods"
              : "/manage/order",
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
        name: "权限设置",
        path: "/setting",
        show: hasOneOf(["权限设置"], access),
        icon: SettingOutlined,
        exact: true,
        component: lazy(() => import("@/pages/setting")),
      },
    ],
  },
];
