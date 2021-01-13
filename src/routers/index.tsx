import React, { Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { routeItem, routers } from "./config";

const mapRouter = function (router: routeItem[] | undefined): React.ReactNode {
  return (
    <Suspense fallback={<></>}>
      <Switch>
        {router &&
          router.map(
            (item) =>
              item.show &&
              (item.children ? (
                <Route
                  path={item.path}
                  key={item.name}
                  exact={item.exact}
                  render={() =>
                    item.component
                      ? React.createElement(
                          item.component,
                          {},
                          mapRouter(item.children)
                        )
                      : mapRouter(item.children)
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
              ))
          )}
      </Switch>
    </Suspense>
  );
};

export default mapRouter(routers);
