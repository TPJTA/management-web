import React from "react";
import { RouterProps } from "react-router-dom";
import "./index.less";
import LoginForm from "./loginForm";
const Login: React.FC<RouterProps> = function (props: RouterProps) {
  const changePage = (path: string) => {
    props.history.push(path);
  };

  return (
    <div className="login">
      <h1>智慧商城管理中心</h1>
      <div className="login-form">
        <LoginForm changePage={changePage} />
      </div>
    </div>
  );
};
export default Login;
