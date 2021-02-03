import React, { useState } from "react";
import { connect } from "react-redux";
import { storeType } from "@/stores";
import { loginOut } from "@/stores/user/action";
import { Dispatch } from "redux";
import { removeCookie } from "@/libs/tool";
import { Layout, Avatar, Dropdown, Menu, Affix } from "antd";
import { withRouter } from "react-router-dom";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  CloseSquareOutlined,
} from "@ant-design/icons";
import NavMenu from "./navMenu";
import "./index.less";
const { Header, Sider, Content } = Layout;
const storeToProps = (store: storeType) => ({
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
  const getTitle = (path: string): string => {
    const getItem = (arr: any): any => {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].path === path) {
          return arr[i].name;
        } else if (
          arr[i].path.indexOf(":") != -1 &&
          new RegExp(`^${arr[i].path.split(":")[0]}`).test(path)
        ) {
          return arr[i].name;
        } else if (arr[i].children) {
          let name = getItem(arr[i].children);
          if (name) {
            return name;
          }
        }
      }
      return "";
    };
    return getItem(props.navList);
  };
  const userMenu = (
    <Menu>
      <Menu.Item
        icon={<CloseSquareOutlined />}
        onClick={() => {
          props.loginOut();
        }}
      >
        <span>退出登录</span>
      </Menu.Item>
    </Menu>
  );
  return (
    <Layout style={{ minHeight: "100%" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Affix>
          <NavMenu navList={props.navList} history={props.history} />
        </Affix>
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
            {getTitle(props.location.pathname)}
          </div>
          <Dropdown overlay={userMenu}>
            <div className="header-user">
              <Avatar
                src={props.user.imgPath && props.user.imgPath}
                icon={!props.user.imgPath && <UserOutlined />}
              />
              <span className="header-user-name">{props.user.name}</span>
            </div>
          </Dropdown>
        </Header>
        <Content style={{ padding: "20px 20px 0" }}>
          <div className="router-content">{props.children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default connect(storeToProps, dispatchToProps)(withRouter(layOut));
