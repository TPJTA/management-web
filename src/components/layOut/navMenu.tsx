import React from "react";
import { Menu } from "antd";
import { routeItem } from "@/routers/config";
const { SubMenu } = Menu;
const navMenu: React.FC<any> = function (props) {
  const getOpenKeys = () => {
    let pathNameArr = props.history.location.pathname.match(/\/.*\//);
    if (Array.isArray(pathNameArr)) {
      return pathNameArr[0].slice(0, -1);
    } else {
      return "";
    }
  };
  const routerChange = (navProps: any) => {
    props.history.push({ pathname: navProps.key });
  };
  return (
    <Menu
      theme="dark"
      mode="inline"
      onClick={routerChange}
      defaultOpenKeys={[getOpenKeys()]}
      selectedKeys={[props.history.location.pathname]}
    >
      {props.navList &&
        props.navList.map((item: routeItem) => {
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
                  (routerItem: routeItem) =>
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
  );
};
export default navMenu;
