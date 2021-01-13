import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import { routers } from "@/routers/config";
import "./index.less";
const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;
const layOut: React.FC<any> = function (props) {
  const [collapsed, setCollapsed] = useState(false);
  const routerChange = (navProps: any) => {
    props.history.push(navProps.domEvent.target.dataset.path);
  };
  return (
    <Layout style={{ minHeight: "100%" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Menu theme="dark" mode="inline" onClick={routerChange}>
          {routers[4].children &&
            routers[4].children.map((item) => {
              if (item.children) {
                return (
                  <SubMenu key={item.name} icon={item.icon} title={item.name}>
                    {item.children.map(
                      (routerItem) =>
                        routerItem.show &&
                        !routerItem.redirect && (
                          <Menu.Item
                            key={routerItem.name}
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
                      key={item.name}
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

export default withRouter(layOut);
