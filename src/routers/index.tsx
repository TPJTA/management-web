import React, { Suspense, useEffect, useState } from "react";
import { Switch, Route, Redirect, HashRouter } from "react-router-dom";
import { routeItem, routers } from "./config";
import { connect } from "react-redux";
import { storeType } from "@/stores";
import { getCookie } from "@/libs/tool";
import { Dispatch } from "redux";
import {
  setName,
  setIdentity,
  setImgPath,
  setAccess,
} from "@/stores/user/action";
const stroeToProps = (store: storeType) => ({
  user: store.user,
});
const dispatchToProps = (dispatch: Dispatch) => ({
  setName: (name: string) => {
    dispatch(setName(name));
  },
  setIdentity: (identity: string) => {
    dispatch(setIdentity(identity));
  },
  setImgPath: (img: string) => {
    dispatch(setImgPath(img));
  },
  setAccess: (access: string[]) => {
    dispatch(setAccess(access));
  },
});
const mapRouter = function (
  router: routeItem[] | undefined,
  isLogin: boolean
): React.ReactNode {
  return (
    <Suspense fallback={<></>}>
      <Switch>
        {router &&
          router.map((item) =>
            item.show ? (
              item.children ? (
                <Route
                  path={item.path}
                  key={item.name}
                  exact={item.exact}
                  render={() =>
                    item.component
                      ? React.createElement(
                          item.component,
                          {},
                          mapRouter(item.children, isLogin)
                        )
                      : mapRouter(item.children, isLogin)
                  }
                />
              ) : item.redirect ? (
                <Redirect
                  from={item.path}
                  to={item.redirect}
                  exact={item.exact}
                  key={item.name}
                />
              ) : (
                <Route
                  path={item.path ? item.path : ""}
                  key={item.name}
                  exact={item.exact}
                  component={item.component}
                />
              )
            ) : isLogin ? (
              <Redirect from={item.path} to="403" exact key={item.name} />
            ) : (
              <Redirect from={item.path} to="/login" key={item.name} />
            )
          )}
      </Switch>
    </Suspense>
  );
};

const Router: React.FC<storeType> = (props: storeType) => {
  let [isLogin, setIsLogin] = useState(true);
  useEffect(() => {
    let token_key = getCookie("TOKEN_KEY");
    if (token_key) {
      setIsLogin(true);
      //模拟已登录时获得信息
      setTimeout(() => {
        props.setName("1111");
        props.setIdentity("enterprise");
        props.setImgPath("@/assets/images/head.jpg");
        props.setAccess([
          "商品管理",
          "信息管理",
          "数据分析",
          "用户设置",
          "权限设置",
        ]);
      }, 500);
    } else {
      setIsLogin(false);
    }
  }, [getCookie("TOKEN_KEY")]);
  return (
    <HashRouter>
      {mapRouter(routers(isLogin, props.user.access), isLogin)}
    </HashRouter>
  );
};
export default connect(stroeToProps, dispatchToProps)(Router);
