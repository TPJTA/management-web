import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Form, Input, Button, Select, Checkbox } from "antd";
import { UserOutlined, LockOutlined, TeamOutlined } from "@ant-design/icons";
import { storeType } from "@/stores";
import { Dispatch } from "redux";
import {
  setName,
  setIdentity,
  setImgPath,
  setAccess,
} from "@/stores/user/action";
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
  setAccess: (access: string[]) => {
    dispatch(setAccess(access));
  },
});
interface propsType {
  setName: (name: string) => void;
  setIdentity: (identity: string) => void;
  setImgPath: (img: string) => void;
  setAccess: (access: string[]) => void;
  userInformation: object;
  changePage: (path: string) => void;
}

const LoginForm: React.FC<propsType> = function (props: propsType) {
  const [isLoading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    let str = getCookie("user");
    if (str) {
      form.setFieldsValue(JSON.parse(str));
    }
  }, []);

  const submit = (value: any) => {
    setLoading(true);
    //模拟登录验证
    setTimeout(() => {
      setCookie("TOKEN_KEY", "ashdujhsa");
      if (value.remember) {
        setCookie("user", value);
      } else {
        removeCookie("user");
      }
      props.setName(value.username);
      props.setIdentity(value.identity);
      props.setImgPath("@/assets/images/head.jpg");
      props.setAccess([
        "商品管理",
        "信息管理",
        "数据分析",
        "用户设置",
        "权限设置",
      ]);
      props.changePage("/");
    }, 1000);
  };

  return (
    <Form name="login_form" onFinish={submit} form={form}>
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
