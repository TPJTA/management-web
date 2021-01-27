import React, { useState } from "react";
import { connect } from "react-redux";
import { storeType } from "@/stores";
import { loginOut } from "@/stores/user/action";
import { Dispatch } from "redux";
import { removeCookie } from "@/libs/tool";
import { Layout, Avatar, Dropdown, Menu } from "antd";
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

  const userMenu = (
    <Menu>
      <Menu.Item
        icon={<UserOutlined />}
        onClick={() => {
          props.history.push("/setting/user");
        }}
      >
        <span>用户设置</span>
      </Menu.Item>
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
        <NavMenu navList={props.navList} history={props.history} />
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
          <div className="header-title">xxxx管理系统</div>
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
        <Content style={{ paddingLeft: "20px", paddingTop: "20px" }}>
          <div className="router-content">{props.children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default connect(stroeToProps, dispatchToProps)(withRouter(layOut));
