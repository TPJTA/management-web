import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Form, Input, Button, Select, Checkbox } from "antd";
import { UserOutlined, LockOutlined, TeamOutlined } from "@ant-design/icons";
import { storeType } from "@/stores";
import { Dispatch } from "redux";
import { setName, setIdentity, setImgPath } from "@/stores/user/action";
import { setCookie, removeCookie, getCookie } from "@/libs/tool";
const storeToProps = (store: storeType) => ({
  userInformation: store.user,
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
});
interface propsType {
  setName: (name: string) => void;
  setIdentity: (identity: string) => void;
  setImgPath: (img: string) => void;
  userInformation: object;
}

const LoginForm: React.FC<propsType> = function (props: propsType) {
  const [isLoading, setLoading] = useState(false);
  const [passWord, setPassWord] = useState("");

  // useEffect(() => {
  //   if (getCookie("password")) {
  //     let str: string = getCookie("password");
  //     setPassWord(str);
  //   }
  // }, []);

  const submit = (value: any) => {
    setLoading(true);
    setTimeout(() => {
      console.log(props);
      if (value.remember) {
        setCookie("password", value.password);
      } else {
        removeCookie("password");
      }
      props.setName(value.username);
      props.setIdentity(value.identity);
      props.setImgPath("@/assets/images/head.jpg");
    }, 1000);
  };

  return (
    <Form name="login_form" onFinish={submit}>
      <div className="login-select-outter">
        <div className="login-select-prefix">
          <TeamOutlined className="login-select-prefix-icon" />
          <div className="login-select-prefix-lable">用户类型</div>
        </div>
        <Form.Item
          name="identity"
          rules={[{ required: true, message: "请选择用户类型" }]}
        >
          <Select size="large" placeholder="请选择">
            <Select.Option value="administrators">管理员</Select.Option>
            <Select.Option value="enterprise">企业</Select.Option>
            <Select.Option value="user">用户</Select.Option>
          </Select>
        </Form.Item>
      </div>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "用户名不能为空" }]}
      >
        <Input
          size="large"
          addonBefore={<UserOutlined />}
          placeholder="请输入用户名"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          { required: true, message: "密码不能为空" },
          { type: "string", min: 6, message: "密码不能小于6位" },
        ]}
      >
        <Input.Password
          size="large"
          addonBefore={<LockOutlined />}
          placeholder="请输入密码"
          value={passWord}
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          block
          size="large"
          loading={isLoading}
        >
          登录
        </Button>
      </Form.Item>
      <Form.Item name="remember" valuePropName="checked">
        <Checkbox className="login-remember">记住密码</Checkbox>
      </Form.Item>
    </Form>
  );
};
export default connect(storeToProps, dispatchToProps)(LoginForm);
