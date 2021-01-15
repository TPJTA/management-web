import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { routers, routeItem } from "@/routers/config";
import { connect } from "react-redux";
import { storeType } from "@/stores";
import { loginOut } from "@/stores/user/action";
import { Dispatch } from "redux";
import { removeCookie } from "@/libs/tool";
import "./index.less";
import { Layout, Menu, Avatar, Popover, Button } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;

const stroeToProps = (store: storeType) => ({
  user: store.user,
});
const dispatchToProps = (dispatch: Dispatch) => ({
  loginOut: () => {
    removeCookie("TOKEN_KEY");
    dispatch(loginOut());
  },
});
const layOut: React.FC<any> = function (props) {
  const [collapsed, setCollapsed] = useState(false);
  const getOpenKeys = () => {
    let pathNameArr = props.history.location.pathname.match(/\/.*\//);
    if (Array.isArray(pathNameArr)) {
      return pathNameArr[0].slice(0, -1);
    } else {
      return "";
    }
  };
  const routerChange = (navProps: any) => {
    props.history.push(navProps.key);
  };

  const navList = routers(true, props.user.access)[4].children;
  const getName = (path: string, navList: routeItem[] | undefined): string => {
    if (!navList) return "";
    let name = "";
    navList.find((item) => {
      if (item.path === path) {
        name = item.name;
        return true;
      } else if (item.children) {
        let findItem = getName(path, item.children);
        if (findItem) {
          name = findItem;
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    });
    return name;
  };
  const loginOutButton = (
    <Button
      type="primary"
      danger
      size="small"
      onClick={() => {
        props.loginOut();
      }}
    >
      退出登录
    </Button>
  );
  return (
    <Layout style={{ minHeight: "100%" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Menu
          theme="dark"
          mode="inline"
          onClick={routerChange}
          defaultOpenKeys={[getOpenKeys()]}
          defaultSelectedKeys={[props.history.location.pathname]}
        >
          {navList &&
            navList.map((item) => {
              if (!item.show) {
                return "";
              }
              if (item.children) {
                return (
                  <SubMenu
                    key={item.path}
                    icon={item.icon && React.createElement(item.icon)}
                    title={item.name}
                  >
                    {item.children.map(
                      (routerItem) =>
                        routerItem.show &&
                        !routerItem.redirect && (
                          <Menu.Item
                            key={routerItem.path}
                            icon={
                              routerItem.icon &&
                              React.createElement(routerItem.icon)
                            }
                          >
                            {routerItem.name}
                          </Menu.Item>
                        )
                    )}
                  </SubMenu>
                );
              } else {
                return (
                  item.show &&
                  !item.redirect && (
                    <Menu.Item
                      key={item.path}
                      icon={item.icon && React.createElement(item.icon)}
                    >
                      {item.name}
                    </Menu.Item>
                  )
                );
              }
            })}
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{ paddingLeft: "20px" }}
          className="layout-header-background"
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              onClick: () => {
                setCollapsed(!collapsed);
              },
            }
          )}
          <div className="header-title">
            {getName(props.history.location.pathname, navList)}
          </div>
          <div className="header-user">
            <Popover content={loginOutButton}>
              <Avatar
                src={props.user.imgPath && props.user.imgPath}
                icon={!props.user.imgPath && <UserOutlined />}
              />
              <span>{props.user.name}</span>
            </Popover>
          </div>
        </Header>
        <Content style={{ paddingLeft: "20px", paddingTop: "20px" }}>
          <div className="router-content">{props.children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default connect(stroeToProps, dispatchToProps)(withRouter(layOut));
