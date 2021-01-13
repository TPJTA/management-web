import React from "react";
import "./index.less";
import LoginForm from "./loginForm";
const Login: React.FC<any> = function (props) {
  return (
    <div className="login">
      <h1>xxxx管理中心</h1>
      <div className="login-form">
        <LoginForm />
      </div>
    </div>
  );
};
export default Login;
