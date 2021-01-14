import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import { storeType } from "@/stores";
import { routers } from "@/routers/config";
import { connect } from "react-redux";
import "./index.less";
const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;

const stroeToProps = (store: storeType) => ({
  user: store.user,
});

const layOut: React.FC<any> = function (props) {
  const [collapsed, setCollapsed] = useState(false);

  const routerChange = (navProps: any) => {
    props.history.push(navProps.domEvent.target.dataset.path);
  };

  const routerList = routers(Boolean(props.user.name), props.user.access)[4]
    .children;

  return (
    <Layout style={{ minHeight: "100%" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Menu
          theme="dark"
          mode="inline"
          onClick={routerChange}
          defaultSelectedKeys={[props.history.location.pathname]}
        >
          {routerList &&
            routerList.map((item) => {
              if (!item.show) {
                return "";
              }
              if (item.children) {
                return (
                  <SubMenu key={item.path} icon={item.icon} title={item.name}>
                    {item.children.map(
                      (routerItem) =>
                        routerItem.show &&
                        !routerItem.redirect && (
                          <Menu.Item
                            key={routerItem.path}
                            icon={routerItem.icon}
                            data-path={routerItem.path}
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
                      icon={item.icon}
                      data-path={item.path}
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
          <div>主页</div>
        </Header>
        <Content style={{ paddingLeft: "20px", paddingTop: "20px" }}>
          <div className="router-content">{props.children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default connect(stroeToProps)(withRouter(layOut));
